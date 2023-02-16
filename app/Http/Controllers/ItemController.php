<?php

namespace App\Http\Controllers;

use App\Models\Item;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;


class ItemController extends Controller
{
    /**
     * Display a listing of the resource.
     */
     public function index(): Response

    {
        return Inertia::render('Items/Index', [

            //

        ]);
    }

    // /**
    //  * Show the form for creating a new resource.
    //  */
    // public function create(): Response
    // {
    //     return response();
    // }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([

            'message' => 'required|string|max:255',
        ]);


        $request->user()->items()->create($validated);

        return redirect(route('chirps.index'));
    }

    // /**
    //  * Display the specified resource.
    //  */
    // public function show(Item $item): Response
    // {
    //     return response();
    // }

    // /**
    //  * Show the form for editing the specified resource.
    //  */
    // public function edit(Item $item): Response
    // {
    //     return response();
    // }

    // /**
    //  * Update the specified resource in storage.
    //  */
    // public function update(Request $request, Item $item): RedirectResponse
    // {
    //     return Redirect();
    // }

    // /**
    //  * Remove the specified resource from storage.
    //  */
    // public function destroy(Item $item): RedirectResponse
    // {
    //     return Redirect();
    // }
}
