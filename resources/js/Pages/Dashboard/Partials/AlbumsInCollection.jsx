import React from "react";
import { useForm } from "@inertiajs/react";
import Dropdown from "@/Components/Dropdown";

function AlbumsInCollection({ collection, collection_albums, albums }) {
    const { data, setData, patch, processing, reset, errors } = useForm({
        cAlbum: "",
    });

    const submit = (e) => {
        e.preventDefault();
        patch(route("dashboard.collections.album.sell"), {
            onSuccess: () => reset(),
        });
    };

    const remove = (e) => {
        e.preventDefault();
        patch(route("dashboard.collections.remove.album"), {
            onSuccess: () => reset(),
        });
    };
    return (
        <div className="relative overflow-x-auto">
            <h5 className="text-center text-2xl">
                {collection.collection_name}
            </h5>
            <table className="w-1/2 text-sm text-left text-gray-500 dark:text-gray-400 mx-auto mt-10">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <th scope="col" className="px-6 py-3">
                        Album
                    </th>
                    <th scope="col" className="px-6 py-3">
                        Artist
                    </th>
                    <th scope="col" className="px-6 py-3">
                        Value
                    </th>
                    <th scope="col" className="px-6 py-3">
                        For Sale?
                    </th>
                    <th scope="col" className="px-6 py-3"></th>
                </thead>
                {collection_albums.map((collection_album) =>
                    albums.map((album) =>
                        album.id == collection_album.album_id &&
                        collection_album.collection_id == collection.id ? (
                            <tbody>
                                <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                    <th
                                        scope="row"
                                        class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                    >
                                        <img
                                            className="rounded-t-lg md:h-full md:w-20 md:rounded-none md:rounded-l-lg mr-5"
                                            src={album.cover_image_url}
                                            alt=""
                                        />
                                        <p className="pt-2">
                                            {album.album_name}
                                        </p>
                                    </th>
                                    <td class="px-6 py-4">{album.artist}</td>
                                    <td class="px-6 py-4">
                                        ${album.value.toFixed(2)}
                                    </td>
                                    {collection_album.for_sale == 0 ? (
                                        <>
                                            <td className="px-6 py-4">
                                                <p className="mr-10">No</p>
                                            </td>
                                            <td className="px-6 py-4">
                                                <Dropdown>
                                                    <Dropdown.Trigger>
                                                        <button
                                                            onClick={() => {
                                                                setData(
                                                                    "cAlbum",
                                                                    collection_album.id
                                                                );
                                                            }}
                                                        >
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
                                                        <form>
                                                            <button
                                                                className="block w-full px-4 py-2 text-left text-sm leading-5 text-gray-700 hover:bg-gray-100 focus:bg-gray-100 transition duration-150 ease-in-out"
                                                                onClick={submit}
                                                            >
                                                                Sell Album
                                                            </button>
                                                            <button
                                                                className="block w-full px-4 py-2 text-left text-sm leading-5 text-gray-700 hover:bg-gray-100 focus:bg-gray-100 transition duration-150 ease-in-out"
                                                                onClick={remove}
                                                            >
                                                                Remove Album
                                                            </button>
                                                        </form>
                                                    </Dropdown.Content>
                                                </Dropdown>
                                            </td>
                                        </>
                                    ) : (
                                        <>
                                            <td className="px-6 py-4">
                                                <p className="mr-10">Yes</p>
                                            </td>
                                            <td className="px-6 py-4">
                                                <Dropdown>
                                                    <Dropdown.Trigger>
                                                        <button
                                                            onClick={() => {
                                                                setData(
                                                                    "cAlbum", collection_album.id
                                                                
                                                                    // "collection", collection_album.collection_id
                                                                );
                                                            }}
                                                        >
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
                                                        <form>
                                                            <button
                                                                className="block w-full px-4 py-2 text-left text-sm leading-5 text-gray-700 hover:bg-gray-100 focus:bg-gray-100 transition duration-150 ease-in-out"
                                                                onClick={submit}
                                                            >
                                                                Stop Selling
                                                                Album
                                                            </button>
                                                            <button
                                                                className="block w-full px-4 py-2 text-left text-sm leading-5 text-gray-700 hover:bg-gray-100 focus:bg-gray-100 transition duration-150 ease-in-out"
                                                                onClick={remove}
                                                            >
                                                                Remove Album
                                                            </button>
                                                        </form>
                                                    </Dropdown.Content>
                                                </Dropdown>
                                            </td>
                                        </>
                                    )}
                                </tr>
                            </tbody>
                        ) : (
                            <div></div>
                        )
                    )
                )}
            </table>
        </div>
    );
}

export default AlbumsInCollection;
