import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import Friendship from "./Partials/Friendship";
import CommunityTabs from "@/Components/Tabs/CommunityTabs";

function Friends({ auth, currentFriendships, pendingFriendships }) {
    return (
        <AuthenticatedLayout auth={auth}>
            <Head title="MyFriends" />
            <CommunityTabs />
            <div className="flex flex-row flex-wrap m-10">
                {currentFriendships.map((friendship) => (
                    <Friendship key={friendship.id} friendship={friendship} />
                ))}
            </div>
            <div className="flex flex-row flex-wrap m-10">
                {pendingFriendships.map((friendship) => (
                    <Friendship key={friendship.id} friendship={friendship} />
                ))}
            </div>
        </AuthenticatedLayout>
    );
}

export default Friends;
