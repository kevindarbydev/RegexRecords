import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import DashboardTabs from "@/Layouts/Tabs/DashboardTabs";
import PrimaryButton from "@/Components/PrimaryButton";

export default function Index({ auth, cartCount, downloadUrl, fileName, headers }) {
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
            <h1 className="text-4xl m-4">Export</h1>
            <h1 className="text-3xl m-4">
                Choose what you'd like to download in .csv form:
            </h1>

            <div className=" flex flex-row justify-around w-3/6">
                <div>
                    <button
                        onClick={exportCollections}
                        className="mt-3 items-center px-2 py-2 bg-gray-800 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-gray-700 focus:bg-gray-200 active:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                        Export My Collections
                    </button>
                </div>
                <div>
                    <button
                        onClick={exportAlbums}
                        className="mt-3 items-center px-2 py-2 bg-gray-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-gray-700 focus:bg-gray-700 active:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                        Export My Albums
                    </button>
                </div>
                <div>
                    <button
                        onClick={exportOrders}
                        className="mt-3 items-center px-2 py-2 bg-gray-400 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-gray-700 focus:bg-gray-700 active:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                        Export My Orders
                    </button>
                </div>
            </div>
            {downloadUrl && (
                <div>
                    <a
                        href={`${window.location.origin}/storage/app/app/downloads/${fileName}`}
                     
                        download={fileName}
                    >
                        Download CSV
                    </a>
                </div>
            )}
        </AuthenticatedLayout>
    );
}
