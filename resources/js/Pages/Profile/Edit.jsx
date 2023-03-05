import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import DeleteUserForm from "./Partials/DeleteUserForm";
import UpdatePasswordForm from "./Partials/UpdatePasswordForm";
import UpdateProfileInformationForm from "./Partials/UpdateProfileInformationForm";
import { Head } from "@inertiajs/react";
import PrimaryButton from "@/Components/PrimaryButton";

export default function Edit({ auth, mustVerifyEmail, status, user, cartCount }) {
    const isEmailVerified = user.email_verified_at !== null;
    return (
        <AuthenticatedLayout
            auth={auth}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Profile
                </h2>
            }
            cartCount={cartCount}
        >
            <Head title="Profile" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    {isEmailVerified ? (
                        <>
                            <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                                <UpdateProfileInformationForm
                                    mustVerifyEmail={mustVerifyEmail}
                                    status={status}
                                    className="max-w-xl"
                                />
                            </div>

                            <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                                <UpdatePasswordForm className="max-w-xl" />
                            </div>
                        </>
                    ) : (
                        <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                            <p className="text-lg text-gray-800 leading-tight">
                                Please verify your email address to update your
                                profile information and password.
                            </p>
                        </div>
                    )}

                    <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                        <DeleteUserForm className="max-w-xl" />
                    </div>

                    {user.is_admin ? (
                        <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                            <h3 className="text-lg text-gray-800 leading-tight">
                                Admin Panel
                            </h3>
                            <a href={route("admin.index")}>
                                <PrimaryButton className="mt-4 bg-blue-500">
                                    Go to admin page
                                </PrimaryButton>
                            </a>
                        </div>
                    ) : (
                        <div></div>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
