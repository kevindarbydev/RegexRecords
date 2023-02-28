import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import DashboardTabs from "@/Layouts/Tabs/DashboardTabs";

export default function Index({ auth }) {
    return (
        <AuthenticatedLayout auth={auth}>
            <Head title="Export" />
            <DashboardTabs />

            <h1 className="text-4xl m-4">Export:</h1>
        </AuthenticatedLayout>
    );
}
