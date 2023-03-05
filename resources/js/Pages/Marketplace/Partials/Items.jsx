import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import Collection from "@/Pages/Dashboard/Partials/Collection";
import InputError from "@/Components/InputError";
import PrimaryButton from "@/Components/PrimaryButton";
import { useForm, Head, Link } from "@inertiajs/react";
import MarketplaceTabs from "@/Layouts/Tabs/MarketplaceTabs";
import Dropdown from "@/Components/Dropdown";

export default function Index({
    users,
    albums,
    collections,
    collection_albums,
    current_user,
}) {
    const { data, setData, post, processing, reset, errors, get } = useForm({
        sort: "",
        album: "",
        seller: "",
    });

    const addtoWishlist = (e) => {
        e.preventDefault();
        post(route("dashboard.album.to.wishlist"), {
            onSuccess: () => reset(),
        });
    };

    const addToCart = (e) => {
        e.preventDefault();
        post(route("marketplace.add.to.cart"), { onSuccess: () => reset() });
    };

    const contactSeller = (e) => {
        e.preventDefault();
        get(route("messages.create"), { onSuccess: () => reset() });
    };

    return (
        <table className="w-screen text-sm text-left text-gray-500 dark:text-gray-400 mx-auto mt-10">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <th scope="col" className="px-6 py-3">
                    Album
                </th>
                <th scope="col" className="px-6 py-3">
                    Price
                </th>
                <th scope="col" className="px-6 py-3">
                    Seller
                </th>
                <th scope="col" className="px-6 py-3"></th>
            </thead>
            {collection_albums.map((collection_album) =>
                users.map((user) =>
                    collections.map((collection) =>
                        albums.map((album) =>
                            collection_album.collection_id == collection.id &&
                                collection_album.album_id == album.id &&
                                collection.user_id == user.id &&
                                current_user.id != user.id ? (
                                <tbody>
                                    <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                        <th
                                            scope="row"
                                            className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white flex flex-row"
                                        >
                                            <img
                                                className="rounded-t-lg md:h-full md:w-20 md:rounded-none md:rounded-l-lg mr-5"
                                                src={album.cover_image_url}
                                                alt=""
                                            />
                                            <p className="pt-5 mr-0">
                                                {album.album_name}
                                            </p>
                                        </th>
                                        <td class="px-6 py-4">
                                            {album.value}$
                                        </td>
                                        <td class="px-6 py-4">{user.name}</td>
                                        <td class="px-3 py-2">
                                            <div className="flex flex-row">
                                                <form onSubmit={addToCart}>
                                                    <PrimaryButton
                                                        className="mb mr-5"
                                                        processing={processing}
                                                        onClick={() => {
                                                            setData({
                                                                'album': album.id,
                                                                'seller': user.id,
                                                            })
                                                        }}
                                                    >
                                                        Add to Cart
                                                    </PrimaryButton>
                                                </form>
                                                <Dropdown>
                                                    <Dropdown.Trigger>
                                                        <button className="mt-2">
                                                            <svg
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                className="h-4 w-4 text-gray-400"
                                                                viewBox="0 0 20 20"
                                                                fill="currentColor"
                                                            >
                                                                <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
                                                            </svg>
                                                        </button>
                                                    </Dropdown.Trigger>
                                                    <Dropdown.Content>
                                                        <form
                                                            onSubmit={
                                                                addtoWishlist
                                                            }
                                                        >
                                                            <button
                                                                className="mr-1"
                                                                processing={
                                                                    processing
                                                                }
                                                                onClick={() => {
                                                                    setData(
                                                                        "alsellerum",
                                                                        album.id
                                                                    );
                                                                }}
                                                            >
                                                                Add to Wishlist
                                                            </button>
                                                        </form>
                                                        <form
                                                            onSubmit={
                                                                contactSeller
                                                            }
                                                        >
                                                            <button
                                                                className=""
                                                                processing={
                                                                    processing
                                                                }
                                                                onClick={() => {
                                                                    setData(
                                                                        "userID",
                                                                        user.id
                                                                    );
                                                                }}
                                                            >
                                                                Contact Seller
                                                            </button>
                                                        </form>
                                                    </Dropdown.Content>
                                                </Dropdown>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            ) : (
                                <></>
                            )
                        )
                    )
                )
            )}
        </table>
    );
}
