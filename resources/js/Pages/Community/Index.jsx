import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { useForm, Head, Link } from "@inertiajs/react";
import CommunityTabs from "@/Components/Tabs/CommunityTabs";

export default function Index({ auth, albums }) {
    const { data, setData, post, processing, reset, errors } = useForm({
        album_name: "",
    });

    // const submit = (e) => {
    //     e.preventDefault();
    //     post(route("collections.store"), { onSuccess: () => reset() });
    // };

    return (
        <AuthenticatedLayout auth={auth}>
            <Head title="Community" />
            <CommunityTabs />
        </AuthenticatedLayout>
    );
}
