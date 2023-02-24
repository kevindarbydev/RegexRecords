import React, { useState } from "react";

function DisplayConvos({ friends, messages, threads }) {
    console.log("Found threads user is in: " + threads);
      console.log(messages);

    return (
        <div>
            <div className="flex h-screen">
                <ul className="space-y-4">
                  
                    {/* {threads.map((thread) => (
                        <div key={thread.id}>
                            {thread.participants.map((participant) => (
                                <div key={participant.user.id}>
                                    <img
                                        src={participant.user.avatar}
                                        alt={participant.user.name}
                                    />
                                    <span>{participant.user.name}</span>
                                </div>
                            ))}
                            <span>{thread.messages.last().body}</span>
                        </div>
                    ))} */}
                </ul>
            </div>
        </div>
    );
}

export default DisplayConvos;

{
    /* {friends['friends'].length > 0 ? (
                <ul>
                    {friends['friends'].map((friend) => (
                        <li key={friend.id}>
                            <button
                                onClick={() => handleSendButtonClick(friend)}
                            >
                                Send message to {friend.name}
                            </button>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No friends found.</p>
            )} */

    {
        /* <div className="flex-1">
                                <h2 className="font-medium">John Doe</h2>
                                <p className="text-gray-500">
                                    Hey, how's it going?
                                </p>
                            </div>
                            <span className="text-sm text-gray-500">
                                2:30pm
                            </span>
                        </li>
                        <li className="flex items-center space-x-4">
                            <div className="flex-1">
                                <h2 className="font-medium">John Doe</h2>
                                <p className="text-gray-500">
                                    Hey, how's it going?
                                </p>
                            </div>
                            <span className="text-sm text-gray-500">
                                2:30pm
                            </span>
                        </li>
                        <li className="flex items-center space-x-4">
                            <div className="flex-1">
                                <h2 className="font-medium">John Doe</h2>
                                <p className="text-gray-500">
                                    Hey, how's it going?
                                </p>
                            </div>
                            <span className="text-sm text-gray-500">
                                2:30pm
                            </span>*/
    }

    // {messages && messages.length > 0 ? (
    //                         messages.map((message) => (
    //                             <li
    //                                 key={message.id}
    //                                 className="flex items-center space-x-4"
    //                             >
    //                                 {/* <img
    //                                     src="/avatar.jpg"
    //                                     alt="Avatar"
    //                                     className="w-8 h-8 rounded-full"
    //                                 /> 
    //                                 <div className="flex-1">
    //                                     <h2 className="font-medium">
    //                                         {message.sender.name}
    //                                     </h2>
    //                                     <p className="text-gray-500">
    //                                         {message.body}
    //                                     </p>
    //                                 </div>
    //                                 <span className="text-sm text-gray-500">
    //                                     {message.created_at}
    //                                 </span>
    //                             </li>
    //                         ))
    //                     ) : (
    //                         <p>No messages found.</p>
    //                     )} 
}
