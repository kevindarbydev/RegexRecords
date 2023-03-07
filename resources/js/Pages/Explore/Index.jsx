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
    topPicks,
    selectedSubgenre,
    featureLetter,
    cartCount,
    albumsWithRatings,
}) {
    return (
        <AuthenticatedLayout auth={auth} cartCount={cartCount}>
            <Head title="Explore" />
            <ExploreTabs />

            <h1 className="text-5xl m-4">Discover</h1>
            <h1 className="text-4xl ml-4 -mb-4">
                This week's fresh Regex Records:
            </h1>
            <NewReleases
                recentAlbums={recentAlbums}
                collections={collections}
                albumsWithRatings={albumsWithRatings}
            />

            <h1 className="text-4xl ml-4 -mb-4">
                Top Picks in {selectedSubgenre}:
            </h1>
            <TopPicks
                topPicks={topPicks}
                collections={collections}
                albumsWithRatings={albumsWithRatings}
            />

            <h1 className="text-4xl ml-4 -mb-4">
                Spotlight: "{featureLetter}" Artists
            </h1>
            <Spotlight
                spotlightAlbums={spotlightAlbums}
                collections={collections}
                albumsWithRatings={albumsWithRatings}
            />
        </AuthenticatedLayout>
    );
}
