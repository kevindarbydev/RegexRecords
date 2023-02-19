import React, { useState } from 'react';
import Dropdown from '@/Components/Dropdown';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { useForm, usePage } from '@inertiajs/react';

dayjs.extend(relativeTime);

 
export default function Wishlist({ wishlist }) {
    const { auth } = usePage().props;
 
    const [editing, setEditing] = useState(false);
 
    const { data, setData, patch, clearErrors, reset, errors } = useForm({
        list_name: wishlist.list_name,
    });
 
    const submit = (e) => {
        e.preventDefault();
        patch(route('wishlists.update', wishlist.id), { onSuccess: () => setEditing(false) });
    };

    return (

        <div className="p-6 flex space-x-2">
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
  <path d="M5.625 3.75a2.625 2.625 0 100 5.25h12.75a2.625 2.625 0 000-5.25H5.625zM3.75 11.25a.75.75 0 000 1.5h16.5a.75.75 0 000-1.5H3.75zM3 15.75a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75a.75.75 0 01-.75-.75zM3.75 18.75a.75.75 0 000 1.5h16.5a.75.75 0 000-1.5H3.75z" />
</svg>

            <div className="flex-1">
                <div className="flex justify-between items-center">
                    <div>
                        <span className="text-gray-800">{wishlist.list_name}</span>
                        <small className="ml-2 text-sm text-gray-600">{dayjs(wishlist.created_at).fromNow()}</small>
                        { wishlist.created_at !== wishlist.updated_at && <small className="text-sm text-gray-600"> &middot; edited</small>}

                    </div>
                    {wishlist.user.id === auth.user.id &&
                        <Dropdown>
                            <Dropdown.Trigger>
                                <button>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                                        <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
                                    </svg>
                                </button>
                            </Dropdown.Trigger>
                            <Dropdown.Content>
                                <button className="block w-full px-4 py-2 text-left text-sm leading-5 text-gray-700 hover:bg-gray-100 focus:bg-gray-100 transition duration-150 ease-in-out" onClick={() => setEditing(true)}>
                                    Edit
                                </button>
                                <Dropdown.Link as="button" href={route('wishlists.destroy', wishlist.id)} method="delete">
                                    Delete
                                </Dropdown.Link>
                            </Dropdown.Content>
                        </Dropdown>
                    }
                </div>
                {editing
                    ? <form onSubmit={submit}>
                        <textarea value={data.list_name} onChange={e => setData('list_name', e.target.value)} className="mt-4 w-full text-gray-900 border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm"></textarea>
                        <InputError message={errors.list_name} class="mt-2" />
                        <div className="space-x-2">
                            <PrimaryButton className="mt-4">Save</PrimaryButton>
                            <button className="mt-4" onClick={() => { setEditing(false); reset(); clearErrors(); }}>Cancel</button>
                        </div>
                    </form>
                    : <p className="mt-4 text-lg text-gray-900">{wishlist.list_name}</p>
                }
            </div>
        </div>
    );
}