import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { useForm, Head } from "@inertiajs/react";

import PrimaryButton from "@/Components/PrimaryButton";

export default function Orders({ auth, order_items, orders, cartCount }) {
    const { data, setData, post, processing, reset, errors, get } = useForm({
        sort: "",
        order: "",
    });
    
    const orderDetails = (e) => {
        e.preventDefault();
        get(route("marketplace.orders.order_items"), {
            onSuccess: () => reset(),
        });
    };

    return (
        <AuthenticatedLayout auth={auth} cartCount={cartCount}>
            <Head title="Order History" />

            <div className="max-w-2xl mx-auto p-4 sm:p-6 lg:p-8">
                <div className="flex justify-center items-center">
                    Order History
                </div>

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
                                Actions
                            </th>
                        </thead>
                        {orders.map((order) => (
                            <tbody>
                                <tr>
                                    <td>{order.created_at}</td>
                                    <td>{order.subtotal}</td>
                                    <td>{order.shipping}</td>
                                    <td>{order.tax}</td>
                                    <td>{order.totalPrice}</td>
                                    <td>
                                        <form onSubmit={orderDetails}>
                                            <PrimaryButton
                                                className="mt-4"
                                                processing={processing}
                                                onClick={() => {
                                                    setData("order", order.id);
                                                }}
                                            >
                                                Order Details
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
