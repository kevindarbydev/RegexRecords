import React from "react";
import { usePage } from "@inertiajs/react";
import { useState, useEffect } from "react";
import {
    CheckCircleIcon,
    ExclamationCircleIcon,
    XCircleIcon,
} from "@heroicons/react/24/solid";

function FlashMessage() {
    const { flash } = usePage().props;
    const [show, setShow] = useState(true);
    // FIXME:
    // can't try button multiple times without reloading page at /community/search
    useEffect(() => {
        const timeId = setTimeout(() => {
            // After 3 seconds set the show value to false
            setShow(false);
        }, 5000);

        return () => {
            clearTimeout(timeId);
        };
    }, []);

    if (!show) {
        return null;
    }

    return (
        <div className="mx-auto sm:w-3/4 md:w-2/4 fixed inset-x-0 top-10">
            {flash.failure && (
                <div class="bg-red-200 px-6 py-4 my-4 rounded-md text-lg flex items-center w-1/2 mx-auto justify-center">
                    <XCircleIcon class="text-red-600 w-10 h-10 sm:w-5 sm:h-5 mr-3" />
                    <span class="text-red-800">{flash.failure}</span>
                </div>
            )}
            {flash.success && (
                <div class="bg-green-200 px-3 py-2 my-4 rounded-md text-lg flex items-center w-1/2 mx-auto justify-center">
                    <CheckCircleIcon class="text-green-600 w-10 h-10 sm:w-5 sm:h-5 mr-3" />
                    <span class="text-green-800">{flash.success}</span>
                </div>
            )}
            {flash.warning && (
                <div class="bg-yellow-200 px-6 py-4 my-4 rounded-md text-lg flex items-center w-1/2 mx-auto">
                    <ExclamationCircleIcon class="text-yellow-600 w-10 h-10 sm:w-5 sm:h-5 mr-3 justify-center" />
                    <span class="text-yellow-800">{flash.warning}</span>
                </div>
            )}
        </div>
    );
}

export default FlashMessage;
