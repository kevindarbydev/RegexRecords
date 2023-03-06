import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import SearchedUser from "./Partials/SearchedUser";
import CommunityTabs from "@/Layouts/Tabs/CommunityTabs";
import Pagination from "@/Components/Pagination";
import {
    Bars3BottomLeftIcon,
    MagnifyingGlassIcon,
} from "@heroicons/react/24/solid";
import { Transition } from "@headlessui/react";
import { useState } from "react";

export default function Index({ auth, users, cartCount }) {
    const [isShowing, setIsShowing] = useState(true);
    return (
        <AuthenticatedLayout auth={auth} cartCount={cartCount}>
            <Head title="Search" />
            <div class="flex flex-col">
                <CommunityTabs />

                <main class="flex flex-row">
                    <div className="w-fit h-screen sticky top-0">
                        <button
                            onClick={() =>
                                setIsShowing((isShowing) => !isShowing)
                            }
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
                                            <span class="ml-3 flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white bg-gray-100 dark:bg-gray-700">
                                                <MagnifyingGlassIcon className="h-6 w-6 text-blue-500 mr-2" />
                                                Search Results
                                            </span>
                                        </li>
                                    </ul>
                                </div>
                            </aside>
                        </Transition>
                    </div>
                    <div className="flex flex-col">
                        <div className="flex flex-col md:flex-wrap m-6 h-[30rem] mb-auto">
                            {users.data.map((user) => (
                                <SearchedUser key={user.id} user={user} />
                            ))}

                            {users.data.length == 0 ? (
                                <>No Results Found</>
                            ) : (
                                <></>
                            )}
                        </div>
                        <Pagination links={users.links} />
                    </div>
                </main>
            </div>
        </AuthenticatedLayout>
    );
}
