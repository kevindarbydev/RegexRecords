import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { useForm, Head } from "@inertiajs/react";
import Album from "./Partials/Album";

export default function AlbumDetails({ auth, album, tracks }) {

    return (
        <AuthenticatedLayout auth={auth}>
            <Head title={album.album_name} />
            <div className="flex flex-row">
                <div className="p-6 rounded-lg shadow-lg w-3/4 mx-auto">
                    <div className="flex items-center mb-8">
                        <img
                            src={album.cover_image_url}
                            alt=""
                            className="w-48 h-48 rounded-lg object-cover mr-8"
                        />
                        <div>
                            <h2 className="text-3xl font-bold">
                                {album.album_name}
                            </h2>
                            <h3 className="text-xl font-medium text-gray-500">
                                {album.artist_name}
                            </h3>
                            <p className="text-xl mt-2">{album.genre}</p>
                        </div>
                    </div>
                    <div>
                        <h4 className="text-lg font-medium mb-4">Tracklist</h4>
                        <ul>
                            {tracks.map((track) => (
                                <li className="text-lg mb-2" key={track.id}>{track.title} <span>{track.duration}</span></li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
