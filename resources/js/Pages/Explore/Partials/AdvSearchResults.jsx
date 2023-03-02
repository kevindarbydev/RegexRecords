import React from "react";
import Album from "../../Dashboard/Partials/Album";

export default function AdvSearchResults({ albums, collections }) {
    return (
        <>
            <h1 className="text-4xl m-4 mt-12">Search Results:</h1>
            <div className="p-4 sm:p-6 lg:p-8 ml-10">
                <div className="flex flex-row flex-wrap">
                    {albums.map((album) => (
                        <Album
                            key={album.id}
                            album={album}
                            collections={collections}
                        />
                    ))}
                </div>
            </div>
        </>
    );
}
