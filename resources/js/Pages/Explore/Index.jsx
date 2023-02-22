import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import Collection from "@/Components/Collection";
import InputError from "@/Components/InputError";
import PrimaryButton from "@/Components/PrimaryButton";
import { useForm, Head, Link } from "@inertiajs/react";
import ExploreTabs from "@/Components/Tabs/ExploreTabs";
import ApplicationLogo from "@/Components/ApplicationLogo";

export default function Index({ auth }) {
    return (
        <AuthenticatedLayout auth={auth}>
            <Head title="Explore" />
            <ExploreTabs />
            <h1 className="ml-2 mt-2 text-5xl font-normal hover:font-bold">
                hoping to implement carousels here
            </h1>

            <h1 className="ml-2 mt-2 text-4xl">Music to your ears</h1>
            <ApplicationLogo className=" w-40 h-40 animate-pulse rotate-180 hover:blur-lg" />

            <h1 className="ml-2 mt-2 text-4xl">
                Discover These Hot New Albums
            </h1>
            <ApplicationLogo className=" w-40 h-40 hover:animate-bounce" />

            <h1 className="ml-2 mt-2 text-4xl">Regex Spotlight: "D" Artists</h1>
            <ApplicationLogo className=" w-40 h-40 animate-spin-slow hover:animate-spin" />
        </AuthenticatedLayout>
    );
}
