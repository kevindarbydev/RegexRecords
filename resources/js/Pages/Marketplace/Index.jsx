import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import Collection from "@/Pages/Dashboard/Partials/Collection";
import InputError from "@/Components/InputError";
import PrimaryButton from "@/Components/PrimaryButton";
import Items from "@/Pages/Marketplace/Partials/Items";
import { useForm, Head, Link } from "@inertiajs/react";
import MarketplaceTabs from "@/Layouts/Tabs/MarketplaceTabs";

export default function Index({ auth, users, albums, collection_albums2, collection_albums3, collection_albums4, collections, collection_albums, current_user }) {
    const { data, setData, post, processing, reset, errors } = useForm({
        sort: "",
    });

    // const submit = (e) => {
    //     e.preventDefault();
    //     post(route("collections.store"), { onSuccess: () => reset() });
    // };

    return (
        <AuthenticatedLayout auth={auth}>
            <Head title="Marketplace" />
            <MarketplaceTabs />
            <div className="relative overflow-x-auto">
                <h3 className="mt-2 mb-2 text-center">Marketplace</h3>
                Sort Listings by: <select
                    name="sort"
                    onChange={(e) => {
                        setData('sort', e.target.value);
                    }}
                >
                    <option value="">Default</option>
                    <option value="PriceLtoH">Price (Lowest to Highest)</option>
                    <option value="PriceHtoL">Price (Highest to Lowest)</option>
                    <option value="Seller">Seller Name</option>
                </select>
                {data.sort == "" ?
                    <Items users={users} collections={collections} collection_albums={collection_albums} albums={albums} current_user={current_user} />
                    :
                    <></>
                }
                {data.sort == "PriceLtoH" ?
                    <Items users={users} collections={collections} collection_albums={collection_albums2} albums={albums} current_user={current_user} />
                    :
                    <></>
                }
                {data.sort == "PriceHtoL" ?
                    <Items users={users} collections={collections} collection_albums={collection_albums3} albums={albums} current_user={current_user} />
                    :
                    <></>
                }
                {data.sort == "Seller" ?
                    <Items users={users} collections={collections} collection_albums={collection_albums4} albums={albums} current_user={current_user} />
                    :
                    <></>
                }
                {/* <table className="w-1/2 text-sm text-left text-gray-500 dark:text-gray-400 mx-auto mt-10
                ">
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
                        <th scope="col" className="px-6 py-3">

                        </th>
                    </thead>
                    {users.map((user) =>
                        collections.map((collection) =>
                            collection_albums.map((collection_album) =>
                                albums.map((album) =>
                                    collection_album.id == collection.id && album.id == collection_album.album_id && collection.user_id == user.id ?
                                        <tbody>
                                            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                                <th
                                                    scope="row"
                                                    class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white flex flex-row"
                                                >
                                                    <img
                                                        className="rounded-t-lg md:h-full md:w-20 md:rounded-none md:rounded-l-lg mr-5"
                                                        src={
                                                            album.cover_image_url
                                                        }
                                                        alt=""
                                                    />
                                                    <p className="pt-5 mr-0">
                                                        {
                                                            album.album_name
                                                        }
                                                    </p>
                                                </th>
                                                <td class="px-6 py-4">
                                                    {
                                                        album.value
                                                    }
                                                    $
                                                </td>
                                                <td class="px-6 py-4">
                                                    {
                                                        user.name
                                                    }
                                                </td>
                                                <td class="px-6 py-4">
                                                    <PrimaryButton className="mr-1" processing={processing}>
                                                        Add to Cart
                                                    </PrimaryButton>
                                                    <PrimaryButton className="" processing={processing}>
                                                        Add to Wishlist
                                                    </PrimaryButton>
                                                </td>
                                            </tr>
                                        </tbody>
                                        :
                                        <></>
                                ))))}
                </table> */}
            </div>
        </AuthenticatedLayout>
    );
}
