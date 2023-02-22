function AdminAlbumTable({ albums }) {
    return (
        <table className="w-full whitespace-nowrap">
            <thead>
                <tr className="text-left font-medium text-gray-700 bg-gray-100">
                    <th className="px-6 py-4">Uploaded By</th>
                    <th className="px-6 py-4">Album Name</th>
                    <th className="px-6 py-4">Artist Name</th>
                    <th className="px-6 py-4">Genre</th>
                    <th className="px-8 py-4">Image</th>
                    <th className="px-6 py-4">Actions</th>
                </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
                {albums.map((album) => (
                    <tr key={album.id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">
                                {album.user.name}
                            </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">
                                {album.album_name}
                            </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">
                                {album.artist}
                            </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">
                                {album.genre}
                            </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                            <img
                                src={album.cover_image_url}
                                alt={album.album_name}
                                className="w-32 h-24 object-cover rounded"
                            />
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                            <a href="/">
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
                            </a>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}
export default AdminAlbumTable