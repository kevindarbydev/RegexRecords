import React from "react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import DangerButton from "@/Components/DangerButton";
import { Link } from "@inertiajs/react";

dayjs.extend(relativeTime);

function Friendship({ friendship }) {
    return (
        <div class="mr-5">
            <div class="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                    {friendship.sender.name}
                </h5>

                <p class="font-normal text-gray-700 dark:text-gray-400">
                    <small className="text-sm text-gray-600">
                        Became friends {dayjs(friendship.updated_at).fromNow()}
                    </small>
                </p>
                <Link
                    href={route("friends.unfriend", friendship.id)}
                    method="delete"
                >
                    <DangerButton className="mt-2">Unfriend</DangerButton>
                </Link>
            </div>
        </div>
    );
}

export default Friendship;
