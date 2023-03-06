import React, { useState } from "react";
import AdminDeleteButton from "./AdminDeleteButton";
function AdminMessageTable({ messages, csrf }) {
    const [messageList, setMessageList] = useState(messages || []);
    
    const handleDelete = async (messageId) => {
   
        if (window.confirm("Are you sure you want to delete this message?")) {
            try {
                const response = await fetch(`/admin/messages/${messageId}`, {
                    method: "DELETE",
                    headers: {
                        "X-CSRF-TOKEN": csrf,
                    },
                });
                if (response.ok) {
              
                    setMessageList(
                        messageList.filter((m) => m.id !== messageId)
                    );
                } else {
         
                }
            } catch (error) {
             
            }
        }
    };

    return (
        <div className="my-4 text-center">
            <h3 className="text-lg font-semibold mb-4 ">Manage Messages</h3>

            <table className="table-auto w-full text-left divide-y divide-gray-200 shadow overflow-hidden sm:rounded-lg">
                <thead className="bg-gray-50">
                    <tr>
                        <th
                            scope="col"
                            className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                            Content
                        </th>
                        <th
                            scope="col"
                            className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                            Sent By
                        </th>
                        <th
                            scope="col"
                            className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                            Thread ID
                        </th>
                        <th
                            scope="col"
                            className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                            Sent at
                        </th>
                        <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Actions
                        </th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {messageList.map((message) => (
                        <tr key={message.id}>
                            <td className="px-6 py-4 whitespace-wrap">
                                <div className="text-sm text-gray-900">
                                    {message.body}
                                </div>
                            </td>
                            <td className="px-6 py-4 whitespace-wrap">
                                <div className="text-sm text-gray-900">
                                    {message.user_id}
                                </div>
                            </td>
                            <td className="px-6 py-4 whitespace-wrap">
                                <div className="text-sm text-gray-900">
                                    {message.thread_id}
                                </div>
                            </td>
                            <td className="px-6 py-4 whitespace-wrap">
                                <div className="text-sm text-gray-900">
                                    {new Date(
                                        message.created_at
                                    ).toLocaleString()}
                                </div>
                            </td>
                            <td className="px-6 py-4 whitespace-wrap">
                                <button
                                    type="submit"
                                    onClick={() => handleDelete(message.id)}
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth={1.5}
                                        stroke="currentColor"
                                        className="w-6 h-6"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                                        />
                                    </svg>
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
export default AdminMessageTable;

<td className="px-6 py-4 whitespace-nowrap"></td>;
