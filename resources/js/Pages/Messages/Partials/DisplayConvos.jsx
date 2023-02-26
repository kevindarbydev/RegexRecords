import React, { useState } from "react";
import ConvoModal from "./ConvoModal";

function DisplayConvos({ messagesByConversation, conversations, auth }) {
    const [selectedConversation, setSelectedConversation] = useState(null);

    // Create a new array containing conversations with sender and recipient names and the most recent message
    const conversationsWithNames = conversations.map((convo) => {
        console.dir(messagesByConversation[convo.id].messages);
        console.log(messagesByConversation[convo.id].messages.length);
        let index = messagesByConversation[convo.id].messages.length - 1;
        if (index >= 0) {
            console.log(messagesByConversation[convo.id].messages[index].body);
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

        console.log(
            "This conversation has these names: " +
                senderName +
                "|||" +
                recipientName +
                ": " +
                mostRecentMessage
        );
        return {
            ...convo,
            sender: senderName,
            recipient: recipientName,
            mostRecentMessage: mostRecentMessage,
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
        <div>
            <div className="flex h-screen">
                <ul className="space-y-4">
                    {conversationsWithNames.map((convo) => (
                        <li key={convo.id}>
                            <a
                                href="javascript:void(0)"
                                className="convo-link"
                                onClick={(event) =>
                                    handleConversationClick(convo)
                                }
                            >
                                <div className="flex justify-between">
                                    <p className="text-blue-500">
                                        {convo.mostRecentMessage}
                                    </p>
                                    <span className="text-blue-600 opacity-75 self-end">
                                        {convo.sender === auth.user.name
                                            ? convo.recipient
                                            : convo.sender}
                                    </span>
                                </div>
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
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
