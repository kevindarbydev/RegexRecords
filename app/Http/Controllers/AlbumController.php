<?php

namespace App\Http\Controllers;

use App\Models\Album;
use App\Models\Tracklist;
use App\Models\Track;
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
            'year' => 'nullable|string',
            'discogs_album_id' => 'nullable|string',
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

                // Get the album img, genre, year from the response obj
                $cover_image_url = $item['cover_image'];
                if (isset($items['year'])) { //nullcheck on year as it is no always included
                    $year = strval($item['year']);
                    $validated['year_of_release'] = $item['year'];
                    // dump(strval($item['year']));
                }

                // Upload the cover image to DigitalOcean Spaces bucket and get the URL
                $cover_image_spaces_url = $spaceController->uploadCoverImageToSpace($cover_image_url);

                //Assign the data from API to the saved album
                $validated['cover_image_url'] = $cover_image_spaces_url;

                $validated['genre'] = $item['genre'][0]; //there may be multiple genres, first should be fine
                $validated['discogs_album_id'] = $item['id'];

                

                //perform 2nd API call with discogs_album_id
                $response2 = Http::get("https://api.discogs.com/releases/{$item['id']}");
                if ($response2->ok()) {
                    //2nd query gives us access to "lowest_price" for value
                    if ($response2->json()['lowest_price'] === null){
                        $validated['value'] = "0";
                    } else {
                        $validated['value'] = $response2->json()['lowest_price'];
                    }
                    

                    //save the album obj and save it to a var to grab album_id for tracklist
                    $album = $request->user()->albums()->create($validated);
                    // Second API call was successful
                    $tracklist = $response2->json()['tracklist'];
                    
                    $tracklistModel = new Tracklist();
                    $tracklistModel->album_id = $album->id;
                    $tracklistModel->save();                 
                   
                    // Loop through each track in the tracklist and create a new Track model
                    foreach ($tracklist as $trackData) {
                       
                        $track = new Track();
                        $track->tracklist_id = $tracklistModel->id;
                        $track->track_number = str_replace('.', '', $trackData['position']);
                        $track->title = $trackData['title'];
                        if (empty($trackData['duration'])) {
                            continue;
                        }
                        $track->duration = $trackData['duration'];

                        if ($track->save()) {
                            echo "Track saved successfully";
                        } else {
                          dd($track->getError());
                        }
                    }
                    
                } else {
                    // The second API call failed
                    $status_code = $response2->status();
                    $error_message = $response2->body();
                    echo "2nd API Call -> " .  $status_code . ': ' . $error_message;
                }
            }
        } else {
            // The API call failed
            $status_code = $response->status();
            $error_message = $response->body();
            echo "1st API Call -> " .  $status_code . ': ' . $error_message;
        }

        return redirect()->route('albums.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(Album $album): Response
    {
        $album = Album::with('tracklist')->find($album->id);
        $tracklistId = $album->tracklist->id;
        $tracks = Track::where('tracklist_id', $tracklistId)->get();

        return Inertia::render('Albums/AlbumDetails', [
            'album' => $album,
            'tracks' => $tracks,
        ]);
    }

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
