import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import ExploreTabs from "@/Layouts/Tabs/ExploreTabs";
import Album from "../Dashboard/Partials/Album";
import Pagination from "@/Components/Pagination";

export default function ViewAllAlbums({
    auth,
    albums,
    totalAlbums,
    collections,
    cartCount,
    albumsWithRatings,
}) {
    return (
        <AuthenticatedLayout auth={auth} cartCount={cartCount}>
            <Head title="All Albums" />
            <ExploreTabs />

            <h1 className="m-4 text-5xl font-normal">
                The Complete Regex Records Inventory
            </h1>

            <h1 className="ml-4 -mb-4 text-2xl font-normal">
                Showing&nbsp;
                {totalAlbums} total records:
            </h1>

            <div className="p-4 sm:p-6 lg:p-8 ml-10">
                <div className="flex flex-row flex-wrap">
                    {albums.data.map((album) => (
                        <Album
                            key={album.id}
                            album={album}
                            collections={collections}
                            albumsWithRatings={albumsWithRatings}
                        />
                    ))}
                </div>
            </div>
            <Pagination links={albums.links} />
        </AuthenticatedLayout>
    );
}
