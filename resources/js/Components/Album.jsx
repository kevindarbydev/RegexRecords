import React from "react";

export default function Album({ album }) {
    return (
        <div className="p-6 flex space-x-2">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-gray-600 -scale-x-100"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                />
            </svg>
            <div className="flex-1">
                <div className="flex justify-between items-center">
                    <div>
                        <span className="text-gray-800">{album.user.name}</span>
                        <small className="ml-2 text-sm text-gray-600">
                            {new Date(album.created_at).toLocaleString()}
                        </small>
                    </div>
                </div>
                <p className="mt-4 text-lg text-gray-900">{album.album_name}</p>
                <p className="mt-4 text-lg text-gray-900">{album.artist}</p>
                <p className="mt-4 text-lg text-gray-900">{album.value}</p>
            </div>
        </div>
    );
}
