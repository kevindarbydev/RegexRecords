import React from "react";


function ConvoModal({ conversation }) {
    return (
        <Modal>
            <div className="convo-modal">
                {conversation.messages.map((message) => (
                    <p key={message.id}>{message.body}</p>
                ))}
            </div>
        </Modal>
    );
}

export default ConvoModal;
