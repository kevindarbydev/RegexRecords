import React from "react";
import { useForm } from "@inertiajs/react";

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
    return (
        <div className="relative overflow-x-auto">
            <h5 className="mt-2 mb-2 text-center">
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
                                    <td class="px-6 py-4">{album.value}$</td>
                                    {collection_album.for_sale == 0 ? (
                                        <>
                                            <td className="px-6 py-4">
                                                <p className="mr-10">No</p>
                                            </td>
                                            <td className="px-6 py-4">
                                                <form onSubmit={submit}>
                                                    <input
                                                        type="radio"
                                                        name="for_sale"
                                                        value={
                                                            collection_album.id
                                                        }
                                                        onChange={(e) => {
                                                            setData(
                                                                "cAlbum",
                                                                e.target.value
                                                            );
                                                        }}
                                                    />{" "}
                                                    Sell
                                                    <button className="ml-5 inline-flex items-center px-4 py-2 bg-gray-800 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-gray-700 focus:bg-gray-700 active:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-150">
                                                        Submit
                                                    </button>
                                                </form>
                                            </td>
                                        </>
                                    ) : (
                                        <>
                                            <td className="px-6 py-4">
                                                <p className="mr-10">Yes</p>
                                            </td>
                                            <td className="px-6 py-4">
                                                <form onSubmit={submit}>
                                                    <input
                                                        type="radio"
                                                        name="for_sale"
                                                        value={
                                                            collection_album.id
                                                        }
                                                        onChange={(e) => {
                                                            setData(
                                                                "cAlbum",
                                                                e.target.value
                                                            );
                                                        }}
                                                    />{" "}
                                                    Don't Sell
                                                    <button className="ml-5 inline-flex items-center px-4 py-2 bg-gray-800 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-gray-700 focus:bg-gray-700 active:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-150">
                                                        Submit
                                                    </button>
                                                </form>
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
