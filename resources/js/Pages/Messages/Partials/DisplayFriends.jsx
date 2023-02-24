import React from "react";

function DisplayFriends(friends) {
   

    function handleSendButtonClick(friend) {
        console.log(`Sending message to ${friend.name} (ID: ${friend.id})`);
    }

    return (
        <div>           
            {friends.length > 0 ? (
                <ul>
                    {friends.map((friend) => (
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
            )}
        </div>
    );
}

export default DisplayFriends;
