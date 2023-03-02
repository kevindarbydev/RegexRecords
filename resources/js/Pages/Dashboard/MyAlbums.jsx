import React, { useEffect, useState, useRef } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import InputError from "@/Components/InputError";
import PrimaryButton from "@/Components/PrimaryButton";
import { useForm, Head } from "@inertiajs/react";
import Album from "./Partials/Album";
import makeRequestCreator from "@/utils/utils";
const search = makeRequestCreator("/proxy");

import DashboardTabs from "@/Layouts/Tabs/DashboardTabs";

export default function Index({ auth, albums, collections, cartCount }) {
    //TODO: fix ->dropdown list still shows after album is added, either empty thin white div or the entire list still shows
    // make options in the list clickable (fill in fields)
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
                console.log("input fields empty, clearing results");
                setSearchResults([]);
                setShowDropdown(false);
                return;
            }
            console.log("current q: " + currentQuery);
            const res = search(currentQuery)
                .then((results) => {
                    console.log("results: " + results);
                    console.dir(results);
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
            console.log("Found either artist or album, not both");
            const impreciseQuery = albumName || artist;
            setSearchQuery(impreciseQuery);
        } else {
            console.log("found both, trying precise query");
            setSearchQuery(`${albumName},${artist}`);
        }
    };
    const handleDropdownItemClick = (result) => {
        const [artist, album_name] = result.title.split(" - ");
        setData("album_name", album_name);
        setData("artist", artist);
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
            <div className="flex flex-row">
                <div className="p-4 sm:p-6 lg:p-8 ml-10">
                    <div className="relative">
                        <form className="w-full md:w-1/2 m-6" onSubmit={submit}>
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

                            <PrimaryButton
                                className="mt-4"
                                processing={processing}
                            >
                                Post Album
                            </PrimaryButton>
                        </form>

                        {searchResults && showDropdown && (
                            <div className="absolute z-10 w-full mt-2 rounded-md shadow-lg">
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
                                                {result.title}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        )}
                    </div>
                    <div className="flex flex-row flex-wrap">
                        {albums.map((album) => (
                            <Album
                                key={album.id}
                                album={album}
                                collections={collections}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
