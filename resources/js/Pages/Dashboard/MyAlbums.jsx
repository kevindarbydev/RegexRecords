import React, { useEffect, useState } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import InputError from "@/Components/InputError";
import PrimaryButton from "@/Components/PrimaryButton";
import { useForm, Head } from "@inertiajs/react";
import Album from "./Partials/Album";
import makeRequestCreator from "@/utils/utils";
const search = makeRequestCreator("/proxy");

import DashboardTabs from "@/Layouts/Tabs/DashboardTabs";

export default function Index({
    auth,
    albums,
    collections,
    cartCount,
    albumsWithRatings,
}) {
    //TODO: fix ->dropdown list still shows after album is added, either empty thin white div or the entire list still shows
    const { data, setData, post, processing, reset, errors } = useForm({
        album_name: "",
        artist: "",
        value: "",
    });
    const [searchQuery, setSearchQuery] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [showDropdown, setShowDropdown] = useState(false);

    useEffect(() => {
        const delay = setTimeout(() => {
            const currentQuery = searchQuery.trim();
            if (!currentQuery) {
               
                setSearchResults([]);
                setShowDropdown(false);
                return;
            }    
            const res = search(currentQuery)
                .then((results) => {
                   
                    setSearchResults(results);
                    setShowDropdown(true);
                })
                .catch((error) => {
                    console.log("Error fetching search results:", error);
                });
        }, 500);

        return () => clearTimeout(delay);
    }, [searchQuery]);

    const handleSearchQueryChange = (e) => {
        const albumName = data.album_name || "";
        const artist = data.artist || "";

        if (!albumName && !artist) {
            setSearchQuery("");
            setShowDropdown(false);
            return;
        }

        if (!albumName || !artist) {          
            const impreciseQuery = albumName || artist;
            setSearchQuery(impreciseQuery);
        } else {           
            setSearchQuery(`${albumName},${artist}`);
        }
    };

    useEffect(() => {
        console.log("After setData: ", data);
    }, [data]);

    const handleDropdownItemClick = (result) => {
        const [artist, album_name] = result.title.split(" - ");
       setData((prevData) => ({
           ...prevData,
           album_name: album_name,
           artist: artist,
       }));    
        setShowDropdown(false);
    };

    const uniqueTitles = searchResults.reduce((acc, current) => {
        if (!acc.some((item) => item.title === current.title)) {
            acc.push(current);
        }
        return acc;
    }, []);

    const submit = (e) => {
        e.preventDefault();
        post(route("dashboard.albums.store"), { onSuccess: () => reset() });
    };

    return (
        <AuthenticatedLayout auth={auth} cartCount={cartCount}>
            <Head title="Albums" />
            <DashboardTabs />
            <div className="flex flex-row">
                <div className="p-4 sm:p-6 lg:p-8 ml-10">
                    <div className="relative">
                        <form className="w-3/4 md:w-1/5 m-6" onSubmit={submit}>
                            <label htmlFor="AlbumName">Album Name</label>
                            <input
                                name="AlbumName"
                                value={data.album_name}
                                placeholder="Dark Side of the Moon"
                                className="block w-full border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm"
                                onChange={(e) => {
                                    setData("album_name", e.target.value);
                                    handleSearchQueryChange(e);
                                }}
                            />
                            <InputError
                                message={errors.album_name}
                                className="mt-2"
                            />
                            <label htmlFor="artist">Artist</label>
                            <input
                                name="artist"
                                value={data.artist}
                                placeholder="Pink Floyd"
                                className="block w-full border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm"
                                onChange={(e) => {
                                    setData("artist", e.target.value);
                                    handleSearchQueryChange(e);
                                }}
                                list="albumList"
                            />
                            <InputError
                                message={errors.artist}
                                className="mt-2"
                            />
                            {/* Search result menu */}
                            {searchResults &&
                                searchResults.length > 0 &&
                                showDropdown && (
                                    <div className="absolute z-10 w-full md:w-1/5 mt-2 rounded-md shadow-lg">
                                        <div className="bg-white rounded-md shadow-xs">
                                            <ul className="py-1 overflow-auto text-base leading-6 rounded-md shadow-xs max-h-32">
                                                {uniqueTitles.map((result) => (
                                                    <li
                                                        key={result.id}
                                                        className="cursor-pointer text-gray-900 hover:bg-indigo-400 hover:text-white py-2 px-3"
                                                        onClick={() =>
                                                            handleDropdownItemClick(
                                                                result
                                                            )
                                                        }
                                                    >
                                                        {result?.title}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                )}

                            <PrimaryButton
                                className="mt-4"
                                processing={processing}
                            >
                                Post Album
                            </PrimaryButton>
                        </form>
                    </div>
                    <div className="flex flex-col md:flex-row flex-wrap">
                        {albums.map((album) => (
                            <Album
                                key={album.id}
                                album={album}
                                collections={collections}
                                albumsWithRatings={albumsWithRatings}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
