import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import MyFriend from "./Partials/MyFriend";

function Friends({ auth, userFriendships }) {
    return (
        <AuthenticatedLayout auth={auth}>
            <Head title="MyFriends" />
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
