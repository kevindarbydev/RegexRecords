import React from "react";

function FriendDetails({ friend }) {
    return (
        <>
            <div>Friend Id: {friend.id}</div>
            <div>Friend Name: {friend.name}</div>
            <div>Friend Email: {friend.email}</div>
        </>
    );
}

export default FriendDetails;
