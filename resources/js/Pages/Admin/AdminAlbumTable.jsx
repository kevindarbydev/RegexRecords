function AdminAlbumTable({ albums }) {
    return (
        <table className="w-full whitespace-nowrap">
            <thead>
                <tr className="text-left font-medium text-gray-700 bg-gray-100">
                    <th className="px-6 py-4">Uploaded By</th>
                    <th className="px-6 py-4">Album Name</th>
                    <th className="px-6 py-4">Artist Name</th>
                    <th className="px-6 py-4">Genre</th>
                    <th className="px-6 py-4">Image</th>
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
                                className="w-24 h-24 object-cover rounded"
                            />
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}
export default AdminAlbumTable