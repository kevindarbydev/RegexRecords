import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";

export default function CollectionModal({
    collection,
    friendsCollectionsWithAlbums,
    totalLikes,
}) {
    let [isOpen, setIsOpen] = useState(false);

    function closeModal() {
        setIsOpen(false);
    }

    function openModal() {
        setIsOpen(true);
    }

    return (
        <div className="flex-1">
            <div className="mt-4">
                <button
                    type="button"
                    onClick={openModal}
                    className="rounded-md bg-black bg-opacity-20 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
                >
                    <div className="flex flex-col">
                        <h5 className="mt-2 mb-2 mr-auto">
                            {collection.collection_name}
                        </h5>
                        <p className="self-center mr-auto">
                            {totalLikes.map((t) =>
                                t[0] == collection.id ? (
                                    <span>#likes: {t[1]}</span>
                                ) : (
                                    <></>
                                )
                            )}
                        </p>
                    </div>
                </button>
            </div>

            <Transition appear show={isOpen} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={closeModal}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black bg-opacity-25" />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 text-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className="w-full max-w-xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 mx-auto m-10">
                                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                            <th
                                                scope="col"
                                                className="px-6 py-3"
                                            >
                                                Album
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-6 py-3"
                                            >
                                                Artist
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-6 py-3"
                                            >
                                                Value
                                            </th>
                                        </thead>
                                        {friendsCollectionsWithAlbums.map(
                                            (collection_album) =>
                                                collection_album.collection_id ==
                                                collection.id ? (
                                                    <tbody>
                                                        <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                                            <th
                                                                scope="row"
                                                                class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                                            >
                                                                <img
                                                                    className="rounded-t-lg md:h-full md:w-20 md:rounded-none md:rounded-l-lg mr-5"
                                                                    src={
                                                                        collection_album
                                                                            .album
                                                                            .cover_image_url
                                                                    }
                                                                    alt=""
                                                                />
                                                                <p className="pt-2">
                                                                    {
                                                                        collection_album
                                                                            .album
                                                                            .album_name
                                                                    }
                                                                </p>
                                                            </th>
                                                            <td class="px-6 py-4">
                                                                {
                                                                    collection_album
                                                                        .album
                                                                        .artist
                                                                }
                                                            </td>
                                                            <td class="px-6 py-4">
                                                                {
                                                                    collection_album
                                                                        .album
                                                                        .value
                                                                }
                                                                $
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                ) : (
                                                    <div></div>
                                                )
                                        )}
                                    </table>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </div>
    );
}
