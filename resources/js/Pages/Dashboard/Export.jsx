import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import DashboardTabs from "@/Layouts/Tabs/DashboardTabs";
import PrimaryButton from "@/Components/PrimaryButton";

export default function Index({ auth, cartCount }) {
    const { data, setData, post, processing, reset, errors, get } = useForm({});
    const exportCollections = (e) => {
        e.preventDefault();
        post(route("dashboard.export.collections"));
    };
    const exportAlbums = (e) => {
        e.preventDefault();
        post(route("dashboard.export.albums"));
    };
    const exportOrders = (e) => {
        e.preventDefault();
        post(route("dashboard.export.orders"));
    };

    return (
        <AuthenticatedLayout auth={auth} cartCount={cartCount}>
            <Head title="Export" />
            <DashboardTabs />
            <h1 className="text-4xl m-4">Export:</h1>
            {/* <form onSubmit={exportToCSV}> */}
            <div>
                <button
                    onClick={exportCollections}
                    className="mt-3 items-center px-2 py-2 bg-gray-800 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-gray-700 focus:bg-gray-700 active:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-150"
                >
                    Export My Collections
                </button>
            </div>
            <div>
                <button
                    onClick={exportAlbums}
                    className="mt-3 items-center px-2 py-2 bg-gray-800 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-gray-700 focus:bg-gray-700 active:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-150"
                >
                    Export My Albums
                </button>
            </div>
            <div>
                <button
                    onClick={exportOrders}
                    className="mt-3 items-center px-2 py-2 bg-gray-800 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-gray-700 focus:bg-gray-700 active:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-150"
                >
                    Export My Orders
                </button>
            </div>
            {/* </form> */}
        </AuthenticatedLayout>
    );
}
