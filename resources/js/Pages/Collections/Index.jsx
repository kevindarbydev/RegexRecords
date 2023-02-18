import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import { useForm, Head } from '@inertiajs/react';
 
export default function Index({ auth }) {
    const { data, setData, post, processing, reset, errors } = useForm({
        message: '',
    });
 
    const submit = (e) => {
        e.preventDefault();
        post(route('collections.store'), { onSuccess: () => reset() });
    };
 
    return (
        <AuthenticatedLayout auth={auth}>
            <Head title="Collections" />
            <div>
            <div className="container mx-auto">
            <h1 className="mb-8 text-3xl font-bold text-center">Collections</h1>
                <div className="flex items-center justify-between mb-6">
                <PrimaryButton className="px-6 py-2 text-white bg-green-500 rounded-md focus:outline-none" processing={processing}>
                        Create New Collection
                    </PrimaryButton>
                    {/* <InertiaLink
                        className="px-6 py-2 text-white bg-green-500 rounded-md focus:outline-none"
                        href={route("collections.create")}
                    >
                        Create Collection
                    </InertiaLink> */}
                </div>
           
            <div className="flex items-center justify-between mb-6">
                    {/* <InertiaLink
                        className="px-6 py-2 text-white bg-green-500 rounded-md focus:outline-none"
                        href={route("collections.create")}
                    >
                        Create Post
                    </InertiaLink> */}
                </div>

            <div className="overflow-x-auto bg-white rounded shadow">
                <table className="w-full whitespace-nowrap">
                    <thead className="text-white bg-gray-600">

                        <th className="px-6 pt-5 pb-4">
                            Collection Name
                        </th>
                        <th className="px-6 pt-5 pb-4">
                            Created Date
                        </th>
                        <th className="px-6 pt-5 pb-4">
                            Actions
                        </th>

                    </thead>
                    <tbody>

                    {/* {data.map(({ Collection_Name, Collection_Date }) => (
                    <tr>
                        <td className="border-t">
                                <InertiaLink
                                href={route("collections.edit", Collection_Name)}
                                className="flex items-center px-6 py-4 focus:text-indigo-700 focus:outline-none"
                            >
                                {Collection_Name}
                            </InertiaLink>
                        </td>
                        <td className="border-t">
                            <InertiaLink
                                href={route("collections.edit", Collection_Date)}
                                className="flex items-center px-6 py-4 focus:text-indigo-700 focus:outline-none"
                            >
                                {Collection_Date}
                            </InertiaLink>
                        </td>
                        <td className="border-t">
                                        <InertiaLink
                                            tabIndex="1"
                                            className="px-4 py-2 text-sm text-white bg-blue-500 rounded"
                                            href={route("collections.edit", id)}
                                        >
                                            Edit
                                        </InertiaLink>
                                        <InertiaLink
                                            tabIndex="1"
                                            className="px-4 py-2 text-sm text-white bg-blue-500 rounded"
                                            href={route("collections.edit", id)}
                                        >
                                            Delete
                                        </InertiaLink>
                                    </td>
                                                            
                    </tr>
                    ))} */}
                    </tbody>
                </table>
                </div>
                </div>
        </div>
        </AuthenticatedLayout>
    );
}