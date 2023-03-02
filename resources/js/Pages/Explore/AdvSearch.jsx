import React, { useState } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import ExploreTabs from "@/Layouts/Tabs/ExploreTabs";
import InputError from "@/Components/InputError";
import PrimaryButton from "@/Components/PrimaryButton";
import Album from "../Dashboard/Partials/Album";
import AdvSearchResults from "./Partials/AdvSearchResults";

export default function AdvSearch({
    auth,
    albums,
    collections,
    cartCount,
    message,
}) {
    const { data, setData, post, processing, reset, errors } = useForm({
        album_name: "",
        artist: "",
        value: "",
        genre: "",
        subgenres: "",
        year_of_release: "",
        lowYearRange: "",
        highYearRange: "",
    });

    const submit = (e) => {
        e.preventDefault();
        // remove onsuccess reset after testing
        post(route("explore.advSearch.post"), { onSuccess: () => reset() });
    };

    //? --------- YEAR RANGES ---------
    const currentYear = new Date().getFullYear();

    // used for displaying values to user as slider moves
    const [lowYear, setLowYear] = useState();

    // called from onChange on slider input
    //* contains 2 functions so as to have 2 events on onChange at once, but might be/is failing
    const changeLowYear = (event) => {
        setLowYear(event.target.value);
        sendLowYear();
    };
    //* supposed to send the data to controller
    const sendLowYear = (e) => setData("lowYearRange", e.target.value);

    // used for displaying values to user as slider moves
    const [highYear, setHighYear] = useState();

    const sendHighYear = (e) => setData("highYearRange", e.target.value);

    const changeHighYear = (event) => {
        setHighYear(event.target.value);
        sendHighYear();
    };

    //? --------- PRICE VALUE RANGES ---------
    //!once year range works, apply logic here, for now all this does is show the user the slider values
    const [lowPrice, setLowPrice] = useState();

    const changeLowPrice = (event) => {
        setLowPrice(event.target.value);
    };

    const [highPrice, setHighPrice] = useState();

    const changeHighPrice = (event) => {
        setHighPrice(event.target.value);
    };

    return (
        <AuthenticatedLayout auth={auth} cartCount={cartCount}>
            <Head title="Advanced Search" />
            <ExploreTabs />
            <h1 className="text-4xl m-4">🔎 Advanced Search</h1>

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
                        <label className="mt-2" htmlFor="lowYear">
                            Lowest: {lowYear}
                        </label>

                        <input
                            type="range"
                            min="1920"
                            max={currentYear - 1}
                            name="lowYearRange"
                            value={data.lowYear}
                            step="1"
                            className="h-2 w-full cursor-pointer appearance-none rounded-lg border-solid bg-blue-500/20 mb-3 mt-2 accent-pink-400"
                            // onChange={(e) =>
                            //     setLowYear("lowYear", e.target.value)
                            // }
                            onChange={changeLowYear}
                        />
                        <InputError message={errors.lowYear} className="mt-2" />
                        <label className="mt-2" htmlFor="highYear">
                            Highest: {highYear}
                        </label>
                        <input
                            type="range"
                            min={lowYear}
                            max={currentYear}
                            name="highYearRange"
                            value={data.highYear}
                            step="1"
                            className="h-2 w-full cursor-pointer appearance-none rounded-lg border-solid bg-blue-500/20 mb-3 mt-2 accent-pink-400"
                            // onChange={(e) =>
                            //     setData("highYear", e.target.value)
                            // }
                            onChange={changeHighYear}
                        />
                        <InputError
                            message={errors.highYear}
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
                        <label className="mt-2" htmlFor="lowPrice">
                            Lowest: ${lowPrice}
                        </label>
                        <input
                            type="range"
                            min="0"
                            max={highPrice}
                            name="lowPrice"
                            value={lowPrice}
                            step="1"
                            className="h-2 w-full cursor-pointer appearance-none rounded-lg border-solid bg-blue-500/20 mb-3 mt-2 accent-pink-400"
                            // onChange={(e) =>
                            //     setData("lowPrice", e.target.value)
                            // }
                            onChange={changeLowPrice}
                        />
                        <InputError
                            message={errors.lowPrice}
                            className="mt-2"
                        />
                        <label className="mt-2" htmlFor="highPrice">
                            Highest: ${highPrice}
                        </label>
                        <input
                            type="range"
                            min={lowPrice}
                            max="1000"
                            name="highPrice"
                            value={highPrice}
                            step="1"
                            className="h-2 w-full cursor-pointer appearance-none rounded-lg border-solid bg-blue-500/20 mb-3 mt-2 accent-pink-400"
                            // onChange={(e) =>
                            //     setData("valueRangeHigh", e.target.value)
                            // }
                            onChange={changeHighPrice}
                        />
                        <InputError
                            message={errors.highPrice}
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
            <AdvSearchResults
                albums={albums}
                collections={collections}
                message={message}
            />
        </AuthenticatedLayout>
    );
}
