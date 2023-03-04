import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import DashCarousel from "./Dashboard/Partials/DashCarousel";

export default function LandingPage(props) {
    return (
        <AuthenticatedLayout
            auth={props.auth}
            errors={props.errors}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Landing Page
                </h2>
            }
            cartCount={props.cartCount}
        >
            <Head title="Home" />
            <div className="py-6">
                <div className="max-w-6xl mx-auto sm:px-5 lg:px-7">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg dark:bg-black">
                        <div className="p-4 text-lg text-gray-900 dark:text-white">
                            Welcome to Regex Records, {props.auth.user.name}!
                        </div>
                    </div>
                </div>
            </div>
            <DashCarousel />
        </AuthenticatedLayout>
    );
}
