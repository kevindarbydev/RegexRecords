<?php

namespace App\Http\Controllers;

use App\Models\Collection_Album;
use App\Models\Album;
use App\Models\Collection;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Inertia\Response;


class CollectionAlbumController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): Response
    {
        return Inertia::render('Collection_Albums/Index', [
            'collection_albums' => Collection_Album::with('user:id')->latest()->get(),


        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(): Response
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request): RedirectResponse
    {
        // $validated = $request->validate([
        //     // 'collection_id' => 'nullable|int',
        //     'album_id' => 'nullable|int',
        //     'for_sale' => 'nullable|boolean',
        // ]);
        $user = Auth::user();

        $collection = Collection::with('user')->where('user_id', Auth::user()->id)->first();

        if ($collection == null) {
            return redirect(route('collections.index'));
        }
        $cAlbum = new Collection_Album();
        $cAlbum->album_id = $request->message;
        $cAlbum->collection_id = $collection->id;
        $cAlbum->for_sale = false;

        error_log("test $cAlbum");

        $collection->collection_albums()->save($cAlbum);
        return redirect(route('collections.index'));
    }

    /**
     * Display the specified resource.
     */
    public function show(Collection_Album $collection_Album): Response
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Collection_Album $collection_Album): Response
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Collection_Album $collection_Album): RedirectResponse
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Collection_Album $collection_Album): RedirectResponse
    {
        $this->authorize('delete', $collection_Album);
        $collection_Album->delete();
        return redirect(route('collection_albums.index'));
    }
}
