import React from "react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { usePage, useForm } from "@inertiajs/react";
import { UserPlusIcon } from "@heroicons/react/24/solid";
import toast, { Toaster } from "react-hot-toast";
import PrimaryButton from "@/Components/PrimaryButton";

const notify = () => toast.success("Friend request accepted!");
const notifyDeny = () => toast.error("Friend request denied!");

dayjs.extend(relativeTime);

function FriendshipPending({ friendship }) {   
    const user = usePage().props.auth.user;
    const { patch } = useForm({});
    const acceptFriendship = (e) => {
        e.preventDefault();
        patch(route("friends.update", friendship.id));
    };
    const denyFriendship = (e) => {
        e.preventDefault();
        patch(route("friends.deny", friendship.id));
    };
    return (
        <div class="mr-5">
            <Toaster />
            <div class="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                {friendship.recipient.id == user.id ? (
                    <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                        {friendship.sender.name}
                    </h5>
                ) : (
                    <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                        {friendship.recipient.name}
                    </h5>
                )}

                <p class="font-normal text-gray-700 dark:text-gray-400">
                    <small className="text-sm text-gray-600">
                        Pending request since{" "}
                        {dayjs(friendship.created_at).fromNow()}
                    </small>
                </p>
                <div className="flex flex-row">
                    <form onSubmit={acceptFriendship}>
                        {friendship.recipient.id == user.id ? (
                            <div className="flex flex-row self-center mt-5">
                                <UserPlusIcon class="w-5 h-5 self-center" />
                                <PrimaryButton
                                    onClick={notify}
                                    className="ml-3 self-center"
                                >
                                    Accept
                                </PrimaryButton>
                            </div>
                        ) : (
                            <div></div>
                        )}
                    </form>
                    <form onSubmit={denyFriendship}>
                        {friendship.recipient.id == user.id ? (
                            <div className="flex flex-row self-center mt-5">
                                <PrimaryButton
                                    onClick={notifyDeny}
                                    className="ml-3 self-center"
                                >
                                    Deny
                                </PrimaryButton>
                            </div>
                        ) : (
                            <div></div>
                        )}
                    </form>
                </div>
            </div>
        </div>
    );
}

export default FriendshipPending;
