
import React, { useState, useEffect } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import DisplayConvos from "./Partials/DisplayConvos";
import ChooseRecipientModal from "./Partials/ChooseRecipientModal";
import { Head } from "@inertiajs/react";


function Index({
    auth,
    friends,
    messagesByConversation,
    conversations,
    errors,
    success,
}) {
    //TODO:
    /*
    implement something so that when 'esc' key is pressed, modal closes
    disallow multiple conversations to start w the same person
    */
    const [showModal, setShowModal] = useState(false);
    const [users, setUsers] = useState([]);
    const [csrfToken, setCsrfToken] = useState("");


     function handleModalClose() {
         setShowModal(false);
         location.reload();
     }

    

    useEffect(() => {
        // Fetch the CSRF token from the server and store it in state
        fetch("/csrf-token")
            .then((response) => response.json())
            .then((data) => setCsrfToken(data.csrfToken))
            .catch((error) => console.error(error));
    }, []);
    if (csrfToken !== "") {
        console.log("Csrf token: " + csrfToken);
    }

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
            <Head title="Messages" />;
            <AuthenticatedLayout auth={auth}>
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
                <div className="w-1/4 h-1/2 bg-gray-100  px-4 py-8">
                    <h1 className="font-medium text-lg mb-4">
                        Conversations{" "}
                        <span>
                            <a
                                href={route("messages.create")}
                                onClick={handleCreateClick}
                            >
                                {" "}
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke="currentColor"
                                    className="w-6 h-6"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M12 4.5v15m7.5-7.5h-15"
                                    />
                                </svg>
                            </a>
                        </span>
                    </h1>
                    {showModal && (
                        <ChooseRecipientModal users={users} csrf={csrfToken} onClose={handleModalClose} />
                    )}
                    <DisplayConvos
                        friends={friends}
                        messagesByConversation={messagesByConversation}
                        conversations={conversations}
                        auth={auth}
                    />
                </div>
            </AuthenticatedLayout>
        </div>
    );
}
export default Index;
