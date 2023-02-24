import React from "react";
import Album from "../../Dashboard/Partials/Album";

export default function NewReleases({ recentAlbums, collections }) {
    return (
        <>
            <div className="p-4 sm:p-6 lg:p-8 ml-10">
                <div className="flex flex-row flex-wrap">
                    {recentAlbums.map((album) => (
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
