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
        <div className="w-full bg-white rounded-lg shadow">
            <ul className="divide-y divide-gray-300">
                {conversationsWithNames.map((convo) =>
                    convo.mostRecentMessage ? (
                        <li
                            key={convo.id}
                            className="cursor-pointer hover:bg-gray-100 transition duration-150 ease-in-out"
                        >
                            <a
                                href="#"
                                className="block px-4 py-3"
                                onClick={() => handleConversationClick(convo)}
                            >
                                <div className="flex justify-between">
                                    <div className="flex flex-col">
                                        <h3 className="font-bold text-gray-800">
                                            {convo.sender === auth.user.name
                                                ? convo.recipient
                                                : convo.sender}
                                        </h3>
                                        <p className="text-gray-600">
                                            {convo.mostRecentMessage}
                                        </p>
                                    </div>
                                    <div className="text-gray-600 text-sm">
                                        {new Date(
                                            convo.timeOfMsg
                                        ).toLocaleString()}
                                    </div>
                                </div>
                            </a>
                        </li>
                    ) : convo.recipient !== null && convo.recipient != "" && convo.recipient != auth.user.name ? (
                        <li
                            key={convo.id}
                            className="cursor-pointer hover:bg-gray-100 transition duration-150 ease-in-out"
                        >
                            <a
                                href="javascript:void(0)"
                                className="block px-4 py-3"
                                onClick={() => handleConversationClick(convo)}
                            >
                                <div className="flex justify-between">
                                    <div className="flex flex-col">
                                        <h3 className="font-bold text-gray-800">
                                            {convo.recipient}
                                        </h3>
                                        <p className="text-gray-600">
                                            No messages with {convo.recipient}
                                        </p>
                                    </div>
                                </div>
                            </a>
                        </li>
                    ) : <li
                        key={convo.id}
                        className="cursor-pointer hover:bg-gray-100 transition duration-150 ease-in-out"
                    >
                        <a
                            href="javascript:void(0)"
                            className="block px-4 py-3"
                            onClick={() => handleConversationClick(convo)}
                        >
                            <div className="flex justify-between">
                                <div className="flex flex-col">
                                    <h3 className="font-bold text-gray-800">
                                        {convo.sender}
                                    </h3>
                                    <p className="text-gray-600">
                                        No messages with {convo.sender}
                                    </p>
                                </div>
                            </div>
                        </a>
                    </li>
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
