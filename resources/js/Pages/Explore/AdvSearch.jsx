import React, { useState } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm } from "@inertiajs/react";
import ExploreTabs from "@/Layouts/Tabs/ExploreTabs";
import InputError from "@/Components/InputError";
import PrimaryButton from "@/Components/PrimaryButton";
import AdvSearchResults from "./Partials/AdvSearchResults";

export default function AdvSearch({
    auth,
    albums,
    collections,
    cartCount,
    message,
    albumsWithRatings,
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
        lowPriceRange: "",
        highPriceRange: "",
    });

    const submit = (e) => {
        e.preventDefault();
        // remove onsuccess reset after testing
        post(route("explore.advSearch.post"), { onSuccess: () => reset() });
    };

    //? --------- RANGE SLIDERS ---------
    const currentYear = new Date().getFullYear();

    // state used for displaying values as slider moves
    const [lowYear, setLowYear] = useState();
    const [highYear, setHighYear] = useState();
    const [lowPrice, setLowPrice] = useState();
    const [highPrice, setHighPrice] = useState();

    // handlers called from onChange so as to fire more than one event with a single onClick
    const handleLowYear = (e) => {
        setLowYear(e.target.value);
        setData("lowYearRange", e.target.value);
        document.getElementById("YearOfRelease").disabled = true;
    };

    const handleHighYear = (e) => {
        setHighYear(e.target.value);
        setData("highYearRange", e.target.value);
        document.getElementById("YearOfRelease").disabled = true;
    };

    const handleLowPrice = (e) => {
        setLowPrice(e.target.value);
        setData("lowPriceRange", e.target.value);
        document.getElementById("Value").disabled = true;
    };

    const handleHighPrice = (e) => {
        setHighPrice(e.target.value);
        setData("highPriceRange", e.target.value);
        document.getElementById("Value").disabled = true;
    };

    // returns sliders to original values, unhides (exact) year & price inputs
    const resetSliders = () => {
        document.getElementById("lowYear").value = { lowYear };
        document.getElementById("highYear").value = { highYear };

        document.getElementById("lowPrice").value = { lowPrice };
        document.getElementById("highPrice").value = { highPrice };

        document.getElementById("YearOfRelease").disabled = false;
        document.getElementById("Value").disabled = false;
    };

    // erases inputted values - various common reset methods failed, so had to go this route
    const resetForm = () => {
        document.getElementById("albumName").value = "";
        document.getElementById("artist").value = "";
        document.getElementById("genre").value = "";
        document.getElementById("subgenres").value = "";
        document.getElementById("YearOfRelease").value = "";
        document.getElementById("Value").value = "";
        resetSliders();
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
                            id="albumName"
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
                            id="artist"
                            value={data.artist}
                            className="block w-full border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm mb-3 p-1"
                            onChange={(e) => setData("artist", e.target.value)}
                        />

                        <InputError message={errors.artist} className="mt-2" />

                        <label htmlFor="Genre">Genre</label>

                        <input
                            name="Genre"
                            id="genre"
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
                            id="subgenres"
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
                            id="YearOfRelease"
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
                            Lowest: <b>{lowYear}</b>
                        </label>

                        <input
                            type="range"
                            min="1920"
                            max={currentYear - 1}
                            name="lowYearRange"
                            id="lowYear"
                            value={lowYear}
                            step="1"
                            className="h-2 w-full cursor-pointer appearance-none rounded-lg border-solid bg-blue-500/20 mb-3 mt-2 accent-pink-400"
                            onChange={handleLowYear}
                        />

                        <InputError message={errors.lowYear} className="mt-2" />

                        <label className="mt-2" htmlFor="highYear">
                            Highest: <b>{highYear}</b>
                        </label>

                        <input
                            type="range"
                            min={lowYear}
                            max={currentYear}
                            name="highYearRange"
                            id="highYear"
                            value={highYear}
                            step="1"
                            className="h-2 w-full cursor-pointer appearance-none rounded-lg border-solid bg-blue-500/20 mb-3 mt-2 accent-pink-400"
                            onChange={handleHighYear}
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
                            id="Value"
                            value={data.value}
                            className="block w-full border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm mb-3 p-1"
                            onChange={(e) => setData("value", e.target.value)}
                        />

                        <InputError message={errors.value} className="mt-2" />

                        <h6 className="mt-2">or between...</h6>

                        <label className="mt-2" htmlFor="lowPrice">
                            Lowest: $<b>{lowPrice}</b>
                        </label>

                        <input
                            type="range"
                            min="0"
                            max={highPrice}
                            name="lowPriceRange"
                            id="lowPrice"
                            value={lowPrice}
                            step="1"
                            className="h-2 w-full cursor-pointer appearance-none rounded-lg border-solid bg-blue-500/20 mb-3 mt-2 accent-pink-400"
                            onChange={handleLowPrice}
                        />

                        <InputError
                            message={errors.lowPrice}
                            className="mt-2"
                        />

                        <label className="mt-2" htmlFor="highPrice">
                            Highest: $<b>{highPrice}</b>
                        </label>

                        <input
                            type="range"
                            min={lowPrice}
                            max="1000"
                            name="highPriceRange"
                            id="highPrice"
                            value={highPrice}
                            step="1"
                            className="h-2 w-full cursor-pointer appearance-none rounded-lg border-solid bg-blue-500/20 mb-3 mt-2 accent-pink-400"
                            onChange={handleHighPrice}
                        />

                        <InputError
                            message={errors.highPrice}
                            className="mt-2"
                        />
                    </div>
                </div>
                <PrimaryButton
                    className=" mt-14 ml-12 px-7 pt-3 pb-2.5"
                    processing={processing}
                >
                    Search
                </PrimaryButton>
            </form>
            <input
                onClick={resetSliders}
                id="reset"
                type="button"
                value="Reset Year and Price"
                className=" mt-10 ml-12 px-7 pt-3 pb-2.5 bg-slate-50"
            />
            <input
                onClick={resetForm}
                id="resetForm"
                type="button"
                value="Clear & Reset All"
                className=" mt-10 ml-12 px-7 pt-3 pb-2.5 bg-slate-50"
            />
            <AdvSearchResults
                albums={albums}
                collections={collections}
                message={message}
                albumsWithRatings={albumsWithRatings}
            />
        </AuthenticatedLayout>
    );
}
