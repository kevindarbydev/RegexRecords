import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import PrimaryButton from "@/Components/PrimaryButton";
import { useForm, Head, Link } from "@inertiajs/react";
import DashboardTabs from "@/Layouts/Tabs/DashboardTabs";
import InputError from "@/Components/InputError";
import Collection_Album from "@/Pages/Dashboard/Partials/Collection_Album";
import Collection from "@/Pages/Dashboard/Partials/Collection";
import Album from "./Partials/Album";

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
                                <div className="flex flex-row flex-wrap">
                                    {collection_albums.map((collection_album) =>
                                        albums.map((album) =>
                                            album.id ==
                                                collection_album.album_id &&
                                            collection_album.collection_id ==
                                                collection.id ? (
                                                <Album
                                                    key={album.id}
                                                    album={album}
                                                />
                                            ) : (
                                                <div></div>
                                            )
                                        )
                                    )}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
