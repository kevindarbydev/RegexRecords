import React from "react";
import CommunityTabs from "@/Layouts/Tabs/CommunityTabs";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import CollectionModal from "./Partials/CollectionModal";
import { Link } from "@inertiajs/react";
import { HandThumbUpIcon } from "@heroicons/react/24/solid";

function FriendDetails({
    friend,
    cartCount,
    auth,
    mutualFriends,
    mutualFriendsCount,
    friendCollections,
    friendsCollectionsWithAlbums,
    totalLikes,
}) {
    return (
        <AuthenticatedLayout auth={auth} cartCount={cartCount}>
            <Head title="Friend Details" />
            <CommunityTabs />
            <main class="flex flex-row">
                <div class=" w-72 h-[32rem] p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 flex flex-col mb-2 m-10">
                    <h2 class="underline">
                        Mutual Friends with <b>{friend.name}</b> (
                        {mutualFriendsCount})
                    </h2>
                    {mutualFriends.map((mf) => (
                        <p> {mf.name} </p>
                    ))}
                </div>
                <div class=" w-72 h-[32rem] p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 flex flex-col mb-2 m-10">
                    <h2 class="underline">
                        List of <b>{friend.name}</b>'s collections
                    </h2>
                    <div>
                        {friendCollections.map((collection) => (
                            <div class="flex flex-row">
                                <CollectionModal
                                    collection={collection}
                                    friendsCollectionsWithAlbums={
                                        friendsCollectionsWithAlbums
                                    }
                                    totalLikes={totalLikes}
                                />
                                <Link
                                    href={route("friends.like.collection", [
                                        collection,
                                    ])}
                                    method="patch"
                                >
                                    <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                                        <HandThumbUpIcon className="w-5 h-5  mt-10 text-violet-700 hover:rotate-[25deg]" />
                                    </h5>
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </main>
        </AuthenticatedLayout>
    );
}

export default FriendDetails;
