<?php

namespace App\Http\Controllers;

use App\Models\Wishlist;
use App\Models\Album;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class WishlistController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): Response
    {
        return Inertia::render('Wishlists/Index', [
            'wishlists' => Wishlist::with('user:id,list_name')->latest()->get(),
            // 'albums' => Album::with('user:id,name')->where('user_id', Auth::user()->id)->latest()->get(),

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
        $validated = $request->validate([
            'list_name' => 'required|string|max:255',
        ]);
 
        $request->user()->wishlists()->create($validated);
 
        return redirect(route('wishlists.index'));
    }

    /**
     * Display the specified resource.
     */
    public function show(Wishlist $wishlist): Response
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Wishlist $wishlist): Response
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Wishlist $wishlist): RedirectResponse
    {
        $this->authorize('update', $wishlist);
 
        $validated = $request->validate([
            'list_name' => 'required|string|max:255',
        ]);
 
        $wishlist->update($validated);
 
        return redirect(route('wishlists.index'));
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Wishlist $wishlist): RedirectResponse
    {
        $this->authorize('delete', $wishlist);
 
        $wishlist->delete();
 
        return redirect(route('wishlists.index'));
    }
}
