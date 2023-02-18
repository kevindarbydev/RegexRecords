import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import InputError from "@/Components/InputError";
import PrimaryButton from "@/Components/PrimaryButton";
import { useForm, Head, Link } from "@inertiajs/react";

export default function Index({ auth, collections }) {
    const { data, setData, post, processing, reset, errors } = useForm({
        collection_name: '',
    });

        const submit = (e) => {
        e.preventDefault();
        post(route("collections.store"), { onSuccess: () => reset() });
    };

    return (
        <AuthenticatedLayout auth={auth}>
             <Head title="Create Collection" />
            <div className="max-w-2xl mx-auto p-4 sm:p-6 lg:p-8">
                <form name="createForm" onSubmit={submit}>
                    <div className="flex flex-col">
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
                        </div>
                    </div>
                    <div className="mt-4">
                            <button
                                type="submit"
                                className="px-6 py-2 font-bold text-white bg-green-500 rounded"
                            >
                                Create Collection
                            </button>
                        </div>
                </form>
            </div>
            <div className="container mx-auto">                        
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

                   <tr>
                    <td className="border-t">
                        {collections.collection_name}
                    </td>
                    <td className="border-t">
                        {collections.collection_date}
                    </td>
                    </tr>             
            </tbody>
                            
            </table>

            </div>
</div>


        </AuthenticatedLayout>
    );
}
