
import React, { useState } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import DisplayConvos from "./Partials/DisplayConvos";
import ChooseRecipientModal from "./Partials/ChooseRecipientModal";

function Index({ auth, friends, messages }) {
    
const [showModal, setShowModal] = useState(false);
const [users, setUsers] = useState([]);
     function handleCreateClick(event) {
         event.preventDefault();
         fetch("/messages/create")
             .then((response) => response.json())
             .then((data) => {
                 setUsers(data);
                 setShowModal(true);
             })
             .catch((error) => console.error(error));
     }
    
    return (
        <div>
            <AuthenticatedLayout auth={auth}>
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
                      <ChooseRecipientModal users={users} />
                    )}
                    <DisplayConvos friends={friends} messages={messages} />
                </div>
            </AuthenticatedLayout>
        </div>
    );
}
export default Index;
