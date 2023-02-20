<?php

namespace App\Http\Controllers;

use App\Models\Collection_Album;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
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
        $request->create();
        
 
        return redirect(route('albums.index'));
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
        //
    }
}
