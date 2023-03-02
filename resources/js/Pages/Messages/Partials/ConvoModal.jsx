import React, { useEffect, useState } from "react";
import axios from "axios";

function ConvoModal({
    conversation,
    convoId,
    onClose,
    currentUserId,
    updateConversationList,
}) {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");

    useEffect(() => {
        function handleKeyDown(event) {
            if (event.keyCode === 27) {
                onClose();
            }
        }
        document.addEventListener("keydown", handleKeyDown);

        return () => {
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, []);

    useEffect(() => {
        setMessages(conversation.messages.messages);
    }, [conversation]);

    const handleNewMessageChange = (e) => {
        setNewMessage(e.target.value);
    };

    const handleDelete = (threadId) => {
        if (
            window.confirm("Are you sure you want to delete this conversation?")
        ) {
            axios
                .delete(`/messages/${threadId}`)
                .then((response) => {
                    console.log(response);
                    if (response.status === 200) {
                        location.reload();
                    }
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (newMessage.trim() === "") {
            return; // message is empty, do not send
        }

        axios
            .post(`/messages/${convoId}`, {
                message: newMessage,
                threadId: convoId,
            })
            .then((data) => {
                const updatedConversation = {
                    id: convoId,
                    messages: {
                        messages: [
                            ...conversation.messages.messages,
                            data.data,
                        ],
                    },
                    timeOfMsg: data.data.created_at,
                    mostRecentMessage: data.data.body,
                };
                // //not thrilled with this implementation but it works
                // //updating state and the conversation vars directly
                // //state is for the new msg to show in the modal right away,
                // //and without setting conversation.messages.messages directly here,
                // //the new messages would disappear without a page refresh
                updateConversationList(updatedConversation);
                conversation.messages.messages = [
                    ...conversation.messages.messages,
                    data.data,
                ];
                setMessages([...messages, data.data]);
                setNewMessage("");
            })
            .catch((error) => {
                console.log(error);
            });
    };

    return (
        <div className="modal">
            <div className="modal-content">
                <h2 className="text-lg font-medium mb-4 underline">
                    Conversation
                </h2>
                <div className="message-list h-64 overflow-y-auto">
                    {messages.length > 0 ? (
                        <div>
                            {messages.map((message, index) => (
                                <p
                                    className={`text-gray-700 text-lg ${
                                        message.user_id === currentUserId
                                            ? "text-right"
                                            : "text-left"
                                    }`}
                                    key={index}
                                >
                                    {message.body}{" "}
                                    <span className="text-blue-500 text-sm opacity-75">
                                        {new Date(
                                            message.created_at
                                        ).toLocaleString()}{" "}
                                    </span>
                                </p>
                            ))}
                        </div>
                    ) : (
                        <p className="text-gray-700 text-lg mt-4">
                            No messages found, send one now!
                        </p>
                    )}
                </div>
                <form onSubmit={handleSubmit}>
                    <input
                        className="border border-gray-300 p-2 rounded w-3/4 mb-4 mt-4"
                        type="text"
                        placeholder="Send a message..."
                        value={newMessage}
                        onChange={handleNewMessageChange}
                    />
                    <button className="bg-blue-500 text-white py-2 px-4 rounded ml-4">
                        Send
                    </button>
                </form>
                <p className="flex justify-evenly">
                    <a href="#" onClick={onClose}>
                        Close
                    </a>
                    <a
                        href="#"
                        className="text-red-600"
                        onClick={() => handleDelete(convoId)}
                    >
                        Delete Conversation
                    </a>
                </p>
            </div>
        </div>
    );
}

export default ConvoModal;
