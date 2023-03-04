import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import SearchBar from "./Partials/SearchBar";
import SearchedUser from "./Partials/SearchedUser";
import CommunityTabs from "@/Layouts/Tabs/CommunityTabs";
import Pagination from "@/Components/Pagination";

export default function Index({ auth, users, cartCount }) {
    console.log(users.links);
    return (
        <AuthenticatedLayout auth={auth} cartCount={cartCount}>
            <Head title="Search" />
            <div class="flex flex-col h-screen justify-between">
                <CommunityTabs />

                <main class="mb-auto">
                    <div className="flex flex-col md:flex-wrap m-4 h-[30rem]">
                        {users.data.map((user) => (
                            <SearchedUser key={user.id} user={user} />
                        ))}
                    </div>
                </main>
                <footer class="mb-10">
                    <Pagination links={users.links} />
                </footer>
            </div>
        </AuthenticatedLayout>
    );
}
