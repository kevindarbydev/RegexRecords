import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import PrimaryButton from "@/Components/PrimaryButton";
import { useForm, Head, Link } from "@inertiajs/react";
import DashboardTabs from "@/Components/Tabs/DashboardTabs";
import Collection_Album from "@/Components/Collection_Album";

export default function Index({ auth, collection_albums }) {

    return (
        <AuthenticatedLayout auth={auth}>
            <DashboardTabs/>
            <Head title="Collection" />
            <div className="flex flex-row">
                 My Collection
                <div className="p-4 sm:p-6 lg:p-8 ml-10">

                    <div className="flex flex-row flex-wrap">
                        {collection_albums.map((collection_album) => (
                          
                                <Collection_Album key={collection_album.id} album={collection_album} />
                          
                        ))}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
