<?php

namespace App\Http\Controllers\Dashboard;

use App\Models\Album;
use App\Models\Collection;
use App\Models\Collection_Album;
use App\Models\Tracklist;
use App\Http\Controllers\Controller;
use App\Models\Track;
use Error;
use Gloudemans\Shoppingcart\Facades\Cart;
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
        $albumsWithRatings = [];
        $i = 0;
        $allAlbums = Album::all();
        foreach ($allAlbums as $album) {
            $albumsWithRatings['name_and_rating'][$i] = [$album->id, $album->averageRatingAllTypes()];
            $i++;
        }

        return Inertia::render('Dashboard/MyAlbums', [

            // only returning user albums
            'albums' => Album::with('user:id,name')->where('user_id', Auth::user()->id)->latest()->get(),
            'collections' => Collection::with('user')->where('user_id', Auth::user()->id)->get(),
            'cartCount' => Cart::count(),
            'albumsWithRatings' => $albumsWithRatings,
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
            error_log("response 1");
            $data = $response->json();

            //results may be empty due to a typo or if the artist/album is not well known
            if (empty($data['results'])) {
                //assign it null now, checking for null later (Album.jsx component) to assign default img
                error_log("response 2");
                $validated['cover_image_url'] = null;
                return redirect(route('dashboard.index'))->with('failure', 'Album does not exist!');
            } else {
                // Get the first item in the results array (usually will be correct)
                error_log("response 3");
                $item = $data['results'][0];

                // Get the album img, genre, year from the response obj
                $cover_image_url = $item['cover_image'];

                // Upload the cover image to DigitalOcean Spaces bucket and get the URL
                $cover_image_spaces_url = $spaceController->uploadCoverImageToSpace($cover_image_url);

                //save these fields as whatever the API returns
                $validated['cover_image_url'] = $cover_image_spaces_url;
                $validated['genre'] = $item['genre'][0];
                $validated['subgenres'] = $item['style'];
                $validated['artist'] = $artist_name;
                $validated['album_name'] = $album_name;

                $validated['discogs_album_id'] = $item['master_id']; // discogs_album_id is the ID thats used for the 2nd API request
                error_log("master ID: " . $item['master_id']);

                $title = $item['title'];

                // Split the title string on the dash and assume the first part is the artist name and the second part is the album name
                $titleParts = explode(' - ', $title);
                $artist_name = $titleParts[0];
                $album_name = $titleParts[1];

                //perform 2nd API call with discogs_album_id
                $data2 = Http::get("https://api.discogs.com/masters/{$item['master_id']}")->json();
                if (!empty($data2)) {
                    $validated['year_of_release'] = $data2['year'] ?? null;
                    $validated['value'] = $data2['lowest_price'] ?? 0;

                    //save the album obj and save it to a var to grab album_id for tracklist
                    $album = $request->user()->albums()->create($validated);
                    if (isset($data2['tracklist'])) {
                        $tracklist = $data2['tracklist'];

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
                    }
                    error_log("Tracklist might have been null, didnt get saved");
                } else {
                    // The second API call failed
                    error_log("response 5");
                    $status_code = $data2->status();
                    $error_message = $data2->body();
                    error_log("2nd API Call -> " .  $status_code . ': ' . $error_message);
                    return redirect(route('dashboard.index'))->with('failure', 'Album does not exist!');
                }
            }
        } else {
            // The API call failed
            error_log("response 6");
            $status_code = $response->status();
            $error_message = $response->body();
            error_log("1st API Call -> " .  $status_code . ': ' . $error_message);

            return redirect(route('dashboard.index'))->with('failure', 'Album does not exist!');
        }

        return redirect()->route('dashboard.index');
    }

    // show album track details
    public function show(Album $album): Response
    {
        $avgRating = $album->averageRatingAllTypes();
        $allRaters = $album->raters(true)->get();
        $album = Album::with('tracklist')->find($album->id);
        $tracklistId = $album->tracklist->id ?? null;
        $tracks = Track::where('tracklist_id', $tracklistId)->get();
        $forSaleCount = Collection_Album::where('album_id', $album->id)
            ->where('for_sale', 1)
            ->count();
        return Inertia::render('Dashboard/AlbumDetails', [
            'album' => $album,
            'tracks' => $tracks,
            'cartCount' => Cart::count(),
            'avgRating' => $avgRating,
            'allRaters' => $allRaters,
            'forSaleCount' => $forSaleCount,
        ]);
    }

    // add album to collection
    public function addAlbumToCollection(Request $request): RedirectResponse
    {

        if ($request->collection_name == null) {
            return redirect()->back()->with('warning', 'You need to select a collection');
        }

        $collection = Collection::with('user')->where('collection_name', $request->collection_name)->first();

        $cAlbum = new Collection_Album();
        $cAlbum->album_id = $request->album_id;
        $cAlbum->collection_id = $collection->id;
        $cAlbum->for_sale = false;

        $cAlbum2 = DB::table('collection__albums')->where('collection_id', $cAlbum->collection_id)->where('album_id', $cAlbum->album_id)->first();

        if ($cAlbum2 != null) {
            return redirect()->back()->with('warning', 'You already added this album to your collection!');
        }

        $collection->collection_albums()->save($cAlbum);
        return redirect()->route('dashboard.collections');
    }

    // rate album
    public function rate(Request $request, Album $album): RedirectResponse
    {
        $user = Auth()->user();
        error_log($request);
        $request->validate([
            'rating' => 'required',
        ]);
        $user->rate($album, $request->rating, 'quality', Album::class);

        return redirect()->route('dashboard.albums.show', $album);
    }
}
