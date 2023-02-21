import React from "react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { useForm, Head } from "@inertiajs/react";

dayjs.extend(relativeTime);

export default function Album({ album }) {
    const { data, setData, post, processing, reset, errors } = useForm();
    const submit = (e) => {
        console.log("submit button works");
        e.preventDefault();
        post(route("collection_albums.store"), { onSuccess: () => reset() });
        console.log("Post Passed");
    };

    return (
        <div className="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 m-6">
            <a
                href={route("albums.show", { album: album.id })}
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
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                    <a href={route("albums.show", album.id)}>
                        {album.album_name}
                    </a>
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
                </p>

                <p>
                    {" "}
                    <button
                        type="submit"
                        onClick={submit}
                        className="px-2 py-1 font-bold text-white bg-green-500 rounded hover:bg-orange-400"
                    >
                        Add to Collection
                    </button>
                </p>
            </div>
        </div>
    );
}
