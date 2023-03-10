import React from "react";
import { usePage } from "@inertiajs/react";
import { useState, useEffect } from "react";
import {
    CheckCircleIcon,
    ExclamationCircleIcon,
    XCircleIcon,
    XMarkIcon,
} from "@heroicons/react/24/solid";

const ButtonClose = ({ onClick }) => {
    return (
        <button
            onClick={onClick}
            type="button"
            className="focus:outline-none group mr-2 p-2"
        >
            <XMarkIcon className="w-5 h-5" />
        </button>
    );
};

function FlashMessage() {
    const [visible, setVisible] = useState(true);
    const { flash } = usePage().props;

    useEffect(() => {
        setVisible(true);
    }, [flash]);

    return (
        <div className="mx-auto sm:w-3/4 md:w-2/4 fixed inset-x-0 top-10">
            {flash.failure && visible && (
                <div class="bg-red-200 px-6 py-4 my-4 rounded-md text-lg flex items-center w-1/2 mx-auto justify-center">
                    <XCircleIcon class="text-red-600 w-10 h-10 sm:w-5 sm:h-5 mr-3" />
                    <span class="text-red-800">{flash.failure}</span>
                    <ButtonClose onClick={() => setVisible(false)} />
                </div>
            )}
            {flash.success && visible && (
                <div class="bg-green-200 px-3 py-2 my-4 rounded-md text-lg flex items-center w-1/2 mx-auto justify-center">
                    <CheckCircleIcon class="text-green-600 w-10 h-10 sm:w-5 sm:h-5 mr-3" />
                    <span class="text-green-800">{flash.success}</span>
                    <ButtonClose onClick={() => setVisible(false)} />
                </div>
            )}
            {flash.warning && visible && (
                <div class="bg-yellow-200 px-6 py-4 my-4 rounded-md text-lg flex items-center w-1/2 mx-auto">
                    <ExclamationCircleIcon class="text-yellow-600 w-10 h-10 sm:w-5 sm:h-5 mr-3 justify-center" />
                    <span class="text-yellow-800">{flash.warning}</span>
                    <ButtonClose onClick={() => setVisible(false)} />
                </div>
            )}
        </div>
    );
}

export default FlashMessage;
