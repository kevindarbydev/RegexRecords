import React, { useState } from "react";
import ConvoModal from "./ConvoModal";
function DisplayConvos({    
    messagesByConversation,
    conversations,
    auth,
}) {
    const [selectedConversation, setSelectedConversation] = useState(null);
    console.log("Found threads user is in: " + conversations);
    console.dir(messagesByConversation);

    // Create a new array containing conversations with sender and recipient names
    const conversationsWithNames = conversations.map((convo) => {
        const senderName = messagesByConversation[convo.id]?.sender || "";
        const recipientName = messagesByConversation[convo.id]?.recipient || "";
        console.log(
            "This conversation has these names: " +
                senderName +
                "|||" +
                recipientName
        );
        return {
            ...convo,
            sender: senderName,
            recipient: recipientName,
        };
    });

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
                                <p className="text-blue-500">
                                    no messages yet....
                                    <span className="text-blue-600 opacity-75">
                                        {convo.sender === auth.user.name
                                            ? convo.recipient
                                            : convo.sender}
                                    </span>{" "}
                                </p>
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
            {/* Render the conversation modal */}
            {selectedConversation && (
                <ConvoModal conversation={selectedConversation} convoId={selectedConversation.id} />
            )}
        </div>
    );
}

export default DisplayConvos;