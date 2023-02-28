import React, { useEffect, useState } from "react";
import axios from "axios";

function ConvoModal({
    conversation,
    convoId,
    onClose,
    currentUserId,
    updateConversationList,
}) {
    const [convo, setConvo] = useState(conversation);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");

    useEffect(() => {
        function handleKeyDown(event) {
            if (event.keyCode === 27) {
                onClose(convo);               
            }
        }

        document.addEventListener("keydown", handleKeyDown);

        return () => {
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, []);

 
    useEffect(() => {
        setMessages(conversation.messages.messages);
        setConvo(conversation);
    }, [conversation]);

    const handleNewMessageChange = (e) => {
        setNewMessage(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (newMessage.trim() === "") {
            return; // message is empty, do not send
        }

        // Add the new message to the components's messages array
        const newMessages = Array.isArray(messages)
            ? [...messages, { body: newMessage }]
            : [{ body: newMessage }];

        // const newConversation = { ...conversation, messages: newMessages };
        axios
            .post(`/messages/${convoId}`, {
                message: newMessage,
                threadId: convoId,
            })
            .then((data) => {
               
                
               
                const updatedConversation = {          
                    id:convoId,          
                    messages: data.data,
                    timeOfMsg: data.data[data.data.length - 1].created_at,
                    mostRecentMessage: data.data[data.data.length - 1].body,
                };
                //setMessages([...messages, updatedConversation.mostRecentMessage]);                 
                updateConversationList(updatedConversation);        
                setMessages(data.data);        
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
                <p>
                    <a href="#" onClick={onClose}>
                        Close
                    </a>
                </p>
            </div>
        </div>
    );
}

export default ConvoModal;
