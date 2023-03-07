import React, { useEffect, useState } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import InputError from "@/Components/InputError";
import PrimaryButton from "@/Components/PrimaryButton";
import { useForm, Head } from "@inertiajs/react";
import Album from "./Partials/Album";
import makeRequestCreator from "@/utils/utils";
import Pagination from "@/Components/Pagination";
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

        if ((!albumName && !artist) || (albumName == "" && artist == "")) {
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

    const handleDropdownItemClick = (result) => {
        const [artist, album_name] = result.title.split(" - ");

        setData((prevData) => ({
            ...prevData,
            album_name: album_name,
            artist: artist,
        }));
        setShowDropdown(false);
    };

    
    const submit = (e) => {
        e.preventDefault();
        post(route("dashboard.albums.store"), { onSuccess: () => reset() });
    };

    return (
        <AuthenticatedLayout auth={auth} cartCount={cartCount}>
            <Head title="Albums" />
            <DashboardTabs />
            <div className="flex flex-row m-8 mb-20">
                {/* top left container (form)*/}
                <div className="w-2/4">
                    <form className="" onSubmit={submit}>
                        <label htmlFor="AlbumName">Album Name</label>
                        <input
                            name="AlbumName"
                            value={data.album_name}
                            placeholder="Dark Side of the Moon"
                            className="block w-4/6 border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm p-2 mb-2"
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
                            className="block w-4/6 border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm p-2"
                            onChange={(e) => {
                                setData("artist", e.target.value);
                                handleSearchQueryChange(e);
                            }}
                            list="albumList"
                        />
                        <InputError message={errors.artist} className="mt-2" />
                        <div className="relative">
                            <PrimaryButton
                                className="mt-4 mr-64 float-right"
                                processing={processing}
                            >
                                Post Album
                            </PrimaryButton>
                        </div>
                        {/* Search result menu */}
                        {searchResults &&
                            searchResults.length > 0 &&
                            showDropdown && (
                                <div className="absolute z-10 w-full md:w-1/5 mt-2 rounded-md shadow-lg">
                                    <div className="bg-white rounded-md shadow-xs">
                                        <ul className="py-1 overflow-auto text-base leading-6 rounded-md shadow-xs max-h-32">
                                            {searchResults.map((result) => (
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
                    </form>
                </div>
                {/* top right container (banner) */}
                <div className="dashboard-albums-right w-2/4 mr-32">
                    <h1 className="text-6xl flex justify-end ">
                        Add new albums.
                    </h1>
                    <h1 className="text-6xl flex justify-end ">
                        See your stash.
                    </h1>
                    <h1 className="text-6xl flex justify-end ">♾ Repeat.</h1>
                </div>
            </div>
            {/* bottom container (albums) */}
            <div className="dashboard-albums-bottom flex flex-col md:flex-row flex-wrap">
                {albums.data.map((album) => (
                    <Album
                        key={album.id}
                        album={album}
                        collections={collections}
                        albumsWithRatings={albumsWithRatings}
                    />
                ))}
            </div>
            <Pagination links={albums.links} />
        </AuthenticatedLayout>
    );
}
