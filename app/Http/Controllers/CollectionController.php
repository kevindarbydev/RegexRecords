<?php

namespace App\Http\Controllers;

use App\Models\Album;

use App\Models\Collection;
use App\Models\Collection_Album;

use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Facades\Auth;


class CollectionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): Response
    {
        return Inertia::render('Collections/Index', [
            'collections' => Collection::all(),
            'collection_albums' => Collection_Album::with('user:id')->latest()->get(),
            'collection_albums' => Collection_Album::with('user','collection_albums')->latest()->get(),
            
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
            'collection_name' => 'required|string|max:255',
        ]);

        $request->user()->collections()->create($validated);


        return redirect()->route('collections.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(Collection $collection): Response
    {
        return Inertia::render('Collections/Show', [
            'collection' => $collection
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Collection $collection): Response
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Collection $collection): RedirectResponse
    {
        error_log("$collection");
        $this->authorize('update', $collection);

        $validated = $request->validate([
            'collection_name' => 'required|string|max:255',
        ]);

        $collection->update($validated);

        return redirect(route('collections.index'));
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Collection $collection): RedirectResponse
    {
        $this->authorize('delete', $collection);

        $collection->delete();

        return redirect(route('collections.index'));
    }
}
