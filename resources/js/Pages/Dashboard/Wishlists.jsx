import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import Wishlist from "@/Pages/Dashboard/Partials/Wishlist";
import InputError from "@/Components/InputError";
import PrimaryButton from "@/Components/PrimaryButton";
import { useForm, Head } from "@inertiajs/react";
import DashboardTabs from "@/Components/Tabs/DashboardTabs";

export default function Index({ auth, wishlists }) {
    const { data, setData, post, processing, reset, errors } = useForm({
        list_name: "",
    });

    const submit = (e) => {
        e.preventDefault();
        post(route("wishlists.store"), { onSuccess: () => reset() });
    };

    return (
        <AuthenticatedLayout auth={auth}>
            <DashboardTabs />
            <Head title="Create Wishlist" />
            <div className="max-w-2xl mx-auto p-4 sm:p-6 lg:p-8">
                <form name="createForm" onSubmit={submit}>
                    <div className="flex flex-col">
                        <div className="mb-4">
                            <label className="">Wishlist Title</label>
                            <input
                                type="text"
                                className="w-full px-4 py-2"
                                label="Wishlist Name"
                                name="list_name"
                                value={data.list_name}
                                onChange={(e) =>
                                    setData("list_name", e.target.value)
                                }
                            />
                            <InputError
                                message={errors.list_name}
                                className="mt-2"
                            />
                        </div>
                    </div>
                    <div className="mt-4">
                        <button
                            type="submit"
                            className="px-6 py-2 font-bold text-white bg-green-500 rounded"
                        >
                            Create Wishlist
                        </button>
                    </div>
                </form>
                <div className="mt-6 bg-white shadow-sm rounded-lg divide-y">
                    {wishlists.map((wishlist) => (
                        <Wishlist key={wishlist.id} wishlist={wishlist} />
                    ))}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
