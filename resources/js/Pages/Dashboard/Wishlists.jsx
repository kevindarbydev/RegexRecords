import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import Wishlist from "@/Pages/Dashboard/Partials/Wishlist";
import PrimaryButton from "@/Components/PrimaryButton";
import { useForm, Head } from "@inertiajs/react";
import DashboardTabs from "@/Layouts/Tabs/DashboardTabs";

export default function Index({ auth, wishlist_albums }) {
    const { data, setData, post, processing, reset, errors } = useForm({
        list_name: "",
    });

    const submit = (e) => {
        e.preventDefault();
        post(route("wishlists.store"), { onSuccess: () => reset() });
    };

    return (
        <AuthenticatedLayout auth={auth}>
            <DashboardTabs />
            <Head title="Wishlist" />
            <div className="max-w-2xl mx-auto p-4 sm:p-6 lg:p-8">
                <p>My Wishlist
                    </p> 
                    <p>
                    <PrimaryButton className="mt-4">Add Albums</PrimaryButton>    
                    </p>
                
                <table className=" w-1/2 text-sm text-center text-gray-500 dark:text-gray-400 mx-auto mt-10 bg-white">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-200 dark:bg-gray-700 dark:text-gray-400">
                    <th scope="col" class="px-20 py-3">
                            Album Name
                        </th>
                        <th scope="col" class="px-20 py-3">
                            Album
                        </th>
                        <th scope="col" class="px-20 py-3">
                            Artist
                        </th>
                        <th scope="col" class="px-20 py-3">
                            Date Added
                        </th>
                        <th scope="col" class="px-10 py-3">
                            Actions
                        </th>
                    </thead>
                {wishlist_albums.map(item =>
                    <tbody>
                        <tr>
                            <td>
                                {item.album.album_name}
                            </td>
                            <td>
                            <img
                            src={item.album.cover_image_url}
                            alt=""
                            className="w-24 h-24 rounded-lg object-cover mr-8 mt-2 mx-auto"
                        />
                            </td>
                            <td>
                                {item.album.artist}
                            </td>
                            <td>
                                {item.created_at}
                            </td>
                            <td>
                            <PrimaryButton className="mt-2" >Remove</PrimaryButton>
                            <PrimaryButton className="mt-2" >Details</PrimaryButton>

                            </td>
                        </tr>
                    </tbody>
                    )}
                    
                </table>
                {/* <form name="createForm" onSubmit={submit}>
                    <div className="flex flex-col">
                        <div className="mb-4">
                            <label className="">Wishlist Title</label>
                            <input
                                type="text"
                                className="w-full px-4 py-2"
                                label="Wishlist Name"
                                name="list_name"
                                value={data.list_name}
                                onChange={(e) =>
                                    setData("list_name", e.target.value)
                                }
                            />
                            <InputError
                                message={errors.list_name}
                                className="mt-2"
                            />
                        </div>
                    </div>
                    <div className="mt-4">
                        <button
                            type="submit"
                            className="px-6 py-2 font-bold text-white bg-green-500 rounded"
                        >
                            Create Wishlist
                        </button>
                    </div>
                </form> */}
                <div className="mt-6 bg-white shadow-sm rounded-lg divide-y">
                    {/* {wishlist_album.map((album) => (
                        <Wishlist key={wishlist.id} wishlist={wishlist} />
                    ))} */}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
