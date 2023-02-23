import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import CommunityTabs from "@/Layouts/Tabs/CommunityTabs";

export default function Index({ auth }) {
    return (
        <AuthenticatedLayout auth={auth}>
            <Head title="Community" />
            <CommunityTabs />
        </AuthenticatedLayout>
    );
}
