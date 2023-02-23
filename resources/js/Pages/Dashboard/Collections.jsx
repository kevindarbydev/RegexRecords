import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import PrimaryButton from "@/Components/PrimaryButton";
import { useForm, Head, Link } from "@inertiajs/react";
import DashboardTabs from "@/Layouts/Tabs/DashboardTabs";
import InputError from "@/Components/InputError";
import Collection_Album from "@/Pages/Dashboard/Partials/Collection_Album";
import Collection from "@/Pages/Dashboard/Partials/Collection";
import Album from "./Partials/Album";
import { HandThumbUpIcon } from "@heroicons/react/24/solid";

export default function Index({ auth, collection_albums, collection, albums }) {
    const { data, setData, post, processing, reset, errors } = useForm({
        collection_name: "",
    });

    const submit = (e) => {
        e.preventDefault();
        post(route("dashboard.collections.store"), {
            onSuccess: () => reset(),
        });
    };

    return (
        <AuthenticatedLayout auth={auth}>
            <DashboardTabs />
            <Head title="Collection" />
            <div className="flex flex-col">
                <div className="p-4 sm:p-6 lg:p-8 ml-10">
                    {collection == null ? (
                        <form name="createForm" onSubmit={submit}>
                            <div className="flex flex-col">
                                {/* FIXME:
                                 *  if there are no collections at all --> can't add collection
                                 *  changed it to != null for now
                                 */}
                                <div className="mb-4">
                                    <label className="">Title</label>
                                    <input
                                        type="text"
                                        className="w-full px-4 py-2"
                                        label="Collection Name"
                                        name="collection_name"
                                        value={data.collection_name}
                                        onChange={(e) =>
                                            setData(
                                                "collection_name",
                                                e.target.value
                                            )
                                        }
                                    />
                                    <InputError
                                        message={errors.collection_name}
                                        className="mt-2"
                                    />
                                    <button
                                        type="submit"
                                        className="px-6 py-2 font-bold text-white bg-green-500 rounded"
                                    >
                                        Create Collection
                                    </button>
                                </div>
                            </div>
                        </form>
                    ) : (
                        <div>
                            <div>
                                <div className="mt-6 bg-white shadow-sm rounded-lg divide-y">
                                    <Collection
                                        key={collection.id}
                                        collection={collection}
                                    />
                                </div>
                                <div className="relative overflow-x-auto">
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
                                                        // <Album
                                                        //     key={album.id}
                                                        //     album={album}
                                                        // />
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
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
