import React from "react";
import dayjs from "dayjs";
import { useForm } from "@inertiajs/react";
import relativeTime from "dayjs/plugin/relativeTime";
import PrimaryButton from "@/Components/PrimaryButton";
import toast, { Toaster } from "react-hot-toast";

const notify = () => toast.success("Friend request sent!");

dayjs.extend(relativeTime);

function SearchedUser({ user }) {
    const { patch } = useForm({});
    const submit = (e) => {
        e.preventDefault();
        patch(route("community.search.add.friend", user.id));
    };
    return (
        <div class="mr-5 mb-5 w-80">
            <Toaster />
            <div class="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                    {user.name}
                </h5>
                <p class="font-normal text-gray-700 dark:text-gray-400">
                    {user.email}
                </p>
                <p class="font-normal text-gray-700 dark:text-gray-400">
                    <small className="text-sm text-gray-600">
                        Joined Regex Records {dayjs(user.created_at).fromNow()}
                    </small>
                </p>
                <form onSubmit={submit}>
                    <div className="space-x-2">
                        <PrimaryButton onClick={notify} className="mt-4">
                            Add Friend
                        </PrimaryButton>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default SearchedUser;
