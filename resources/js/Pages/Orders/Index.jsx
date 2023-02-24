import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import { useForm, Head } from '@inertiajs/react';
import Order_Item from './Partials/Order_Item';

export default function Index({ auth, order_items }) {

 
    return (
        <AuthenticatedLayout auth={auth}>
            <Head title="Orders" />
 
            <div className="max-w-2xl mx-auto p-4 sm:p-6 lg:p-8">
            <div className="mt-6 bg-white shadow-sm rounded-lg divide-y">
                    {order_items.map(item =>
                        <Order_Item key={item.id} order_item={item} />
                    )}
                </div>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                    
                    Subtotal: 
                </p>


            </div>
        </AuthenticatedLayout>
    );
}