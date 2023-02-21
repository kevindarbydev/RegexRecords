import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import MyFriend from "./Partials/MyFriend";
import CommunityTabs from "@/Components/Tabs/CommunityTabs";

function Friends({ auth, userFriendships }) {
    return (
        <AuthenticatedLayout auth={auth}>
            <Head title="MyFriends" />
            <CommunityTabs />
            <div className="flex flex-row flex-wrap m-10">
                {userFriendships.map((userFriendship) => (
                    <MyFriend
                        key={userFriendship.id}
                        userFriendship={userFriendship}
                    />
                ))}
            </div>
        </AuthenticatedLayout>
    );
}

export default Friends;
