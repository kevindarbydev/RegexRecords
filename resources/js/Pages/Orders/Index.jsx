import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import { useForm, Head } from '@inertiajs/react';
 
export default function Index({ auth }) {

 
    return (
        <AuthenticatedLayout auth={auth}>
            <Head title="Orders" />
 
            <div className="max-w-2xl mx-auto p-4 sm:p-6 lg:p-8">

                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                    
                    Subtotal: 
                </p>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                    
                    Shipping: 
                </p>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                    
                    Tax: 
                </p>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                    
                    Total Price:
                </p>

            </div>
        </AuthenticatedLayout>
    );
}