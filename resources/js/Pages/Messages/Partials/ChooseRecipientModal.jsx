import React, { useState, useEffect } from "react";

function ChooseRecipientModal({ users, csrf, onClose }) {
    useEffect(() => {
        function handleKeyDown(event) {
            if (event.keyCode === 27) {
                onClose(); //closes modal window
            }
        }
        document.addEventListener("keydown", handleKeyDown);

        return () => {
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, []);

    function handleSelectUser(user, event) {
        event.preventDefault();
        var id = user.id;
        console.log("HERE");
        fetch(route("messages.store", { userId: id }), {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-CSRF-TOKEN": csrf,
            },
            body: JSON.stringify({ user_id: id }),
        })
            .then((response) => response.json())
            .then(onClose())
            .catch((error) => console.error(error));
    }
    return (
        <div className="modal">
            {users.length > 0 ? (
                <ul className="modal-content">
                    <h3 className="text-xl font-bold underline">
                        Choose a recipient
                    </h3>
                    {users.map((user) => (
                        <li key={user.id} className={"modalListItem"}>
                            <span className="mt-2">{user.name}</span>
                            <a
                                className="mt-2"
                                href="#"
                                onClick={(event) =>
                                    handleSelectUser(user, event)
                                }
                            >
                                +
                            </a>
                        </li>
                    ))}
                </ul>
            ) : (
                <p className="modal-content">
                    No Friends Found...{" "}
                    <span>
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
                                d="M15.182 16.318A4.486 4.486 0 0012.016 15a4.486 4.486 0 00-3.198 1.318M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75zm-.375 0h.008v.015h-.008V9.75zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75zm-.375 0h.008v.015h-.008V9.75z"
                            />
                        </svg>
                    </span>
                </p>
            )}
        </div>
    );
}
export default ChooseRecipientModal;
