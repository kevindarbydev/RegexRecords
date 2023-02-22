import { Head } from "@inertiajs/react";
import { useState } from "react";
import AdminUserTable from "./Partials/AdminUserTable";
import AdminAlbumTable from "./Partials/AdminAlbumTable";
import AdminMessageTable from "./Partials/AdminMessageTable";
import AdminReviewTable from "./Partials/AdminReviewTable";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

function AdminPage({ auth, users, albums }) {
    //TODO: CSRF token
    const [currentTable, setCurrentTable] = useState("users");

    const handleTableChange = (newTable) => {
        setCurrentTable(newTable);
    };

    let currentTableComponent;
    if (currentTable === "users") {
        currentTableComponent = <AdminUserTable users={users} />;
    } else if (currentTable === "albums") {
        currentTableComponent = <AdminAlbumTable albums={albums} />;
    } else if (currentTable === "messages") {
        currentTableComponent = <AdminMessageTable />;
    } else if (currentTable === "reviews") {
        currentTableComponent = <AdminReviewTable />;
    }

    return (
        <AuthenticatedLayout auth={auth}>
            <div className="flex justify-center">
                <Head title="Admin Interface" />
                <div className="flex flex-col w-full max-w-md">
                    <div className="flex justify-between mb-4">
                        <button
                            className={`py-2 px-4 text-sm font-medium focus:outline-none ${
                                currentTable === "users"
                                    ? "bg-gray-100"
                                    : "bg-white"
                            }`}
                            onClick={() => handleTableChange("users")}
                        >
                            Users
                        </button>
                        <button
                            className={`py-2 px-4 text-sm font-medium focus:outline-none ${
                                currentTable === "users"
                                    ? "bg-gray-100"
                                    : "bg-white"
                            }`}
                            onClick={() => handleTableChange("reviews")}
                        >
                            Reviews
                        </button>
                        <button
                            className={`py-2 px-4 text-sm font-medium focus:outline-none ${
                                currentTable === "users"
                                    ? "bg-gray-100"
                                    : "bg-white"
                            }`}
                            onClick={() => handleTableChange("messages")}
                        >
                            Messages
                        </button>

                        <button
                            className={`py-2 px-4 text-sm font-medium focus:outline-none ${
                                currentTable === "albums"
                                    ? "bg-gray-100"
                                    : "bg-white"
                            }`}
                            onClick={() => handleTableChange("albums")}
                        >
                            Albums
                        </button>
                    </div>
                    {currentTableComponent}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
export default AdminPage;
