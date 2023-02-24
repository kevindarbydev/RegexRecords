<?php

namespace App\Http\Controllers\Dashboard;

use App\Models\Album;
use App\Models\Collection;
use App\Models\Collection_Album;
use App\Models\Tracklist;
use App\Http\Controllers\Controller;
use App\Models\Track;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Http;

class AlbumController extends Controller
{
    // display user albums only
    public function index(): Response

    {
        return Inertia::render('Dashboard/MyAlbums', [

            // only returning user albums
            'albums' => Album::with('user:id,name')->where('user_id', Auth::user()->id)->latest()->get(),
            'collections' => Collection::with('user')->where('user_id', Auth::user()->id)->get(),

        ]);
    }


    // add album to user-master list
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


                if (isset($item['year'])) { //nullcheck on year as it is no always included

                    $validated['year_of_release'] = $item['year'];
                } else if (isset($data['results'][1]['year'])) { //check 2nd item in response if 1st year is null
                    $validated['year_of_release'] = $data['results'][1]['year'];
                }

                // Upload the cover image to DigitalOcean Spaces bucket and get the URL
                $cover_image_spaces_url = $spaceController->uploadCoverImageToSpace($cover_image_url);

                //Assign the data from API to the saved album
                $validated['cover_image_url'] = $cover_image_spaces_url;

                $validated['genre'] = $item['genre'][0]; //TODO: change genre to json() to capture all genres in the response

                // $subgenres = '';
                // if (isset($item['style'])) {
                //     foreach ($item['style'] as $style) {
                //         $subgenres .= $style . ', ';
                //     }
                //     // Remove the last comma and space
                //     $subgenres = rtrim($subgenres, ', ');
                // }

                $validated['subgenres'] = $item['style'];

                $validated['discogs_album_id'] = $item['id']; // discogs_album_id is the ID thats used for the API request



                //perform 2nd API call with discogs_album_id
                $response2 = Http::get("https://api.discogs.com/releases/{$item['id']}");
                if ($response2->ok()) {
                    //2nd query gives us access to "lowest_price" for value
                    if ($response2->json()['lowest_price'] === null) {
                        $validated['value'] = "0"; //TODO: make value string so i can put  "not found"
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
                        $track->track_number = $trackData['position'];
                        $track->title = $trackData['title'];
                        $track->duration = $trackData['duration'];
                        if ($track->save()) {
                            error_log("Track saved successfully (duration: " . $track->duration . ")");
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

        return redirect()->route('dashboard.index');
    }

    // show album track details
    public function show(Album $album): Response
    {
        $album = Album::with('tracklist')->find($album->id);
        $tracklistId = $album->tracklist->id;
        $tracks = Track::where('tracklist_id', $tracklistId)->get();

        return Inertia::render('Dashboard/AlbumDetails', [
            'album' => $album,
            'tracks' => $tracks,
        ]);
    }

    // add album to collection
    public function addAlbumToCollection(Request $request): RedirectResponse
    {

        if ($request->collection_name == null) {
            return redirect()->route('explore.viewAllAlbums');
        }

        $collection = Collection::with('user')->where('collection_name', $request->collection_name)->first();

        $cAlbum = new Collection_Album();
        $cAlbum->album_id = $request->album_id;
        $cAlbum->collection_id = $collection->id;
        $cAlbum->for_sale = false;

        $cAlbum2 = DB::table('collection__albums')->where('collection_id', $cAlbum->collection_id)->where('album_id', $cAlbum->album_id)->first();

        if ($cAlbum2 != null) {
            return redirect()->route('explore.viewAllAlbums');
        }

        $collection->collection_albums()->save($cAlbum);
        return redirect()->route('dashboard.collections');
    }
}
