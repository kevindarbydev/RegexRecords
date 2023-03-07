import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { useForm, Head } from "@inertiajs/react";

import PrimaryButton from "@/Components/PrimaryButton";
import MarketplaceTabs from "@/Layouts/Tabs/MarketplaceTabs";

export default function OrderItems({ auth, order_items, order_items2, order_items3, order_items4, itemStatus, cartCount }) {

    const { data, setData, post, patch, processing, reset, errors, get } = useForm({
        sort: "",
        orderItem: "",
    });

    const submit = (e) => {
        e.preventDefault();
        patch(route("marketplace.orders.item.received"), {
            onSuccess: () => reset(),
        });
    }

    return (
        <AuthenticatedLayout auth={auth} cartCount={cartCount}>
            <Head title="Order Items" />
            <MarketplaceTabs />
            <div className="max-w-2xl mx-auto p-4 sm:p-6 lg:p-8">
                <div className="flex justify-center items-center">
                    Order Items
                </div>
                Sort by Status:{" "}
                <select
                    name="sort"
                    onChange={(e) => {
                        setData("sort", e.target.value);
                    }}
                >
                    <option value="">All</option>
                    {itemStatus.map((itemStatus) => (
                        <option value={itemStatus}>{itemStatus}</option>
                    ))}
                </select>
                <div className="flex justify-center items-center">
                    <table className="w-1/2 text-sm text-center text-gray-500 dark:text-gray-400 mx-auto mt-10 bg-white">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-200 dark:bg-gray-700 dark:text-gray-400">
                            <th scope="col" class="px-20 py-3">
                                Album Name
                            </th>
                            <th scope="col" class="px-20 py-3">
                                Album
                            </th>
                            <th scope="col" class="px-10 py-3">
                                Price
                            </th>
                            <th scope="col" class="px-10 py-3">
                                Status
                            </th>
                            <th scope="col" class="px-10 py-3">
                                Actions
                            </th>
                        </thead>
                        {data.sort == "" ?
                            order_items.map((item) => (
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
                                        <td id="price">${(item.price).toFixed(2)}</td>
                                        <td id="status">{item.status}</td>
                                        {item.status == "Shipped" ?
                                            <td className="flex flex-row mt-2">
                                                <form onSubmit={submit}>
                                                    <PrimaryButton className="mt-2 mr-2" onClick={() => {
                                                        setData('orderItem', item.id);
                                                    }} >
                                                        Mark as Received
                                                    </PrimaryButton>
                                                </form>
                                                <PrimaryButton className="mt-2" >

                                                    Album Details
                                                </PrimaryButton>
                                            </td>
                                            :
                                            <td>
                                                <PrimaryButton className="mt-2" >

                                                    Album Details
                                                </PrimaryButton>
                                            </td>
                                        }
                                    </tr>
                                </tbody>
                            )) : <></>}
                        {data.sort == "Sold" ?
                            order_items2.map((item) => (
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
                                        <td id="price">${(item.price).toFixed(2)}</td>
                                        <td id="status">{item.status}</td>
                                        <td>
                                            <PrimaryButton className="mt-2" >

                                                Album Details
                                            </PrimaryButton>
                                        </td>
                                    </tr>
                                </tbody>
                            )) : <></>}
                        {data.sort == "Shipped" ?
                            order_items3.map((item) => (
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
                                        <td id="price">${(item.price).toFixed(2)}</td>
                                        <td id="status">{item.status}</td>
                                        <td className="flex flex-row mt-2">
                                            <form onSubmit={submit}>
                                                <PrimaryButton className="mt-2 mr-2" onClick={() => {
                                                    setData('orderItem', item.id);
                                                }} >
                                                    Mark as Received
                                                </PrimaryButton>
                                            </form>
                                            <PrimaryButton className="mt-2" >

                                                Album Details
                                            </PrimaryButton>
                                        </td>

                                    </tr>
                                </tbody>
                            )) : <></>}
                        {data.sort == "Received" ?
                            order_items4.map((item) => (
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
                                        <td id="price">${(item.price).toFixed(2)}</td>
                                        <td id="status">{item.status}</td>

                                        <td>
                                            <PrimaryButton className="mt-2" >

                                                Album Details
                                            </PrimaryButton>
                                        </td>

                                    </tr>
                                </tbody>
                            )) : <></>}
                    </table>
                </div>

            </div>
        </AuthenticatedLayout>
    );
}
