import React from "react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { useForm, Head } from '@inertiajs/react';


dayjs.extend(relativeTime);

export default function Order_Item({ order_item }) {

    return (
        <div className="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 m-6">

            <div className="flex flex-col w-64 justify-between p-4 leading-normal">

                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">

                    Item ID: {order_item.id}
                </p>

                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                    Quantity: {order_item.quantity}
                </p>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                    Price: ${(order_item.price).toFixed(2)}
                </p>

            </div>

        </div>


    );
}