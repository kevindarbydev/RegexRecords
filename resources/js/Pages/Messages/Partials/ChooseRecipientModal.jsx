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
                            onClick={(event) => handleSelectUser(user, event)}
                        >
                            +
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    );
}
export default ChooseRecipientModal;
