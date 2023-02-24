import React, { useState } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import PrimaryButton from "@/Components/PrimaryButton";
import { useForm, Head, Link } from "@inertiajs/react";
import DashboardTabs from "@/Layouts/Tabs/DashboardTabs";

export default function Collection_Albums({ auth, collection, collection_albums, albums }) {
    return (
        <AuthenticatedLayout auth={auth}>
            <DashboardTabs />
            <Head title="View Collection" />
            <div className="relative overflow-x-auto">
                <h5 className="mt-2 mb-2 text-center">{collection.collection_name}</h5>
                <table className="w-1/2 text-sm text-left text-gray-500 dark:text-gray-400 mx-auto mt-10">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <th scope="col" class="px-6 py-3">
                            Album
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Artist
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Value
                        </th>
                        <th scope="col" class="px-6 py-3">
                            For Sale?
                        </th>
                    </thead>
                    {collection_albums.map(
                        (collection_album) =>
                            albums.map((album) =>
                                album.id ==
                                    collection_album.album_id &&
                                    collection_album.collection_id ==
                                    collection.id ? (
                                    <tbody>
                                        <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                            <th
                                                scope="row"
                                                class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                            >
                                                <img
                                                    className="rounded-t-lg md:h-full md:w-20 md:rounded-none md:rounded-l-lg mr-5"
                                                    src={
                                                        album.cover_image_url
                                                    }
                                                    alt=""
                                                />
                                                <p className="pt-2">
                                                    {
                                                        album.album_name
                                                    }
                                                </p>
                                            </th>
                                            <td class="px-6 py-4">
                                                {
                                                    album.artist
                                                }
                                            </td>
                                            <td class="px-6 py-4">
                                                {
                                                    album.value
                                                }
                                                $
                                            </td>
                                            {
                                                collection_album.for_sale == 0 ?
                                                    <td class="px-6 py-4">
                                                        No
                                                    </td>
                                                    :
                                                    <td class="px-6 py-4">
                                                        Yes
                                                    </td>
                                            }

                                        </tr>
                                    </tbody>
                                ) : (
                                    <div></div>
                                )
                            )
                    )}
                </table>
            </div>
        </AuthenticatedLayout>
    )
}