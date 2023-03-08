<?php

namespace App\Http\Controllers\Explore;

use Inertia\Inertia;
use App\Models\Album;
use Inertia\Response;
use App\Models\Collection;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Date;
use Gloudemans\Shoppingcart\Facades\Cart;

class AdvSearchController extends Controller
{
    public function advSearch(Request $request): Response
    {



        // if block prevents all albums showing on page load or performing a search on all-empty fields
        if (
            !isset($request->album_name)
            && !isset($request->artist)
            && !isset($request->genre)
            && !isset($request->subgenres)
            && !isset($request->year_of_release)
            && !isset($request->value)
            && !isset($request->lowYearRange)
            && !isset($request->highYearRange)
            && !isset($request->lowPriceRange)
            && !isset($request->highPriceRange)
        ) {
            $albums = [];
        } else {

            $request->validate([
                'album_name' => 'string|nullable|min:1|max:200',
                'artist' => 'string|nullable|min:1|max:200',
                'genre' => 'string|nullable|min:1|max:100',
                'subgenres' => 'string|nullable|min:1|max:100',
                'year_of_release' => 'nullable|integer|min:1920|max:' . date('Y'),
                'value' => 'numeric|min:0|max:3000|nullable',
            ]);

            $albums = Album::query()
                ->when(request('album_name'), function ($q) {
                    return $q->where('album_name', 'LIKE', '%' . request('album_name') . '%');
                })
                ->when(request('artist'), function ($q) {
                    return $q->where('artist', 'LIKE', '%' . request('artist') . '%');
                })
                ->when(request('genre'), function ($q) {
                    return $q->where('genre', 'LIKE', '%' . request('genre') . '%');
                })
                ->when(request('subgenres'), function ($q) {
                    return $q->where('subgenres', 'LIKE', '%' . request('subgenres') . '%');
                })
                ->when(request('year_of_release'), function ($q) {
                    return $q->where('year_of_release', '=', request('year_of_release'));
                })
                ->when(request('value'), function ($q) {
                    return $q->where('value', '=', request('value'));
                })
                ->when((request('lowYearRange') && request('highYearRange')), function ($q) {
                    return $q->whereBetween('year_of_release', [request('lowYearRange'), request('highYearRange')]);
                })
                ->when((request('lowPriceRange') && request('highPriceRange')), function ($q) {
                    return $q->whereBetween('value', [request('lowPriceRange'), request('highPriceRange')]);
                })

                ->get();
        }

        // manages message header based on # of results
        $searchTotal = count($albums);
        $message = "";
        if ($searchTotal >= 2) {
            $message = "Found $searchTotal records: ";
        } else if ($searchTotal == 1) {
            $message = "Found $searchTotal record: ";
        } else {
            $message = "No results found";
        }

        // sending album + ratings to views
        $albumsWithRatings = [];
        $i = 0;
        $allAlbums = Album::all();
        foreach ($allAlbums as $album) {
            $albumsWithRatings['name_and_rating'][$i] = [$album->id, $album->averageRatingAllTypes()];
            $i++;
        }

        return Inertia::render('Explore/AdvSearch', [
            'albums' => $albums,
            'collections' => Collection::with('user')->where('user_id', Auth::user()->id)->get(),
            'message' => $message,
            'cartCount' => Cart::count(),
            'albumsWithRatings' => $albumsWithRatings
        ]);
    }
}