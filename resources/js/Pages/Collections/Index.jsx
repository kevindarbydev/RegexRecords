import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import PrimaryButton from "@/Components/PrimaryButton";
import { useForm, Head, Link } from "@inertiajs/react";
import DashboardTabs from "@/Components/Tabs/DashboardTabs";
import InputError from "@/Components/InputError";
import Collection_Album from "@/Components/Collection_Album";
import Collection from "@/Components/Collection";

export default function Index({ auth, collection_albums, collections, albums }) {
    const { data, setData, post, processing, reset, errors } = useForm({
        collection_name: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route("collections.store"), { onSuccess: () => reset() });
    };
    return (
        <AuthenticatedLayout auth={auth}>
            <DashboardTabs />
            <Head title="Collection" />
            <div className="flex flex-row">
                <div className="p-4 sm:p-6 lg:p-8 ml-10">
                    <form name="createForm" onSubmit={submit}>
                        <div className="flex flex-col">
                            {collections == null ?
                                <div className="mb-4">
                                    <label className="">Title</label>
                                    <input
                                        type="text"
                                        className="w-full px-4 py-2"
                                        label="Collection Name"
                                        name="collection_name"
                                        value={data.collection_name}
                                        onChange={(e) =>
                                            setData("collection_name", e.target.value)
                                        }
                                    />
                                    <InputError message={errors.collection_name} className="mt-2" />
                                    <button
                                        type="submit"
                                        className="px-6 py-2 font-bold text-white bg-green-500 rounded"
                                    >
                                        Create Collection
                                    </button>
                                </div>
                                :
                                <div></div>
                            }
                        </div>
                    </form>
                    <div className="mt-6 bg-white shadow-sm rounded-lg divide-y">
                        {collections.map((collection) => (
                            <Collection key={collection.id} collection={collection} />
                        ))}
                    </div>
                </div>
                <div className="flex flex-row flex-wrap">
                    {collection_albums.map((collection_album) => (

                        <Collection_Album key={collection_album.id} collection_album={collection_album} />

                    ))}
                </div>
            </div>
        </AuthenticatedLayout >
    );
}
