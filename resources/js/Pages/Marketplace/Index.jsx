import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import Collection from "@/Components/Collection";
import InputError from "@/Components/InputError";
import PrimaryButton from "@/Components/PrimaryButton";
import { useForm, Head, Link } from "@inertiajs/react";
import MarketplaceTabs from "@/Components/Tabs/DashboardTabs";

export default function Index({ auth, marketplace }) {
    return (
        <>
            <AuthenticatedLayout auth={auth}>
                <Head title="Marketplace" />
                <MarketplaceTabs />
                Marketplace stuff
            </AuthenticatedLayout>
        </>
    );
}
