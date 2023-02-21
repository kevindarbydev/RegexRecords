<?php

namespace App\Policies;

use App\Models\Collection_Album;
use App\Models\User;
use Illuminate\Auth\Access\Response;

class Collection_AlbumPolicy
{
    /**
     * Determine whether the user can view any models.
     */
    public function viewAny(User $user): bool
    {
        //
    }

    /**
     * Determine whether the user can view the model.
     */
    public function view(User $user, Collection_Album $collectionAlbum): bool
    {
        //
    }

    /**
     * Determine whether the user can create models.
     */
    public function create(User $user): bool
    {
        //
    }

    /**
     * Determine whether the user can update the model.
     */
    public function update(User $user, Collection_Album $collectionAlbum): bool
    {
        //
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user, Collection_Album $collectionAlbum): bool
    {
        return $this->update($user, $collectionAlbum);
    }

    /**
     * Determine whether the user can restore the model.
     */
    public function restore(User $user, Collection_Album $collectionAlbum): bool
    {
        //
    }

    /**
     * Determine whether the user can permanently delete the model.
     */
    public function forceDelete(User $user, Collection_Album $collectionAlbum): bool
    {
        //
    }
}
