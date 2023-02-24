import React, { useState } from "react";

function ChooseRecipientModal({ users, csrf }) {
     console.log(csrf);
    function handleSelectUser(user) {       
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
            .then((data) => {
                console.log("New conversation created:", data);
            })
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
                            href={route("messages.store", user.id)}
                           
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
