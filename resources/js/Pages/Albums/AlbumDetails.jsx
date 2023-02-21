import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { useForm, Head } from "@inertiajs/react";
import Album from "./Partials/Album";

export default function AlbumDetails({ auth, album }) {
    return (
        <AuthenticatedLayout auth={auth}>
            <Head title={album.album_name} />
            <div className="flex flex-row"></div>
        </AuthenticatedLayout>
    );
}
