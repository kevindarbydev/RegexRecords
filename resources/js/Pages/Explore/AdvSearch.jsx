import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import ExploreTabs from "@/Layouts/Tabs/ExploreTabs";
import InputError from "@/Components/InputError";
import PrimaryButton from "@/Components/PrimaryButton";
import Album from "../Dashboard/Partials/Album";
import AdvSearchResults from "./Partials/AdvSearchResults";

export default function AdvSearch({ auth, albums, collections, cartCount }) {
    const { data, setData, post, processing, reset, errors } = useForm({
        album_name: "",
        artist: "",
        value: "",
        genre: "",
        subgenres: "",
        year_of_release: "",
    });

    const submit = (e) => {
        e.preventDefault();
        post(route("explore.advSearch.post"), { onSuccess: () => reset() });
    };

    return (
        <AuthenticatedLayout auth={auth} cartCount={cartCount}>
            <Head title="Advanced Search" />
            <ExploreTabs />
            <h1 className="text-4xl m-4">Advanced Search 🔎</h1>

            <form onSubmit={submit}>
                <div className="advSearch-container">
                    {/* //? ---------- LEFT SECTION ---------- */}
                    <div className="advSearch-left ml-12 mr-12 mt-10">
                        <label htmlFor="AlbumName">Album Name/Title</label>
                        <input
                            name="AlbumName"
                            value={data.album_name}
                            className="block w-full border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm mb-3 p-1"
                            onChange={(e) =>
                                setData("album_name", e.target.value)
                            }
                        />
                        <InputError
                            message={errors.album_name}
                            className="mt-2"
                        />
                        <label htmlFor="Artist">Artist</label>
                        <input
                            name="Artist"
                            value={data.artist}
                            className="block w-full border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm mb-3 p-1"
                            onChange={(e) => setData("artist", e.target.value)}
                        />
                        <InputError message={errors.artist} className="mt-2" />
                        <label htmlFor="Genre">Genre</label>
                        <input
                            name="Genre"
                            value={data.genre}
                            className="block w-full border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm mb-3 p-1"
                            onChange={(e) => setData("genre", e.target.value)}
                        />
                        <InputError
                            message={errors.album_name}
                            className="mt-2"
                        />
                        <label htmlFor="Subgenre">Subgenre</label>
                        <input
                            name="Subgenre"
                            value={data.subgenres}
                            className="block w-full border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm p-1"
                            onChange={(e) =>
                                setData("subgenres", e.target.value)
                            }
                        />
                        <InputError
                            message={errors.subgenres}
                            className="mt-2"
                        />
                    </div>

                    {/* //? ---------- CENTER SECTION ---------- */}

                    <div className="advSearch-center ml-2 mr-2">
                        <label htmlFor="YearOfRelease">Year of Release</label>
                        <input
                            name="YearOfRelease"
                            value={data.year_of_release}
                            className="block w-full border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm mb-3 p-1"
                            onChange={(e) =>
                                setData("year_of_release", e.target.value)
                            }
                        />
                        <InputError
                            message={errors.year_of_release}
                            className="mt-2"
                        />
                        <h6 className="mt-2">or between...</h6>
                        <label className="mt-2" htmlFor="yearRange">
                            Lowest:
                        </label>

                        <input
                            type="range"
                            min="1920"
                            max="2023"
                            name="YearRangeLow"
                            value={data.YearRangeLow}
                            step="1"
                            className="h-2 w-full cursor-pointer appearance-none rounded-lg border-solid bg-blue-500/20 mb-3 mt-2 accent-pink-400"
                            onChange={(e) =>
                                setData("YearRangeLow", e.target.value)
                            }
                        />
                        <InputError
                            message={errors.yearRangeLow}
                            className="mt-2"
                        />
                        <label className="mt-2" htmlFor="yearRangeHigh">
                            Highest:
                        </label>
                        <input
                            type="range"
                            min="1921"
                            //* change min to reflect lowest possible in db following a query
                            max="2024"
                            name="yearRangeHigh"
                            value={data.yearRangeHigh}
                            step="1"
                            className="h-2 w-full cursor-pointer appearance-none rounded-lg border-solid bg-blue-500/20 mb-3 mt-2 accent-pink-400"
                            onChange={(e) =>
                                setData("yearRangeHigh", e.target.value)
                            }
                        />
                        <InputError
                            message={errors.valueRangeHigh}
                            className="mt-2"
                        />
                    </div>

                    {/* //? ---------- RIGHT SECTION ---------- */}

                    <div className="advSearch-right ml-12 mr-12">
                        <label htmlFor="Value">Exact Value/Price ($)</label>
                        <input
                            name="Value"
                            value={data.value}
                            className="block w-full border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm mb-3 p-1"
                            onChange={(e) => setData("value", e.target.value)}
                        />
                        <InputError message={errors.value} className="mt-2" />

                        <h6 className="mt-2">or between...</h6>
                        <label className="mt-2" htmlFor="valueRange">
                            Lowest:
                        </label>
                        <input
                            type="range"
                            min="0"
                            max="999"
                            name="valueRangeLow"
                            value={data.valueRangeLow}
                            step="1"
                            className="h-2 w-full cursor-pointer appearance-none rounded-lg border-solid bg-blue-500/20 mb-3 mt-2 accent-pink-400"
                            onChange={(e) =>
                                setData("valueRangeLow", e.target.value)
                            }
                        />
                        <InputError
                            message={errors.valueRangeLow}
                            className="mt-2"
                        />
                        <label className="mt-2" htmlFor="valueRangeHigh">
                            Highest:
                        </label>
                        <input
                            type="range"
                            min="0.01"
                            //? change max to reflect highest possible in db following a query
                            max="1000"
                            name="valueRangeHigh"
                            value={data.valueRangeHigh}
                            step="1"
                            className="h-2 w-full cursor-pointer appearance-none rounded-lg border-solid bg-blue-500/20 mb-3 mt-2 accent-pink-400"
                            onChange={(e) =>
                                setData("valueRangeHigh", e.target.value)
                            }
                        />
                        <InputError
                            message={errors.valueRangeHigh}
                            className="mt-2"
                        />
                    </div>
                    <PrimaryButton
                        className=" mt-14 ml-12 px-7 pt-3 pb-2.5"
                        processing={processing}
                    >
                        Search
                    </PrimaryButton>
                </div>
            </form>
            <AdvSearchResults albums={albums} collections={collections} />
        </AuthenticatedLayout>
    );
}
