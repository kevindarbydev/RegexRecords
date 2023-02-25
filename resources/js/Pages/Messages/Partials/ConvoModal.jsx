import React, { useEffect, useState } from "react";
import Modal from "../../../components/Modal";

function ConvoModal({ conversation, convoId }) {
    const [convo, setConvo] = useState(null);

    console.log(convoId);
    useEffect(() => {
        fetch(`/messages/${convoId}`)
            .then((response) => response.json())
            .then((data) => {
                setConvo(data);
            })
            .catch((error) => {
                console.error(error);
            });
    }, [convoId]);

    const messages = conversation.messages || {};
    const messageKeys = Object.keys(messages);
    return (
        <div className="modal">
            <p className="modal-content">
                <h3 className="text-xl font-bold underline">
                     Conversation
                </h3>
                {messageKeys.map((key) => (
                    <p key={key}>{messages[key].body}</p>
                ))}
            </p>
        </div>
    );
}

export default ConvoModal;
