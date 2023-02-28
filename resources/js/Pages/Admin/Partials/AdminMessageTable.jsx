import React, { useState } from "react";

function AdminMessageTable(messages) {
    return (
        <div>
            <h3 className="">Manage Messages</h3>
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
                            Sent at
                        </th>
                        <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Actions
                        </th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                   
                </tbody>
            </table>
        </div>
    );
}
export default AdminMessageTable;

