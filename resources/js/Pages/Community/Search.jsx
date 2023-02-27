import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import SearchBar from "./Partials/SearchBar";
import SearchedUser from "./Partials/SearchedUser";
import CommunityTabs from "@/Layouts/Tabs/CommunityTabs";
import Pagination from "@/Components/Pagination";

export default function Index({ auth, users }) {
    console.log(users.links);
    return (
        <AuthenticatedLayout auth={auth}>
            <Head title="Search" />
            <CommunityTabs />

            <div className="flex flex-row flex-wrap m-10">
                {users.data.map((user) => (
                    <SearchedUser key={user.id} user={user} />
                ))}
            </div>
            <Pagination links={users.links} />
        </AuthenticatedLayout>
    );
}
