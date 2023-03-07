import React, { useState, useEffect } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import DisplayConvos from "./Partials/DisplayConvos";
import ChooseRecipientModal from "./Partials/ChooseRecipientModal";
import CommunityTabs from "@/Layouts/Tabs/CommunityTabs";
import { Head } from "@inertiajs/react";

function Index({
    auth,
    friends,
    messagesByConversation,
    conversations,
    errors,
    success,
    currentUserId,
    newConvo,
    cartCount,
}) {
    const [showModal, setShowModal] = useState(false);
    const [users, setUsers] = useState([]);
    const [csrfToken, setCsrfToken] = useState("");

    function handleModalClose() {
        setShowModal(false);
    }
    function onCreateConversation() {
        setShowModal(false);
        location.reload(); //reloading to show conversation, may improve later (use state instead)
    }
  

    useEffect(() => {
        // Fetch the CSRF token from the server and store it in state
        fetch("/csrf-token")
            .then((response) => response.json())
            .then((data) => setCsrfToken(data.csrfToken))
            .catch((error) => console.error(error));
    }, []);

    function handleCreateClick(event) {
        event.preventDefault();
        fetch("/messages/create", {
            headers: {
                "X-CSRF-TOKEN": csrfToken,
            },
        })
            .then((response) => response.json())
            .then((data) => {
                setUsers(data);
                setShowModal(true);
            })
            .catch((error) => console.error(error));
    }

    return (
        <div>
            <Head title="Messages" />

            <AuthenticatedLayout auth={auth} cartCount={cartCount}>
                <CommunityTabs />
                {errors && (
                    <div className="alert alert-danger">
                        {Object.values(errors).map((error, index) => (
                            <div key={index}>{error}</div>
                        ))}
                    </div>
                )}
                {success && (
                    <div className="alert alert-success">{success}</div>
                )}
                <div className="w-3/4 lg:w-1/4 h-fit bg-gray-200 px-4 py-8 ">
             
                    <h1
                        className="font-medium text-lg mb-4"
                        style={{ display: "flex", alignItems: "center" }}
                    >
                        Conversations &nbsp;&nbsp;
                        <span style={{ display: "flex", alignItems: "center" }}>
                            <a
                                href={route("messages.create")}
                                onClick={handleCreateClick}
                                className="inline-block rounded bg-primary px-6 pt-2.5 pb-2 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]"
                                data-te-toggle="tooltip"
                                data-te-placement="right"
                                data-te-ripple-init
                                data-te-ripple-color="light"
                                title="Start a new message thread"
                            >
                                {" "}
                                ➕
                            </a>
                        </span>
                    </h1>
                    {showModal && (
                        <ChooseRecipientModal
                            users={users}
                            csrf={csrfToken}
                            onClose={handleModalClose}
                            onCreateConversation={onCreateConversation}
                        />
                    )}
                    <DisplayConvos
                        friends={friends}
                        messagesByConversation={messagesByConversation}
                        conversations={conversations}
                        auth={auth}
                        currentUserId={currentUserId}
                    />
                </div>
            </AuthenticatedLayout>
        </div>
    );
}
export default Index;
