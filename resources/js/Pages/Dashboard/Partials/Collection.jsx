import React, { useState } from "react";
import Dropdown from "@/Components/Dropdown";
import InputError from "@/Components/InputError";
import PrimaryButton from "@/Components/PrimaryButton";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { useForm, usePage } from "@inertiajs/react";
import Album from "@/Pages/Dashboard/Partials/Album";

import { MusicalNoteIcon } from "@heroicons/react/24/solid";
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
                <div className="flex-1">
                    <div className="flex justify-between items-center">
                        <div className="flex flex-row">
                            <MusicalNoteIcon className="mr-2 w-4 h-4 self-center" />
                            <span className="text-gray-800 dark:text-white">
                                {collection.collection_name}
                            </span>
                            {collection.created_at !==
                                collection.updated_at && (
                                <small className="text-sm text-gray-600 self-center ml-2">
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
                    {editing ? (
                        <form onSubmit={submit}>
                            <input
                                value={data.collection_name}
                                onChange={(e) =>
                                    setData("collection_name", e.target.value)
                                }
                                className="mt-4 w-full text-gray-900 border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm"
                            ></input>
                            <InputError message={errors.message} class="mt-2" />
                            <div className="space-x-2">
                                <PrimaryButton className="mt-4 text-white rounded m-2 bg-blue-400 hover:bg-violet-600">
                                    Save
                                </PrimaryButton>
                                <button
                                    className="px-3 py-1 text-white rounded m-2 bg-blue-400 hover:bg-violet-600"
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
