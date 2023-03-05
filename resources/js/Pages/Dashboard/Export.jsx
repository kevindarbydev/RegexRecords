import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import DashboardTabs from "@/Layouts/Tabs/DashboardTabs";
import PrimaryButton from "@/Components/PrimaryButton";

export default function Index({ auth, cartCount }) {
    // const { data, setData, post, processing, reset, errors, get } = useForm({});
    // const exportToCSV = (e) => {
    //     e.preventDefault();
    //     post(route("dashboard.export.post"));
    // };
    return (
        <AuthenticatedLayout auth={auth} cartCount={cartCount}>
            <Head title="Export" />
            <DashboardTabs />
            <h1 className="text-4xl m-4">Export:</h1>
            {/* <form onSubmit={exportToCSV}> */}
            <Link href={route("dashboard.export.post")} method="post">
                {/* <PrimaryButton
                    className="mb mr-5"
                    // processing={processing}
                    // onClick={exportToCSV}
                >
                    Export
                </PrimaryButton> */}
                Export
            </Link>
            {/* </form> */}
        </AuthenticatedLayout>
    );
}
