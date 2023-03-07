import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { useForm, Head } from "@inertiajs/react";
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import PrimaryButton from "@/Components/PrimaryButton";
import MarketplaceTabs from "@/Layouts/Tabs/MarketplaceTabs";

dayjs.extend(relativeTime);
export default function AlbumsSold({ auth, order_items, order_items2, order_items3, order_items4, itemStatus, cartCount }) {

    const { data, setData, post, patch, processing, reset, errors, get } = useForm({
        sort: "",
        orderItem: "",
    });

    const submit = (e) => {
        e.preventDefault();
        patch(route("marketplace.orders.item.shipped"), {
            onSuccess: () => reset(),
        });
    }
    return (
        <AuthenticatedLayout cartCount={cartCount} auth={auth}>
            <Head title="Albums Sold" />
            <MarketplaceTabs />
            <div className="max-w-2xl mx-auto p-4 sm:p-6 lg:p-8">
                <div className="flex justify-center items-center">
                    Albums Sold
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
                                Order ID
                            </th>
                            <th scope="col" class="px-20 py-3">
                                Purchased Date
                            </th>
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
                                        <td>{item.order_id}</td>
                                        <td>{dayjs(item.created_at).format('DD/MM/YYYY')}</td>
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
                                        {item.status == "Sold" ?
                                            <td className="flex flex-row mt-2">
                                                <form onSubmit={submit}>
                                                    <PrimaryButton className="mt-2 mr-2" onClick={() => {
                                                        setData('orderItem', item.id);
                                                    }}>
                                                        Mark as Shipped
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
                                        <td>{item.order_id}</td>
                                        <td>{dayjs(item.created_at).format('DD/MM/YYYY')}</td>
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
                                                }}>
                                                    Mark as Shipped
                                                </PrimaryButton>
                                            </form>

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
                                        <td>{item.order_id}</td>
                                        <td>{dayjs(item.created_at).format('DD/MM/YYYY')}</td>
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
                        {data.sort == "Completed" ?
                            order_items4.map((item) => (
                                <tbody>
                                    <tr>
                                        <td>{item.order_id}</td>
                                        <td>{dayjs(item.created_at).format('DD/MM/YYYY')}</td>
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
    )
}

