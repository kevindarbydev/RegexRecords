import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { useForm, Head } from "@inertiajs/react";

import PrimaryButton from "@/Components/PrimaryButton";
import MarketplaceTabs from "@/Layouts/Tabs/MarketplaceTabs";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

export default function Orders({
    auth,
    orders,
    orders2,
    orders3,
    orders4,
    cartCount,
    orderStatus,
    itemStatus,
}) {
    const { data, setData, post, patch, processing, reset, errors, get } =
        useForm({
            sort: "",
            order: "",
        });

    const orderDetails = (e) => {
        e.preventDefault();
        get(route("marketplace.orders.order_items"), {
            onSuccess: () => reset(),
        });
    };

    const submit = (e) => {
        console.log("submit button works");
        e.preventDefault();
        patch(route("marketplace.orders.change.status"), {
            onSuccess: () => reset(),
        });
    };

    return (
        <AuthenticatedLayout auth={auth} cartCount={cartCount}>
            <Head title="Order History" />
            <MarketplaceTabs />
            <div className="relative overflow-x-auto m-4">
                <div className="flex justify-center text-5xl ml-4 mb-2 text-center">
                    Order History
                </div>
                <div className="float-left">Sort by Status:&nbsp; </div>
                <select
                    name="sort"
                    onChange={(e) => {
                        setData("sort", e.target.value);
                    }}
                >
                    <option value="">All</option>
                    {orderStatus.map((orderStatus) => (
                        <option value={orderStatus}>{orderStatus}</option>
                    ))}
                </select>
                <div className="flex justify-center items-center">
                    <table className="w-1/2 text-sm text-center text-gray-500 dark:text-gray-400 mx-auto mt-5 bg-white">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-200 dark:bg-gray-700 dark:text-gray-400">
                            <th scope="col" class="px-10 py-3">
                                Ordered Date
                            </th>
                            <th scope="col" class="px-10 py-3">
                                Subtotal
                            </th>
                            <th scope="col" class="px-10 py-3">
                                Shipping
                            </th>
                            <th scope="col" class="px-10 py-3">
                                Tax
                            </th>
                            <th scope="col" class="px-10 py-3">
                                Total Price
                            </th>
                            <th scope="col" class="px-10 py-3">
                                Status
                            </th>
                            <th scope="col" class="px-10 py-3">
                                Actions
                            </th>
                        </thead>
                        {data.sort == "" ? (
                            orders.map((order) => (
                                <tbody>
                                    <tr>
                                        <td>
                                            {dayjs(order.created_at).format(
                                                "DD/MM/YYYY"
                                            )}
                                        </td>
                                        <td>${order.subtotal.toFixed(2)}</td>
                                        <td>${order.shipping.toFixed(2)}</td>
                                        <td>${order.tax.toFixed(2)}</td>
                                        <td>${order.totalPrice.toFixed(2)}</td>
                                        <td>{order.status}</td>
                                        <td>
                                            <form onSubmit={orderDetails}>
                                                <PrimaryButton
                                                    className="mt-2 mb-2"
                                                    processing={processing}
                                                    onClick={() => {
                                                        setData(
                                                            "order",
                                                            order.id
                                                        );
                                                    }}
                                                >
                                                    Order Details
                                                </PrimaryButton>
                                            </form>
                                        </td>
                                    </tr>
                                </tbody>
                            ))
                        ) : (
                            <></>
                        )}
                        {data.sort == "Submitted" ? (
                            orders2.map((order) => (
                                <tbody>
                                    <tr>
                                        <td>
                                            {dayjs(order.created_at).format(
                                                "DD/MM/YYYY"
                                            )}
                                        </td>
                                        <td>${order.subtotal.toFixed(2)}</td>
                                        <td>${order.shipping.toFixed(2)}</td>
                                        <td>${order.tax.toFixed(2)}</td>
                                        <td>${order.totalPrice.toFixed(2)}</td>
                                        <td>{order.status}</td>
                                        <td>
                                            <form onSubmit={orderDetails}>
                                                <PrimaryButton
                                                    className="mt-2 mb-2"
                                                    processing={processing}
                                                    onClick={() => {
                                                        setData(
                                                            "order",
                                                            order.id
                                                        );
                                                    }}
                                                >
                                                    Order Details
                                                </PrimaryButton>
                                            </form>
                                        </td>
                                    </tr>
                                </tbody>
                            ))
                        ) : (
                            <></>
                        )}
                        {data.sort == "Processed" ? (
                            orders3.map((order) => (
                                <tbody>
                                    <tr>
                                        <td>
                                            {dayjs(order.created_at).format(
                                                "DD/MM/YYYY"
                                            )}
                                        </td>
                                        <td>${order.subtotal.toFixed(2)}</td>
                                        <td>${order.shipping.toFixed(2)}</td>
                                        <td>${order.tax.toFixed(2)}</td>
                                        <td>${order.totalPrice.toFixed(2)}</td>
                                        <td>{order.status}</td>
                                        <td>
                                            <form onSubmit={orderDetails}>
                                                <PrimaryButton
                                                    className="mt-2 mb-2"
                                                    processing={processing}
                                                    onClick={() => {
                                                        setData(
                                                            "order",
                                                            order.id
                                                        );
                                                    }}
                                                >
                                                    Order Details
                                                </PrimaryButton>
                                            </form>
                                        </td>
                                    </tr>
                                </tbody>
                            ))
                        ) : (
                            <></>
                        )}
                        {data.sort == "Completed" ? (
                            orders4.map((order) => (
                                <tbody>
                                    <tr>
                                        <td>
                                            {dayjs(order.created_at).format(
                                                "DD/MM/YYYY"
                                            )}
                                        </td>
                                        <td>${order.subtotal.toFixed(2)}</td>
                                        <td>${order.shipping.toFixed(2)}</td>
                                        <td>${order.tax.toFixed(2)}</td>
                                        <td>${order.totalPrice.toFixed(2)}</td>
                                        <td>{order.status}</td>
                                        <td>
                                            <form onSubmit={orderDetails}>
                                                <PrimaryButton
                                                    className="mt-2 mb-2"
                                                    processing={processing}
                                                    onClick={() => {
                                                        setData(
                                                            "order",
                                                            order.id
                                                        );
                                                    }}
                                                >
                                                    Order Details
                                                </PrimaryButton>
                                            </form>
                                        </td>
                                    </tr>
                                </tbody>
                            ))
                        ) : (
                            <></>
                        )}
                    </table>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
