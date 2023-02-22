<?php

namespace App\Http\Controllers;

use App\Models\Review;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ReviewController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): Response
    {
        return Inertia::render('Reviews/Index', [
            'reviews' => Review::with('user:id')->latest()->get(),

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
            'rating' => 'nullable|int',
            'content' => 'required|string|max:500',
        ]);
 
        $request->user()->chirps()->create($validated);
 
        return redirect(route('chirps.index'));
    }

    /**
     * Display the specified resource.
     */
    public function show(Review $review): Response
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Review $review): Response
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Review $review): RedirectResponse
    {
        $this->authorize('update', $review);
 
        $validated = $request->validate([
            'rating' => 'nullable|int',
            'content' => 'required|string|max:500',
        ]);
 
        $review->update($validated);
 
        return redirect(route('reviews.index'));
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Review $review): RedirectResponse
    {
        $this->authorize('delete', $review);
 
        $review->delete();
 
        return redirect(route('reviews.index'));
    }
}
