import React from "react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { useForm, Head } from '@inertiajs/react';


dayjs.extend(relativeTime);

export default function Collection_Album({ album }) {


    return (
        <div className="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 m-6">

            <div className="flex flex-col w-64 justify-between p-4 leading-normal">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                    {album.collections_id}
                </h5>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                    Album ID: {album.album_id}
                </p>

                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                    <small className="text-sm text-gray-600">
                        Added {dayjs(album.created_at).fromNow()}
                    </small>
                </p>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                    For Sale? {album.for_sale}
                </p>

            </div>

                

        </div>

        
    );
}