import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import SearchBar from "./Partials/SearchBar";

export default function Index({ auth }) {
    return (
        <AuthenticatedLayout auth={auth}>
            <Head title="Search" />
            <SearchBar />
        </AuthenticatedLayout>
    );
}
