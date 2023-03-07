import React from "react";
import { useState } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import Friendship from "./Partials/Friendship";
import FriendshipPending from "./Partials/FriendshipPending";
import CommunityTabs from "@/Layouts/Tabs/CommunityTabs";
import {
    UsersIcon,
    ExclamationCircleIcon,
    Bars3BottomLeftIcon,
} from "@heroicons/react/24/solid";
import { Transition } from "@headlessui/react";

function Friends({
    auth,
    currentFriendships,
    pendingFriendships,
    current_user,
    cartCount,
}) {
    const [currentComp, setCurrentComp] = useState("friends");
    const [isShowing, setIsShowing] = useState(true);

    const handleComponentChange = (newComp) => {
        setCurrentComp(newComp);
    };

    let componentToShow;
    if (currentComp === "friends") {
        componentToShow = (
            <div className="flex flex-col md:flex-wrap m-10 h-screen">
                {currentFriendships.map((friendship) =>
                    //  FIXME: works for now, but will try and set FK relationship in DB and set friendships to cascade delete on user delete
                    friendship.sender == null ||
                    friendship.recipient == null ? (
                        <></>
                    ) : (
                        <Friendship
                            key={friendship.id}
                            friendship={friendship}
                            user={current_user}
                        />
                    )
                )}
            </div>
        );
    } else if (currentComp === "pending") {
        componentToShow = (
            <div className="flex flex-col lg:flex-wrap m-10 h-screen">
                {pendingFriendships.map((friendship) =>
                    //  FIXME: works for now, but will try and set FK relationship in DB and set friendships to cascade delete on user delete
                    friendship.sender == null ||
                    friendship.recipient == null ? (
                        <></>
                    ) : (
                        <FriendshipPending
                            key={friendship.id}
                            friendship={friendship}
                        />
                    )
                )}
            </div>
        );
    }

    return (
        <AuthenticatedLayout auth={auth} cartCount={cartCount}>
            <CommunityTabs />
            <Head title="MyFriends" />
            <div className="flex flex-row">
                <div className="w-fit h-screen sticky top-0 m-2">
                    <button
                        onClick={() => setIsShowing((isShowing) => !isShowing)}
                        class="absolute z-50"
                    >
                        <Bars3BottomLeftIcon className="w-10 h-10" />
                        <p className="text-xs ml-1 font-thin tracking-tight">
                            {isShowing ? "Collapse" : "Expand"}{" "}
                        </p>
                    </button>
                    <Transition
                        show={isShowing}
                        enter="transition ease-in-out duration-300 transform"
                        enterFrom="-translate-x-full"
                        enterTo="translate-x-0"
                        leave="transition ease-in-out duration-300 transform"
                        leaveFrom="translate-x-0"
                        leaveTo="-translate-x-full"
                    >
                        <aside
                            id="default-sidebar"
                            class="sticky top-0 left-0 z-40 sm:w-64 h-screen transition-transform sm:translate-x-0 "
                            aria-label="Sidebar"
                        >
                            <div class="h-full px-3 py-4 overflow-y-auto bg-violet-300 dark:bg-gray-800">
                                <div className="flex flex-col">
                                    <div className="mb-4 mt-8">
                                        <ul class="space-y-2 mt-5">
                                            <li>
                                                <a
                                                    href="#"
                                                    class={`flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 ${
                                                        currentComp ===
                                                        "friends"
                                                            ? "bg-white"
                                                            : ""
                                                    }`}
                                                    onClick={() =>
                                                        handleComponentChange(
                                                            "friends"
                                                        )
                                                    }
                                                >
                                                    <UsersIcon className="h-6 w-6 text-blue-500" />
                                                    <span class="ml-3">
                                                        Friends
                                                    </span>
                                                </a>
                                            </li>
                                            <li>
                                                <a
                                                    href="#"
                                                    class={`flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 ${
                                                        currentComp ===
                                                        "pending"
                                                            ? "bg-white"
                                                            : ""
                                                    }`}
                                                    onClick={() =>
                                                        handleComponentChange(
                                                            "pending"
                                                        )
                                                    }
                                                >
                                                    <ExclamationCircleIcon className="h-6 w-6 text-blue-500" />
                                                    <span class="flex-1 ml-3 whitespace-nowrap">
                                                        Pending
                                                    </span>
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </aside>
                    </Transition>
                </div>
                {componentToShow}
            </div>
        </AuthenticatedLayout>
    );
}

export default Friends;
