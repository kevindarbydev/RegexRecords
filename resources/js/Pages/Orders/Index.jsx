import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { useForm, Head } from '@inertiajs/react';
import Order_Item from './Partials/Order_Item';

export default function Index({ auth, order_items }) {

 
    return (
        <AuthenticatedLayout auth={auth}>
            <Head title="Orders" />
 
            <div className="max-w-2xl mx-auto p-4 sm:p-6 lg:p-8">
                ITEM LIST
            <div >
            <table className="w-1/2 text-sm text-left text-gray-500 dark:text-gray-400 mx-auto mt-10">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <th scope="col" class="px-6 py-3">
                            ID
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Price
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Quantity
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Remove
                        </th>
                    </thead>
                {order_items.map(item =>
                    <tbody>
                        <tr>
                            <td>
                                {item.id}
                            </td>
                            <td>
                                {item.price}
                            </td>
                            <td>
                                {item.quantity}
                            </td>
                            <td>
                                <button>X</button>
                            </td>
                        </tr>
                    </tbody>
                    )};
                    
                </table>
                    {/* {order_items.map(item =>
                        <Order_Item key={item.id} order_item={item} />
                    )} */}
                </div>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                    
                
                </p>


            </div>
        </AuthenticatedLayout>
    );
}