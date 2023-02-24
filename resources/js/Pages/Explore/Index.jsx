import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import ExploreTabs from "@/Layouts/Tabs/ExploreTabs";
import TopPicks from "./Partials/TopPicks";
import NewReleases from "./Partials/NewReleases";
import Spotlight from "./Partials/Spotlight";

export default function Index({
    auth,
    collections,
    spotlightAlbums,
    recentAlbums,
    topAlbums,
}) {
    return (
        <AuthenticatedLayout auth={auth}>
            <Head title="Explore" />
            <ExploreTabs />

            <h1 className="text-4xl m-4">Fresh This Week:</h1>
            <NewReleases
                recentAlbums={recentAlbums}
                collections={collections}
            />

            <h1 className="text-4xl m-4">Top Picks:</h1>
            <TopPicks
            //   topAlbums = {topAlbums}
            // collections = {collections}
            />

            <h1 className="text-4xl m-4">Spotlight: "B" Artists</h1>
            <Spotlight
                spotlightAlbums={spotlightAlbums}
                collections={collections}
            />
        </AuthenticatedLayout>
    );
}
