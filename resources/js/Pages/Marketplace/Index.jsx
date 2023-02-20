import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import Collection from "@/Components/Collection";
import InputError from "@/Components/InputError";
import PrimaryButton from "@/Components/PrimaryButton";
import { useForm, Head, Link } from "@inertiajs/react";
import MarketplaceTabs from "@/Components/Tabs/MarketplaceTabs";

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
            <Head title="Marketplace" />
            <MarketplaceTabs />
        </AuthenticatedLayout>
    );
}
