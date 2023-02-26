import React, { useEffect, useState } from "react";
import Modal from "../../../components/Modal";
import axios from "axios";

function ConvoModal({ conversation, convoId }) {
    const [convo, setConvo] = useState(null);
    const [messages, setMessages] = useState(null);
    const [newMessage, setNewMessage] = useState("");
    
    useEffect(() => {
        fetch(`/messages/${convoId}`)
            .then((response) => response.json())
            .then((data) => {
                
                console.log("response data: " + data);
            })
            .catch((error) => {
                console.error("Response error: " + error);
            });
    }, [convoId]);
    console.dir(conversation.messages.messages);
    const msgs = conversation.messages.messages || {};
    //const messageKeys = Object.keys(msgs);
    
    // console.log("m" + messages.length);
    // console.log("MK " + messageKeys);
    const handleNewMessageChange = (e) => {
        setNewMessage(e.target.value);
    };

    const handleSubmit = (e) => {
         e.preventDefault();
         if (newMessage.trim() === "") {
             return; // message is empty, do not send
         }
      
        // Add the new message to the conversation's messages array        
       const newMessages = Array.isArray(messages)
           ? [...messages, { body: newMessage }]
           : [{ body: newMessage }];

        const newConversation = { ...conversation, messages: newMessages };
        axios
            .post(`/messages/${convoId}`, {
                message: newMessage,
                threadId: convoId,
            })
            .then(() => {
                setConvo(newConversation);
                setNewMessage("");
            })
            .catch((error) => {
                console.log(error);
            });
    };

    return (
        <div className="modal">
            <div className="modal-content">
                <h2 className="text-lg font-medium mb-4">Conversation</h2>

                {msgs.length > 0 ? (
                    <p className="text-gray-700 text-lg">
                        {msgs.map((key, index) => (
                            <p key={key}>
                                {msgs[index].body}|||{" "}
                                <span className="text-blue-500 opacity-75">
                                    {" "}
                                    sent at {msgs[index].created_at}{" "}
                                </span>
                            </p>
                        ))}
                    </p>
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
                        onChange={(e) => setNewMessage(e.target.value)}
                    />
                    <button className="bg-blue-500 text-white py-2 px-4 rounded ml-4">
                        Send
                    </button>
                </form>
            </div>
        </div>
    );
}

export default ConvoModal;
