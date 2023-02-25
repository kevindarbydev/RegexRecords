import React, { useState } from "react";

function DisplayConvos({ friends, messages, conversations }) {
    console.log("Found threads user is in: " + conversations);
    

    return (
        <div>
            <div className="flex h-screen">
                <ul className="space-y-4">
                    {conversations.map((convo) => (
                        <li key={convo.id}>
                          
                              
                            <p className="text-blue-500">hello <span className="text-blue-600 opacity-75">Sender name</span> </p>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default DisplayConvos;