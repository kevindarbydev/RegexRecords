import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import InputError from "@/Components/InputError";
import PrimaryButton from "@/Components/PrimaryButton";
import { useForm, Head } from "@inertiajs/react";
import Album from "./Partials/Album";
import DashboardTabs from "@/Layouts/Tabs/DashboardTabs";

export default function Index({ auth, albums, collections }) {
    const { data, setData, post, processing, reset, errors } = useForm({
        album_name: "",
        artist: "",
        value: "",
    });

    const submit = (e) => {
        console.log("test");
        e.preventDefault();
        post(route("dashboard.albums.store"), { onSuccess: () => reset() });
    };

    return (
        <AuthenticatedLayout auth={auth}>
            <Head title="Albums" />
            <DashboardTabs />
            <div className="flex flex-row">
                <div className="p-4 sm:p-6 lg:p-8 ml-10">
                    <form className="w-full md:w-1/2 m-6" onSubmit={submit}>
                        <label htmlFor="AlbumName">Album Name</label>
                        <input
                            name="AlbumName"
                            value={data.album_name}
                            placeholder="Dark Side of the Moon"
                            className="block w-full border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm"
                            onChange={(e) =>
                                setData("album_name", e.target.value)
                            }
                        />
                        <InputError
                            message={errors.album_name}
                            className="mt-2"
                        />
                        <label htmlFor="artist">Artist</label>
                        <input
                            name="artist"
                            value={data.artist}
                            placeholder="Pink Floyd"
                            className="block w-full border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm"
                            onChange={(e) => setData("artist", e.target.value)}
                        />
                        <InputError message={errors.artist} className="mt-2" />

                        <PrimaryButton className="mt-4" processing={processing}>
                            Post Album
                        </PrimaryButton>
                    </form>
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
            </div>
        </AuthenticatedLayout>
    );
}
