import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { useForm, Head } from "@inertiajs/react";

import PrimaryButton from "@/Components/PrimaryButton";

function subTotal(order_items) {
    var quantity = order_items.quantity;
    var itemPrice = order_items.price;
    var total = quantity * itemPrice;

    console.log(quantity);
}

export default function Orders({ auth, order_items }) {
    return (
        <AuthenticatedLayout auth={auth}>
            <Head title="Orders" />

            <div className="max-w-2xl mx-auto p-4 sm:p-6 lg:p-8">
                <div className="flex justify-center items-center">
                    Review Items
                </div>
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
                                Quantity
                            </th>
                            <th scope="col" class="px-10 py-3">
                                Actions
                            </th>
                        </thead>
                        {order_items.map((item) => (
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
                                    <td id="price">{item.price}</td>
                                    <td id="quantity">{item.quantity}</td>
                                    <td>
                                        {/* <a href={route('orders.destroy', chirp.id)}></a> */}
                                        <PrimaryButton className="mt-2">
                                            Remove
                                        </PrimaryButton>
                                        <PrimaryButton className="mt-2">
                                            {" "}
                                            Details
                                        </PrimaryButton>
                                    </td>
                                </tr>
                            </tbody>
                        ))}
                    </table>
                </div>
                <div className="price">
                    <button onClick={subTotal}>TEST</button>

                    <p>SubTotal:</p>
                    <p id="subtotal"></p>

                    <p>Taxes:</p>
                    <p id="taxes"></p>

                    <p>Shipping:</p>
                    <p id="shipping"></p>

                    <p>Final Total:</p>
                    <p id="finalTotal"></p>
                </div>
                <div className="max-w-2xl mx-auto p-4 sm:p-6 lg:p-8">
                    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                        <PrimaryButton className="mt-4">
                            {/* To Payment/Stirp API page */}
                            Checkout
                        </PrimaryButton>
                    </p>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
