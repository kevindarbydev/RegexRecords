import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import ExploreTabs from "@/Layouts/Tabs/ExploreTabs";

export default function AdvSearch({ auth }) {
    return (
        <AuthenticatedLayout auth={auth}>
            <Head title="Advanced Search" />
            <ExploreTabs />

            <h1 className="text-4xl m-4">Advanced Search:</h1>
        </AuthenticatedLayout>
    );
}
