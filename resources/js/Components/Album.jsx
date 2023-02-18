import React from "react";

export default function Album({ album }) {
    return (
        <div className="flex flex-row bg-white shadow-sm rounded-lg mb-3">
            <img
                class="object-cover w-1/4 rounded-t-lg h-96 md:h-1/4 md:w-1/4 md:rounded-none md:rounded-l-lg"
                src="storage/record_icon.png"
                alt=""
            />
            <div class="flex flex-row justify-between p-4 leading-normal">
                <div class="mb-2 text-base font-bold tracking-tight text-gray-900 dark:text-white">
                    <p className="mt-4 text-gray-900">
                        Album: {album.album_name}
                    </p>
                    <p className="mt-4 text-gray-900">Artist: {album.artist}</p>
                    <p className="mt-4 text-gray-900">
                        Value ($): {album.value}
                    </p>
                    <p className="mt-4 text-gray-900">
                        Added on: {new Date(album.created_at).toLocaleString()}
                    </p>
                </div>
                <div className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white"></div>
            </div>
        </div>
    );
}
