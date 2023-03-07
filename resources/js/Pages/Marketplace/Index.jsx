import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import Collection from "@/Pages/Dashboard/Partials/Collection";
import InputError from "@/Components/InputError";
import PrimaryButton from "@/Components/PrimaryButton";
import Items from "@/Pages/Marketplace/Partials/Items";
import { useForm, Head, Link } from "@inertiajs/react";
import MarketplaceTabs from "@/Layouts/Tabs/MarketplaceTabs";

export default function Index({
    auth,
    users,
    albums,
    collection_albums2,
    collection_albums3,
    collection_albums4,
    collections,
    collection_albums,
    current_user,
    cartCount,
}) {
    const { data, setData, post, processing, reset, errors } = useForm({
        sort: "",
    });

    // const submit = (e) => {
    //     e.preventDefault();
    //     post(route("collections.store"), { onSuccess: () => reset() });
    // };

    return (
        <AuthenticatedLayout auth={auth} cartCount={cartCount}>
            <Head title="Marketplace" />
            <MarketplaceTabs />
            <div className="relative overflow-x-auto">
                <h3 className="mt-2 mb-2 text-center">Marketplace</h3>
                Sort Listings by:{" "}
                <select
                    name="sort"
                    onChange={(e) => {
                        setData("sort", e.target.value);
                    }}
                >
                    <option value="">Latest</option>
                    <option value="PriceLtoH">Price (Lowest to Highest)</option>
                    <option value="PriceHtoL">Price (Highest to Lowest)</option>
                    <option value="Seller">Seller Name</option>
                </select>
                {data.sort == "" ? (
                    <Items
                        users={users}
                        collections={collections}
                        collection_albums={collection_albums}
                        albums={albums}
                        current_user={current_user}
                    />
                ) : (
                    <></>
                )}
                {data.sort == "PriceLtoH" ? (
                    <Items
                        users={users}
                        collections={collections}
                        collection_albums={collection_albums2}
                        albums={albums}
                        current_user={current_user}
                    />
                ) : (
                    <></>
                )}
                {data.sort == "PriceHtoL" ? (
                    <Items
                        users={users}
                        collections={collections}
                        collection_albums={collection_albums3}
                        albums={albums}
                        current_user={current_user}
                    />
                ) : (
                    <></>
                )}
                {data.sort == "Seller" ? (
                    <Items
                        users={users}
                        collections={collections}
                        collection_albums={collection_albums4}
                        albums={albums}
                        current_user={current_user}
                    />
                ) : (
                    <></>
                )}
            </div>
            {/* FIXME: Can't figure out a way to map through the cart content collection being passed through */}
            {/* <div>{cartContents.map((cartContent) => cartContent.name)}</div> */}
            {/* {cartItem.id} */}
        </AuthenticatedLayout>
    );
}
