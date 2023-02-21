<?php

namespace App\Http\Controllers;

use App\Models\Wishlist_Album;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class WishlistAlbumController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): Response
    {
        return Inertia::render('Wishlist_Albums/Index', [
            'wishlist_albums' => Wishlist_Album::with('user:id,name')->latest()->get(),

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
        //     'message' => 'required|string|max:255',
        // ]);
 
        // $request->user()->chirps()->create($validated);
        return redirect(route('wishlist_albums.index'));
    }

    /**
     * Display the specified resource.
     */
    public function show(Wishlist_Album $wishlist_Album): Response
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Wishlist_Album $wishlist_Album): Response
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Wishlist_Album $wishlist_Album): RedirectResponse
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Wishlist_Album $wishlist_Album): RedirectResponse
    {
        //
    }
}
