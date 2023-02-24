import React, { useState } from "react";

function ChooseRecipientModal({ users }) {
   
    return (
        <div className="modal">
            <ul className="modal-content">
                <h3 className="text-xl font-bold underline">
                    Choose a recipient
                </h3>
                {users.map((user) => (
                    <li key={user.id} className={"modalListItem"}>
                        <span>{user.name}</span>
                        <button onClick={() => handleSelectUser(user)}>
                            +
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}
export default ChooseRecipientModal;
