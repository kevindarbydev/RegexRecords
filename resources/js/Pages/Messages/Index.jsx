
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import DisplayFriends from "./Partials/DisplayFriends";

function Index({ auth, friends }) {
    return (
    <AuthenticatedLayout auth={auth}>
        <h3>Messages</h3>
        <DisplayFriends friends={friends} />
    </AuthenticatedLayout>
);
}
export default Index;
