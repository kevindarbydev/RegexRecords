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

function Friends({ auth, currentFriendships, pendingFriendships }) {
    const [currentComp, setCurrentComp] = useState("friends");
    const [isShowing, setIsShowing] = useState(true);

    const handleComponentChange = (newComp) => {
        setCurrentComp(newComp);
    };

    let componentToShow;
    if (currentComp === "friends") {
        componentToShow = (
            <div className="flex flex-row flex-wrap m-10">
                {currentFriendships.map((friendship) => (
                    <Friendship key={friendship.id} friendship={friendship} />
                ))}
            </div>
        );
    } else if (currentComp === "pending") {
        componentToShow = (
            <div className="flex flex-row flex-wrap m-10">
                {pendingFriendships.map((friendship) => (
                    <FriendshipPending
                        key={friendship.id}
                        friendship={friendship}
                    />
                ))}
            </div>
        );
    }

    return (
        <AuthenticatedLayout auth={auth}>
            <Head title="MyFriends" />
            <CommunityTabs />
            <div className="flex flex-row">
                <div className="w-fit h-screen sticky top-0">
                    {/* FIXME: responsive burger on small screens */}
                    {/* <button
                        data-drawer-target="default-sidebar"
                        data-drawer-toggle="default-sidebar"
                        aria-controls="default-sidebar"
                        type="button"
                        class="inline-flex items-center p-2 mt-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                    >
                        <span class="sr-only">Open sidebar</span>
                        <svg
                            class="w-6 h-6"
                            aria-hidden="true"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                clip-rule="evenodd"
                                fill-rule="evenodd"
                                d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
                            ></path>
                        </svg>
                    </button> */}
                    <button
                        onClick={() => setIsShowing((isShowing) => !isShowing)}
                        class="absolute z-50"
                    >
                        <Bars3BottomLeftIcon className="w-7 h-7" />
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
                                <ul class="space-y-2 mt-5">
                                    <li>
                                        <a
                                            href="#"
                                            class={`flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 ${
                                                currentComp === "friends"
                                                    ? "bg-white"
                                                    : ""
                                            }`}
                                            onClick={() =>
                                                handleComponentChange("friends")
                                            }
                                        >
                                            <UsersIcon className="h-6 w-6 text-blue-500" />
                                            <span class="ml-3">Friends</span>
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            href="#"
                                            class={`flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 ${
                                                currentComp === "pending"
                                                    ? "bg-white"
                                                    : ""
                                            }`}
                                            onClick={() =>
                                                handleComponentChange("pending")
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
                        </aside>
                    </Transition>
                </div>
                {componentToShow}
            </div>
        </AuthenticatedLayout>
    );
}

export default Friends;
