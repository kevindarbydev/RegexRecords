import React, { useState } from "react";
import ConvoModal from "./ConvoModal";

function DisplayConvos({ messagesByConversation, conversations, auth }) {
    const [selectedConversation, setSelectedConversation] = useState(null);

    // Create a new array containing conversations with sender and recipient names and the most recent message
    const conversationsWithNames = conversations.map((convo) => {    
        let index = messagesByConversation[convo.id].messages.length - 1;
        if (index >= 0) {
            console.log(messagesByConversation[convo.id].messages[index].body); //should b the most recent msg in the conversation
        }

        const senderName = messagesByConversation[convo.id]?.sender || "";
        const recipientName = messagesByConversation[convo.id]?.recipient || "";

        const mostRecentMessage =
            messagesByConversation[convo.id]?.messages?.reduce(
                (prev, current) => {
                    return new Date(prev.created_at) >
                        new Date(current.created_at)
                        ? prev
                        : current;
                },
                {}
            ).body || "";
        
            const timeOfMsg =
                messagesByConversation[convo.id]?.messages[index]?.created_at;

            console.log(
                "This conversation has these names: " +
                    senderName +
                    "," +
                    recipientName +
                    " AND most recent msg: " +
                    mostRecentMessage +
                    ", at time: " +
                    timeOfMsg
            );
        
        return {
            ...convo,
            sender: senderName,
            recipient: recipientName,
            mostRecentMessage: mostRecentMessage,
            timeOfMsg: timeOfMsg,
        };
    });

    function handleModalClose() {
        setSelectedConversation(null);
    }

    function handleConversationClick(convo) {
        let selectedId = convo.id;
        let messages = messagesByConversation[selectedId];
        setSelectedConversation({
            ...convo,
            messages: messages || [],
        });
    }

    return (
        <div className="flex">
           
                <ul className="space-y-4">
                    {conversationsWithNames.map((convo) => (
                        <li key={convo.id}>
                            <a
                                href="javascript:void(0)"
                                className="convo-link"
                                onClick={() => handleConversationClick(convo)}
                            >
                                <div className="flex">
                                    <p className="text-blue-500">
                                        {convo.mostRecentMessage}
                                    </p>
                                    .
                                    <span className="text-blue-500 opacity-60">
                                        {convo.sender === auth.user.name
                                            ? convo.recipient
                                            : convo.sender}
                                    </span>
                                    |
                                    <span className="text-blue-500 opacity-60">
                                        {new Date(
                                            convo.timeOfMsg
                                        ).toLocaleString()}{" "}
                                    </span>
                                </div>
                            </a>
                        </li>
                    ))}
                </ul>
            
            {/* Render the conversation modal */}
            {selectedConversation && (
                <ConvoModal
                    conversation={selectedConversation}
                    convoId={selectedConversation.id}
                    onClose={handleModalClose}
                />
            )}
        </div>
    );
}

export default DisplayConvos;
