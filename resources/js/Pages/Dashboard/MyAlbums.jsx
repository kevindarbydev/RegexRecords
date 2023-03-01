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
    const { data, setData, post, processing, reset, errors } = useForm({
        album_name: "",
        artist: "",
        value: "",
    });

    const [searchQuery, setSearchQuery] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [searchTimeout, setSearchTimeout] = useState("");

    //    useEffect(() => {
    //     console.log("query: " + searchQuery.length);
    //       if (searchQuery === "") {
    //         console.log("empty str");
    //           setSearchResults([]);
    //           return;
    //       }
    //        const delay = setTimeout(() => {
    //            axios
    //                .get("/proxy", {
    //                    params: {
    //                        url: "https://api.discogs.com/database/search",
    //                        q: searchQuery,
    //                        type: "release",
    //                        per_page: 10,
    //                    },
    //                })
    //                .then((response) => {
    //                    setSearchResults(response.data.results);
    //                })
    //                .catch((error) => {
    //                    console.log("Error fetching search results:", error);
    //                });
    //        }, 500); // wait for 500 milliseconds after the user stops typing

    //        return () => clearTimeout(delay);
    //    }, [searchQuery]);

    const prevQueryRef = useRef("");

    // useEffect(() => {
    //     const delay = setTimeout(() => {
    //         const currentQuery = searchQuery.trim();

    //         if (currentQuery === prevQueryRef.current) {
    //             return;
    //         }

    //         prevQueryRef.current = currentQuery;

    //         if (!currentQuery) {
    //             setSearchResults([]);
    //             return;
    //         }

    //         axios
    //             .get("/proxy", {
    //                 params: {
    //                     url: "https://api.discogs.com/database/search",
    //                     q: currentQuery,
    //                     type: "release",
    //                     per_page: 10,
    //                 },
    //             })
    //             .then((response) => {
    //                 setSearchResults(response.data.results);
    //             })
    //             .catch((error) => {
    //                 console.log("Error fetching search results:", error);
    //             });
    //     }, 500);

    //     return () => clearTimeout(delay);
    // }, [searchQuery]);

    useEffect(() => {
        const delay = setTimeout(() => {
            const currentQuery = searchQuery.trim();

            useEffect(() => {
                if (!searchQuery) {
                    setSearchResults([]);
                    return;
                }
                const delay = setTimeout(() => {
                    axios
                        .get("/proxy", {
                            params: {
                                url: "https://api.discogs.com/database/search",
                                q: searchQuery,
                                type: "release",
                                per_page: 10,
                            },
                        })
                        .then((response) => {
                            setSearchResults(response.data.results);
                        })
                        .catch((error) => {
                            console.log("Error fetching search results:", error);
                        });
                }, 500); // wait for 500 milliseconds after the user stops typing

                return () => clearTimeout(delay);
            }, [searchQuery]);

            if (!currentQuery) {
                console.log("input fields empty, clearing results");
                setSearchResults([]);
                return;
            }
            console.log("current q: " + currentQuery);
            const res = search(currentQuery)
                .then((results) => {
                    console.log("results: " + results);
                    console.dir(results);
                    setSearchResults(results);
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
            return;
        }

        setSearchQuery(`${albumName} ${artist}`);
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
                        />
                        <InputError message={errors.artist} className="mt-2" />
                        <div>
                            <ul>
                                <li>start of results</li>
                                {searchResults &&
                                    searchResults
                                        .filter(
                                            (result, index, self) =>
                                                self.findIndex(
                                                    (a) =>
                                                        a.title === result.title
                                                ) === index
                                        )
                                        .map((result) => (
                                            <li key={result.id}>
                                                {result.title}
                                            </li>
                                        ))}
                            </ul>
                        </div>

                        <PrimaryButton className="mt-4" processing={processing}>
                            Post Album
                        </PrimaryButton>
                    </form>
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
