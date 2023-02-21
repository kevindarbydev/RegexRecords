import { Head } from "@inertiajs/react";
import AdminUserTable from "./AdminUserTable";

function AdminPage() {
    const users = [
        { id: 1, name: "Alice", email: "alice@example.com", role: "admin" },
        { id: 2, name: "Bob", email: "bob@example.com", role: "user" },
        { id: 3, name: "Charlie", email: "charlie@example.com", role: "user" },
    ];

    return (
        <div>
            <Head title="Admin Interface" />
            <AdminUserTable users={users} />
        </div>
    );
}
export default AdminPage;
