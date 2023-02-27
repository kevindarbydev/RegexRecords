import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";

export default function AlbumDetails({ auth, album, tracks }) {
    const subgenres = album.subgenres;
    return (
        <AuthenticatedLayout auth={auth}>
            <Head title={album.album_name} />
            <div className="flex flex-row mt-6">
                <div className="p-6 rounded-lg shadow-lg w-3/4 mx-auto">
                    <div className="flex items-center mb-8">
                        <img
                            src={album.cover_image_url}
                            alt=""
                            className="w-48 h-48 rounded-lg object-cover mr-8"
                        />
                        {album && album.album_name && album.artist && (
                            <div>
                                <h2 className="text-3xl font-bold">
                                    {album.album_name}
                                </h2>
                                <h3 className="text-xl font-medium text-gray-500">
                                    {album.artist}
                                </h3>
                                {album.year_of_release && (
                                    <h4 className="text-xl">
                                        {album.year_of_release}
                                    </h4>
                                )}
                                {album.genre && (
                                    <p className="text-xl mt-4">
                                        {album.genre}
                                    </p>
                                )}
                                {subgenres && subgenres.length > 0 && (
                                    <p className="text-xl mt-1 text-gray-500">
                                        {subgenres.map((subgenre, index) => (
                                            <span key={index}>
                                                {subgenre}
                                                {index < subgenres.length - 1
                                                    ? ", "
                                                    : ""}
                                            </span>
                                        ))}
                                    </p>
                                )}
                            </div>
                        )}
                        <div className="flex-1 flex justify-end mr-12">
                       
                                <div>
                                    {album.value !== 0 ? (
                                        <p className="text-lg font-medium">
                                            Value: ${album.value}
                                        </p>
                                    ) : (
                                        <p className="text-lg font-medium">
                                            No price data found
                                        </p>
                                    )}
                                </div>
                          
                        </div>
                    </div>
                    <div>
                        <h4 className="text-lg font-medium mb-4">Tracklist</h4>
                        <table className="w-3/4 table border-collapse">
                            <thead>
                                <tr>
                                    <th className="text-left font-medium pr-4 py-2">
                                        Track
                                    </th>
                                    <th className="text-right font-medium py-2">
                                        Duration
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {tracks.map((track, index) => (
                                    <tr key={track.id}>
                                        <td className="text-lg border-b py-2">
                                            {index + 1}. {track.title}
                                        </td>
                                        <td className="text-lg text-right border-b py-2">
                                            {track.duration}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
