import React from "react";
import CommunityTabs from "@/Layouts/Tabs/CommunityTabs";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";

function FriendDetails({ friend, cartCount, auth }) {
    return (
        <AuthenticatedLayout auth={auth} cartCount={cartCount}>
            <Head title="Friend Details" />
            <CommunityTabs />
            <div>{friend.name}</div>
        </AuthenticatedLayout>
    );
}

export default FriendDetails;
