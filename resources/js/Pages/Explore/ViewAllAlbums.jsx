import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { useForm, Head, Link } from "@inertiajs/react";
import ExploreTabs from "@/Components/Tabs/ExploreTabs";
import Album from "../Albums/Partials/Album";

export default function ViewAllAlbums({ auth, albums }) {
    // const { data, setData, post, processing, reset, errors } = useForm({
    //     album_name: "",
    // });

    // const submit = (e) => {
    //     e.preventDefault();
    //     post(route("collections.store"), { onSuccess: () => reset() });
    // };

    return (
        <AuthenticatedLayout auth={auth}>
            <Head title="All Albums" />
            <ExploreTabs />
            searchbar, some sorting options right here and also in sidebar
            <h1 className="ml-2 mt-2 text-5xl font-normal hover:font-bold">
                all them albums go here
            </h1>
            <div className="p-4 sm:p-6 lg:p-8 ml-10">
                <div className="flex flex-row flex-wrap">
                    {albums.map((album) => (
                        <Album key={album.id} album={album} />
                    ))}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
