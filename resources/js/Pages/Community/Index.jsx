import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import CommunityTabs from "@/Layouts/Tabs/CommunityTabs";

export default function Index({ auth, cartCount }) {
    return (
        <AuthenticatedLayout auth={auth} cartCount={cartCount}>
            <Head title="Community" />
            <CommunityTabs />
        </AuthenticatedLayout>
    );
}
