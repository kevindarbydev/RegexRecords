import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import Wishlist from "@/Pages/Dashboard/Partials/Wishlist";
import PrimaryButton from "@/Components/PrimaryButton";
import { useForm, Head } from "@inertiajs/react";
import DashboardTabs from "@/Layouts/Tabs/DashboardTabs";
import AlbumDetails from "./AlbumDetails";

export default function Index({ auth, wishlist_albums, cartCount }) {
    const { data, setData, post, processing, reset, errors, get, patch } =
        useForm({
            list_name: "",
            album_id: "",
            album: "",
        });

    const addAlbums = (e) => {
        e.preventDefault();
        get(route("marketplace.index"), { onSuccess: () => reset() });
    };
    const removefromWishlist = (e) => {
        e.preventDefault();
        patch(route("dashboard.wishlists.remove.album"), {
            onSuccess: () => reset(),
        });
    };
    const showAlbumDetails = (e) => {
        e.preventDefault();
        patch(route("dashboard.albums.show"), {
            onSuccess: () => reset(),
        });
    };

    return (
        <AuthenticatedLayout auth={auth} cartCount={cartCount}>
            <DashboardTabs />
            <Head title="Wishlist" />
            <div className="max-w-2xl mx-auto p-4 sm:p-6 lg:p-8 ">
                <div className="flex justify-center items-center">
                    My Wishlist
                </div>
                <div className="flex justify-center items-center">
                    <PrimaryButton className="mt-4" onClick={addAlbums}>
                        Add Albums
                    </PrimaryButton>
                </div>

                <div className="flex justify-center items-center">
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
                        {wishlist_albums.map((item) => (
                            <tbody>
                                <tr>
                                    <td>{item.album.album_name}</td>
                                    <td>
                                        <img
                                            src={item.album.cover_image_url}
                                            alt=""
                                            className="w-24 h-24 rounded-lg object-cover mr-8 mt-2 mx-auto"
                                        />
                                    </td>
                                    <td>{item.album.artist}</td>
                                    <td>{item.created_at}</td>
                                    <td>
                                        <form onSubmit={removefromWishlist}>
                                            <PrimaryButton
                                                className="mt-2"
                                                processing={processing}
                                                onClick={() => {
                                                    setData("album_id", item.id);
                                                }}
                                            >
                                                Remove
                                            </PrimaryButton>
                                        </form>
                                        <form onSubmit={showAlbumDetails}>
                                            <PrimaryButton
                                                className="mt-2"
                                                processing={processing}
                                                onClick={() => {
                                                    setData("album", item.album.id);
                                                }}
                                            >
                                                Details
                                            </PrimaryButton>
                                        </form>
                                    </td>
                                </tr>
                            </tbody>
                        ))}
                    </table>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
