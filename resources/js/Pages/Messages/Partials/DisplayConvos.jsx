import React, { useState } from "react";
import ConvoModal from "./ConvoModal";

function DisplayConvos({
    messagesByConversation,
    conversations,
    auth,
    currentUserId,
}) {
    const [selectedConversation, setSelectedConversation] = useState(null);
    const [convos, setConvos] = useState(conversations);

    const conversationsWithNames = processConversationsWithNames(
        conversations,
        messagesByConversation
    );
    console.dir(conversationsWithNames);  

    function handleModalClose() {
        setSelectedConversation(null);
    }
    // function updateConversationList(newConversation) {
    //     console.log("received data!");
    //     console.dir(newConversation.messages);
    //     console.log("convo state before operations\n");
    //     console.dir(convos);

    //     const conversationIndex = convos.findIndex(
    //         (conversation) => conversation.id === newConversation.id
    //     );
    //     const updatedConvo = { ...newConversation }; // make a copy of newConversation
    //     if (conversationIndex !== -1) {
    //         // if the conversation already exists in convos
    //         convos.splice(conversationIndex, 1); // remove the conversation from convos
    //     }

    //     // add the updated conversation to the front of convos
    //     setConvos([
    //         updatedConvo,
    //         ...convos.filter(
    //             (conversation) => conversation.id !== updatedConvo.id
    //         ),
    //     ]);
    //     console.log("convo state after operations\n");
    //     console.dir(convos);
    // }


    function updateConversationList(newConversation) {
        console.log("received data!");
        console.dir(newConversation.messages);
        console.log("convo state before operations\n");
        console.dir(convos);

        const conversationIndex = convos.findIndex(
            (conversation) => conversation.id === newConversation.id
        );
        const updatedConvo = { ...newConversation }; // make a copy of newConversation
        let newConvos = [];

        if (conversationIndex !== -1) {
            // if the conversation already exists in convos
            newConvos = [
                updatedConvo,
                ...convos.slice(0, conversationIndex),
                ...convos.slice(conversationIndex + 1),
            ];
        } else {
            // add the updated conversation to the front of convos
            newConvos = [updatedConvo, ...convos];
        }

        setConvos(newConvos);

        console.log("convo state after operations\n");
        console.dir(convos);
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
                    ) : (
                        <li className="text-blue-500 opacity-60" key={convo.id}>
                            <a
                                href="javascript:void(0)"
                                className="convo-link"
                                onClick={() => handleConversationClick(convo)}
                            >
                                No messages with {convo.recipient}
                            </a>
                        </li>
                    )
                )}
            </ul>

            {/* Render the conversation modal */}
            {selectedConversation && (
                <ConvoModal
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
