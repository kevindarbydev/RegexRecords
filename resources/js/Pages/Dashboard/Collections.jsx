import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { useForm, Head } from "@inertiajs/react";
import DashboardTabs from "@/Layouts/Tabs/DashboardTabs";
import InputError from "@/Components/InputError";
import Collection from "@/Pages/Dashboard/Partials/Collection";
import { Bars3BottomLeftIcon } from "@heroicons/react/24/solid";
import { Transition } from "@headlessui/react";
import { useState } from "react";
import AlbumsInCollection from "./Partials/AlbumsInCollection";

export default function Index({
    auth,
    collections,
    collection_albums,
    albums,
    cartCount
}) {
    const [currentComp, setCurrentComp] = useState();
    const [isShowing, setIsShowing] = useState(true);
    const { data, setData, post, processing, reset, errors } = useForm({
        collection_name: "",
    });

    const submit = (e) => {
        e.preventDefault();
        post(route("dashboard.collections.store"), {
            onSuccess: () => reset(),
        });
    };

    const handleComponentChange = (newComp) => {
        setCurrentComp(newComp);
    };

    let componentToShow;
    {
        collections.map((collection) =>
            currentComp === collection.collection_name ? (
                (componentToShow = (
                    <div className="flex flex-row flex-wrap m-10">
                        <AlbumsInCollection
                            collection={collection}
                            collection_albums={collection_albums}
                            albums={albums}
                        />
                    </div>
                ))
            ) : (
                <></>
            )
        );
    }

    return (
        <AuthenticatedLayout auth={auth} cartCount={cartCount}>
            <DashboardTabs />
            <Head title="Collection" />
            <div className="flex flex-row">
                <div className="w-fit h-screen sticky top-0">
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
                            class="sticky top-0 left-0 z-40 sm:w-80 h-screen transition-transform sm:translate-x-0 "
                            aria-label="Sidebar"
                        >
                            <div class="h-full px-3 py-4 overflow-y-auto bg-violet-300 dark:bg-gray-800">
                                <div className="flex flex-col">
                                    <div className="m-3">
                                        <form
                                            name="createForm"
                                            onSubmit={submit}
                                        >
                                            <div className="flex flex-col">
                                                <div className="mb-4">
                                                    <label className="">
                                                        Title
                                                    </label>
                                                    <input
                                                        type="text"
                                                        className="w-full px-4 py-2"
                                                        label="Collection Name"
                                                        name="collection_name"
                                                        value={
                                                            data.collection_name
                                                        }
                                                        onChange={(e) =>
                                                            setData(
                                                                "collection_name",
                                                                e.target.value
                                                            )
                                                        }
                                                    />
                                                    <InputError
                                                        message={
                                                            errors.collection_name
                                                        }
                                                        className="mt-2"
                                                    />
                                                    <button
                                                        type="submit"
                                                        className="px-6 py-2 font-bold text-white rounded m-2 bg-gradient-to-r from-cyan-500 to-blue-500"
                                                    >
                                                        Create Collection
                                                    </button>
                                                </div>
                                            </div>
                                        </form>
                                        <div>
                                            <div>
                                                {collections.map(
                                                    (collection) => (
                                                        <div className="mt-6 bg-violet-300 shadow-xl rounded-lg border-2 border-violet-700 dark:bg-gray-800">
                                                            <Collection
                                                                key={
                                                                    collection.id
                                                                }
                                                                collection={
                                                                    collection
                                                                }
                                                            />
                                                            <button
                                                                className="px-3 py-1 font-bold text-white rounded m-2 bg-blue-400 hover:bg-violet-600"
                                                                onClick={() =>
                                                                    handleComponentChange(
                                                                        collection.collection_name
                                                                    )
                                                                }
                                                            >
                                                                View
                                                            </button>
                                                        </div>
                                                    )
                                                )}
                                            </div>
                                        </div>
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
