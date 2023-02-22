import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { useForm, Head, Link } from "@inertiajs/react";
import ExploreTabs from "@/Components/Tabs/ExploreTabs";

export default function ViewAllAlbums({ auth, albums }) {
    const { data, setData, post, processing, reset, errors } = useForm({
        album_name: "",
    });

    // const submit = (e) => {
    //     e.preventDefault();
    //     post(route("collections.store"), { onSuccess: () => reset() });
    // };

    return (
        <AuthenticatedLayout auth={auth}>
            <Head title="All Albums" />
            <ExploreTabs />
            some sorting options right here and also in sidebar
            <h1 className="ml-2 mt-2 text-5xl font-normal hover:font-bold">
                all them albums go here
            </h1>
        </AuthenticatedLayout>
    );
}
