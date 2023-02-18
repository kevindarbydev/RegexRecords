import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import InputError from "@/Components/InputError";
import PrimaryButton from "@/Components/PrimaryButton";
import { useForm, Head } from "@inertiajs/react";

export default function Show({ auth, collections }) {
    const { data, setData, post, processing, reset, errors } = useForm({
        collection_name: "",
    });

    // const submit = (e) => {
    //     e.preventDefault();
    //     post(route("collections.store"), { onSuccess: () => reset() });
    // };

    return (
        <AuthenticatedLayout auth={auth}>
            <Head title="Collections" />
            <div>
                <div className="container mx-auto">
                    <h1 className="mb-8 text-3xl font-bold text-center">
                        Collections
                    </h1>
                    <div className="flex items-center justify-between mb-6">
                        <PrimaryButton
                            className="px-6 py-2 text-white bg-green-500 rounded-md focus:outline-none"
                            
                        >
                            <Link href="{ route('collections.index') }">Create New Collection</Link>
                        </PrimaryButton>
                    </div>

                    <div className="overflow-x-auto bg-white rounded shadow">
                        <table className="w-full whitespace-nowrap">
                            <thead className="text-white bg-gray-600">
                                <th className="px-6 pt-5 pb-4">
                                    Collection Name
                                </th>
                                <th className="px-6 pt-5 pb-4">Created Date</th>
                                <th className="px-6 pt-5 pb-4">Actions</th>
                            </thead>
                            <tbody>
                                {collections.map(
                                    ({ collection_name, collection_date }) => (
                                        <tr>
                                            <td className="border-t">
                                                <Link
                                                    href={route(
                                                        "collections.edit",
                                                        collection_name
                                                    )}
                                                    className="flex items-center px-6 py-4 focus:text-indigo-700 focus:outline-none"
                                                >
                                                    {collection_name}
                                                </Link>
                                            </td>
                                            <td className="border-t">
                                                <Link
                                                    href={route(
                                                        "collections.edit",
                                                        collection_date
                                                    )}
                                                    className="flex items-center px-6 py-4 focus:text-indigo-700 focus:outline-none"
                                                >
                                                    {collection_date}
                                                </Link>
                                            </td>
                                            <td className="border-t">
                                                <Link
                                                    tabIndex="1"
                                                    className="px-4 py-2 text-sm text-white bg-blue-500 rounded"
                                                    href={route(
                                                        "collections.edit",
                                                        user_id
                                                    )}
                                                >
                                                    Edit
                                                </Link>
                                                <Link
                                                    tabIndex="1"
                                                    className="px-4 py-2 text-sm text-white bg-blue-500 rounded"
                                                    href={route(
                                                        "collections.edit",
                                                        user_id
                                                    )}
                                                >
                                                    Delete
                                                </Link>
                                            </td>
                                        </tr>
                                    )
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
