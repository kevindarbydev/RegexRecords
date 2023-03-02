<?php

namespace App\Http\Controllers\Explore;

use Inertia\Inertia;
use App\Models\Album;
use Inertia\Response;
use App\Models\Collection;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Database\Query\Builder;
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
        ) {
            $albums = [];
        } else {

            //TODO: add year ranges, price ranges, paginaton, make seach results partial conditional on having results or not, change to table view instead of cards

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

                ->get();

            // error_log($albums);
        }


        $searchTotal = count($albums);
        $message = "";
        if ($searchTotal >= 2) {
            $message = "Found $searchTotal records: ";
        } else if ($searchTotal == 1) {
            $message = "Found $searchTotal record: ";
        } else {
            $message = "No results found";
        }


        return Inertia::render('Explore/AdvSearch', [
            'albums' => $albums,
            'collections' => Collection::with('user')->where('user_id', Auth::user()->id)->get(),
            'message' => $message,
            // 'searchTotal' => $searchTotal,
            'cartCount' => Cart::count(),
        ]);
    }
}
