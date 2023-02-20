import React from "react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

export default function Album({ album }) {
    const albumCoverStyle = {};

    return (
        <div className="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 m-6">
            {album.cover_image_url ? (
                <img
                    className="object-cover w-full h-1/2 rounded-t-lg md:h-full md:w-48 md:rounded-none md:rounded-l-lg"
                    src={album.cover_image_url}
                    alt=""
                />
            ) : (
                <img
                    className="object-cover w-full h-1/2 rounded-t-lg md:h-full  md:w-48 md:rounded-none md:rounded-l-lg"
                    src="storage/record_icon.png"
                    alt=""
                />
            )}
            <div className="flex flex-col w-64 justify-between p-4 leading-normal">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                    {album.album_name}
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
            </div>
        </div>
    );
}
