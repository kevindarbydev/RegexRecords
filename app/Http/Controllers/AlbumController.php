<?php

namespace App\Http\Controllers;

use App\Models\Album;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Http;

class AlbumController extends Controller
{
    /**
     * Display a listing of the resource.
     * User albums ONLY
     */
    public function index(): Response

    {
        return Inertia::render('Albums/Index', [

            // only returning user albums
            'albums' => Album::with('user:id,name')->where('user_id', Auth::user()->id)->latest()->get(),

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
        $spaceController = app(\App\Http\Controllers\SpaceController::class);
        $validated = $request->validate([
            'album_name' => 'required|string|max:255',
            'artist' => 'required|string|max:255',
            'cover_image_url' => 'nullable|string',
            'value' => 'required|integer',
        ]);

        $album_name = $request->album_name;
        $artist_name = $request->artist;

        $response = Http::get('https://api.discogs.com/database/search', [
            'release_title' => $album_name,
            'artist' => $artist_name,
            'token' => env('DISCOGS_ACCESS_TOKEN'),
        ]);

        if ($response->ok()) {
            // The API call was successful
            $data = $response->json();

            //results may be empty due to a typo or if the artist/album is not well known
            if (empty($data['results'])) {
                //assign it null now, checking for null later (Album.jsx component) to assign default img   
                $validated['cover_image_url'] = null;           
            } else {
                // Get the first item in the results array (usually will be correct)   
                $item = $data['results'][0];

                // Get the cover image URL from the item
                $cover_image_url = $item['cover_image'];

                // Upload the cover image to DigitalOcean Spaces bucket and get the URL
                $cover_image_spaces_url = $spaceController->uploadCoverImageToSpace($cover_image_url);

                //Assign the cover image url to the new album obj
                $validated['cover_image_url'] = $cover_image_spaces_url;
            }
        } else {
            // The API call failed
            $status_code = $response->status();
            $error_message = $response->body();
            echo $error_message . ': ' . $status_code;                     
        }
        


        $request->user()->albums()->create($validated);

        return redirect()->route('albums.index');
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
