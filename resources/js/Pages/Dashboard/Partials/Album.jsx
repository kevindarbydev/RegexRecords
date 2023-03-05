import React, { useState } from "react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import Dropdown from "@/Components/Dropdown";
import { useForm, Head } from "@inertiajs/react";
import PrimaryButton from "@/Components/PrimaryButton";
import { StarIcon } from "@heroicons/react/24/solid";

dayjs.extend(relativeTime);

export default function Album({ album, collections, albumsWithRatings }) {
    const { data, setData, post, processing, reset, errors } = useForm({
        album_id: album.id,
        collection_name: "",
    });

    const submit = (e) => {
        e.preventDefault();
        post(route("dashboard.album.to.collection"), {
            onSuccess: () => reset(),
        });
    
    };

    return (
        <div className="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 m-6">
            <a
                href={route("dashboard.albums.show", { album: album.id })}
                className="flex items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 m-6"
            >
                {album.cover_image_url ? (
                    <img
                        className="object-fill w-full h-1/2 rounded-t-lg md:h-full md:w-48 md:rounded-none md:rounded-l-lg"
                        src={album.cover_image_url}
                        alt=""
                    />
                ) : (
                    <img
                        className="object-fill w-full h-1/2 rounded-t-lg md:h-full  md:w-48 md:rounded-none md:rounded-l-lg"
                        src="storage/record_icon.png"
                        alt=""
                    />
                )}
            </a>
            <div className="flex flex-col w-64 justify-between p-4 leading-normal">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white flex flex-row">
                    <a
                        className="flex-1"
                        href={route("dashboard.albums.show", album.id)}
                    >
                        {album.album_name}
                    </a>
                    <h3 className="text-gray-500 self-center">
                        <div className="flex flex-row">
                            {albumsWithRatings.name_and_rating.map((a) =>
                                album.id == a[0] && a[1] != null ? (
                                    <>
                                        <StarIcon className="w-4 h-4 self-center" />
                                        <span className=" text-sm self-center">
                                            {a[1]}
                                        </span>
                                    </>
                                ) : (
                                    <></>
                                )
                            )}
                        </div>
                    </h3>
                </h5>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                    Artist: {album.artist}
                </p>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                    {album.value} $
                </p>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                    <small className="text-sm text-gray-600">
                        Added {dayjs(album.created_at).fromNow()}
                    </small>
                </p>{" "}
                {/* <button
                        type="submit"
                        onClick={submit}
                        className="px-2 py-1 font-bold text-white bg-green-500 rounded hover:bg-orange-400"
                    >
                        Add to Collection
                    </button> */}
                <form onSubmit={submit}>
                    <select
                        className="text-black"
                        name="collection"
                        onChange={(e) =>
                            setData("collection_name", e.target.value)
                        }
                    >
                        <option value="" hidden>
                            {" "}
                            Select a collection{" "}
                        </option>
                        {collections.map((collection) => (
                            <option className="text-black">
                                {collection.collection_name}
                            </option>
                        ))}
                    </select>

                    <PrimaryButton className="mt-4" processing={processing}>
                        Add to Collection
                    </PrimaryButton>
                </form>
            </div>
        </div>
    );
}
