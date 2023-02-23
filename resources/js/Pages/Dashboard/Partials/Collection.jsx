import React, { useState } from "react";
import Dropdown from "@/Components/Dropdown";
import InputError from "@/Components/InputError";
import PrimaryButton from "@/Components/PrimaryButton";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { useForm, usePage } from "@inertiajs/react";
import Album from "@/Pages/Dashboard/Partials/Album";

import { PlusCircleIcon } from "@heroicons/react/24/solid";
import Collection_Album from "./Collection_Album";

dayjs.extend(relativeTime);

export default function Collection({ collection }) {
    const { auth } = usePage().props;

    const [editing, setEditing] = useState(false);

    const { data, setData, patch, clearErrors, reset, errors } = useForm({
        message: collection.collection_name,
    });

    const submit = (e) => {
        e.preventDefault();
        patch(route("dashboard.collections.update", collection.id), {
            onSuccess: () => setEditing(false),
        });
    };

    return (
        <>
            <div className="p-6 flex space-x-2">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125"
                    />
                </svg>

                <div className="flex-1">
                    <div className="flex justify-between items-center">
                        <div>
                            <span className="text-gray-800">
                                {collection.collection_name}
                            </span>
                            <small className="ml-2 text-sm text-gray-600">
                                {dayjs(collection.created_at).fromNow()}
                            </small>
                            {collection.created_at !==
                                collection.updated_at && (
                                    <small className="text-sm text-gray-600">
                                        {" "}
                                        &middot; edited
                                    </small>
                                )}
                        </div>
                        {collection.user_id === auth.user.id && (
                            <Dropdown>
                                <Dropdown.Trigger>
                                    <button>
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-4 w-4 text-gray-400"
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                        >
                                            <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
                                        </svg>
                                    </button>
                                </Dropdown.Trigger>
                                <Dropdown.Content>
                                    <button
                                        className="block w-full px-4 py-2 text-left text-sm leading-5 text-gray-700 hover:bg-gray-100 focus:bg-gray-100 transition duration-150 ease-in-out"
                                        onClick={() => setEditing(true)}
                                    >
                                        Edit Collection Name
                                    </button>
                                    <Dropdown.Link
                                        as="button"
                                        href={route(
                                            "dashboard.collections.destroy",
                                            collection.id
                                        )}
                                        method="delete"
                                    >
                                        Delete Collection
                                    </Dropdown.Link>
                                </Dropdown.Content>
                            </Dropdown>
                        )}
                    </div>
                    <a
                        href="/dashboard/albums"
                        class="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-black hover:bg-gray-100 dark:hover:bg-gray-100"
                    >
                        <PlusCircleIcon className="h-6 w-6 text-blue-500" />
                        <span class="ml-3">Add an album</span>
                    </a>
                    <div className="flex flex-row flex-wrap">
                        {/* {collection_albums.map((collection_album) => (
                            <Collection_Album key={collection_album.collection_id} album={collection_album} />
                        ))} */}
                    </div>
                    {editing ? (
                        <form onSubmit={submit}>
                            <textarea
                                value={data.collection_name}
                                onChange={(e) =>
                                    setData("collection_name", e.target.value)
                                }
                                className="mt-4 w-full text-gray-900 border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm"
                            ></textarea>
                            <InputError message={errors.message} class="mt-2" />
                            <div className="space-x-2">
                                <PrimaryButton className="mt-4">
                                    Save
                                </PrimaryButton>
                                <button
                                    className="mt-4"
                                    onClick={() => {
                                        setEditing(false);
                                        reset();
                                        clearErrors();
                                    }}
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    ) : (
                        <p className="mt-4 text-lg text-gray-900"></p>
                    )}{" "}
                </div>
            </div>
        </>
    );
}
