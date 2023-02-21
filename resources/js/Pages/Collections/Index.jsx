import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import Album from "../Albums/Partials/Album";
import InputError from "@/Components/InputError";
import PrimaryButton from "@/Components/PrimaryButton";
import { useForm, Head, Link } from "@inertiajs/react";
import DashboardTabs from "@/Components/Tabs/DashboardTabs";

export default function Index({ auth, albums }) {
    const { data, setData, post, processing, reset, errors } = useForm({
        album_name: "",
        artist: "",
        value: "",
    });

    const submit = (e) => {
        e.preventDefault();
        post(route("albums.store"), { onSuccess: () => reset() });
    };
    return (
        <AuthenticatedLayout auth={auth}>
            <Head title="Collection" />
            <div className="flex flex-row">
                <div className="p-4 sm:p-6 lg:p-8 ml-10">
                    My Collection
                    <div className="flex flex-row flex-wrap">
                        {albums.map((album) => (
                            <Album key={album.id} album={album} />
                        ))}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
