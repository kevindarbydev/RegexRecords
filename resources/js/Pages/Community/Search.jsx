import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import SearchBar from "./Partials/SearchBar";
import SearchedUser from "./Partials/SearchedUser";
import CommunityTabs from "@/Components/Tabs/CommunityTabs";

export default function Index({ auth, users }) {
    return (
        <AuthenticatedLayout auth={auth}>
            <Head title="Search" />
            <CommunityTabs />
            <SearchBar />
            <div className="flex flex-row flex-wrap m-10">
                {users.map((user) => (
                    <SearchedUser key={user.id} user={user} />
                ))}
            </div>
        </AuthenticatedLayout>
    );
}
