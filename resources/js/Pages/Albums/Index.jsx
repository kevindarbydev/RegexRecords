import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import InputError from "@/Components/InputError";
import PrimaryButton from "@/Components/PrimaryButton";
import { useForm, Head } from "@inertiajs/react";

export default function Index({ auth }) {
    const { data, setData, post, processing, reset, errors } = useForm({
        album_name: "",
        artist: "",
        value: "",
    });

    const submit = (e) => {
        e.preventDefault();
        post(route("albums.store"), { onSuccess: () => reset() });
    };

    return (
        <AuthenticatedLayout auth={auth}>
            <Head title="Albums" />
            <div className="max-w-2xl mx-auto p-4 sm:p-6 lg:p-8">
                <form onSubmit={submit}>
                    <label htmlFor="AlbumName">Album Name</label>
                    <input
                        name="AlbumName"
                        value={data.album_name}
                        placeholder="abbey road"
                        className="block w-full border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm"
                        onChange={(e) => setData("album_name", e.target.value)}
                    />
                    <InputError message={errors.album_name} className="mt-2" />
                    <label htmlFor="artist">Artist</label>
                    <input
                        name="artist"
                        value={data.artist}
                        placeholder="the beatles"
                        className="block w-full border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm"
                        onChange={(e) => setData("artist", e.target.value)}
                    />
                    <InputError message={errors.artist} className="mt-2" />
                    <label htmlFor="value">Value</label>
                    <input
                        name="value"
                        value={data.value}
                        placeholder="30"
                        className="block w-full border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm"
                        onChange={(e) => setData("value", e.target.value)}
                    />
                    <InputError message={errors.value} className="mt-2" />
                    <PrimaryButton className="mt-4" processing={processing}>
                        Post Album
                    </PrimaryButton>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}
