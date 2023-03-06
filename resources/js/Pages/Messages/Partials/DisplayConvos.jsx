import React, { useState, useEffect } from "react";
import ConvoModal from "./ConvoModal";

function DisplayConvos({
    messagesByConversation,
    conversations,
    auth,
    currentUserId,
}) {
    const [selectedConversation, setSelectedConversation] = useState(null);
    const [conversationsWithNames, setConversationsWithNames] = useState([]);

    useEffect(() => {
        const updatedConversationsWithNames = processConversationsWithNames(
            conversations,
            messagesByConversation
        );
        setConversationsWithNames(updatedConversationsWithNames);
    }, [conversations, messagesByConversation]);

    function handleModalClose() {
        setSelectedConversation(null);
    }

    function updateConversationList(newConversation) {
        setConversationsWithNames((prevConversations) => {
            return prevConversations.map((convo) => {
                if (convo.id === newConversation.id) {
                    return {
                        ...convo,
                        mostRecentMessage: newConversation.mostRecentMessage,
                        timeOfMsg: newConversation.timeOfMsg,
                    };
                }
                return convo;
            });
        });
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
                {conversationsWithNames.map((convo) =>
                    convo.mostRecentMessage ? (
                        <li key={convo.id}>
                            <a
                                href="javascript:void(0)"
                                className="convo-link"
                                onClick={() => handleConversationClick(convo)}
                            >
                                <div className="flex">
                                    {/* <p className="text-blue-500">
                                        {convo.mostRecentMessage}
                                    </p> */}
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
                    ) : (convo.recipient !== null && convo.recipient != "") ? (
                        <li className="text-blue-500 opacity-60" key={convo.id}>
                            <a
                                href="javascript:void(0)"
                                className="convo-link"
                                onClick={() => handleConversationClick(convo)}
                            >
                                No messages with {convo.recipient}
                            </a>
                        </li>
                    ) : null
                )}
            </ul>

            {/* Render the conversation modal */}
            {selectedConversation && (
                <ConvoModal
                    auth={auth}
                    conversation={selectedConversation}
                    convoId={selectedConversation.id}
                    onClose={handleModalClose}
                    currentUserId={currentUserId}
                    updateConversationList={updateConversationList}
                />
            )}
        </div>
    );
}

export default DisplayConvos;

function processConversationsWithNames(conversations, messagesByConversation) {
    return conversations.map((convo) => {
        const senderName = messagesByConversation[convo.id]?.sender || "";
        const recipientName = messagesByConversation[convo.id]?.recipient || "";
        const messages = messagesByConversation[convo.id]?.messages || [];

        const mostRecentMessage =
            messages.reduce((prev, current) => {
                return new Date(prev.created_at) > new Date(current.created_at)
                    ? prev
                    : current;
            }, {}).body || "";

        const timeOfMsg = messages[messages.length - 1]?.created_at;

        return {
            ...convo,
            sender: senderName,
            recipient: recipientName,
            mostRecentMessage: mostRecentMessage,
            timeOfMsg: timeOfMsg,
        };
    });
}
