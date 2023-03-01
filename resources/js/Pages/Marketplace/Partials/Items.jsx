import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import Collection from "@/Pages/Dashboard/Partials/Collection";
import InputError from "@/Components/InputError";
import PrimaryButton from "@/Components/PrimaryButton";
import { useForm, Head, Link } from "@inertiajs/react";
import MarketplaceTabs from "@/Layouts/Tabs/MarketplaceTabs";

export default function Index({
    users,
    albums,
    collections,
    collection_albums,
    current_user,
}) {
    const { data, setData, post, processing, reset, errors } = useForm({
        sort: "",
    });

    const submit = (e) => {
        console.log("");
        e.preventDefault();
        post(route("dashboard.album.to.wishlist"), {
            onSuccess: () => reset(),
        });
    };

    const addtoWishlist = (e) => {
        console.log("add passed");
        e.preventDefault();
        post(route("dashboard.album.to.wishlist"), {
            onSuccess: () => reset(),
        });
    };

    const addtoOrder = (e) => {
        console.log("order passed");
        e.preventDefault();
        post(route("marketplace.album.to.order"), { onSuccess: () => reset() });
    };
    const addToCart = (e) => {
        e.preventDefault();
        post(route("marketplace.add.to.cart"), { onSuccess: () => reset() });
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
                                            class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white flex flex-row"
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
                                            <PrimaryButton
                                                className="mr-1 ml-10"
                                                processing={processing}
                                                onClick={addToCart}
                                            >
                                                Add to Cart
                                            </PrimaryButton>
                                            <PrimaryButton
                                                className="mr-1"
                                                processing={processing}
                                                onClick={addtoWishlist}
                                            >
                                                Add to Wishlist
                                            </PrimaryButton>
                                            <PrimaryButton
                                                className=""
                                                processing={processing}
                                            >
                                                Contact Seller
                                            </PrimaryButton>
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
