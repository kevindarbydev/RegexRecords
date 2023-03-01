<?php

namespace App\Http\Controllers\Explore;

use Inertia\Inertia;
use App\Models\Album;
use Inertia\Response;
use Illuminate\Http\Request;
use App\Models\Collection;
use App\Http\Controllers\Controller;
use Gloudemans\Shoppingcart\Facades\Cart;
use Illuminate\Support\Facades\Auth;

class AdvSearchController extends Controller
{
    public function advSearch(Request $request): Response
    {

        // for testing render
        // $albums = Album::all();

        $albumNameSearch = $request->album_name;
        $artistSearch = $request->artist;

        error_log("$albumNameSearch");
        error_log("$artistSearch");

        if ($albumNameSearch != "" || $artistSearch != "") {
            $albums = Album::where(function ($query) use ($request) {
                $query->where('album_name', 'LIKE', '%' . $request->album_name . '%')
                    ->orWhere('artist', 'LIKE', '%' . $request->artist . '%');
            })->get();
            return Inertia::render('Explore/AdvSearch', [

                'albums' => $albums,
                'collections' => Collection::with('user')->where('user_id', Auth::user()->id)->get(),
                'cartCount' => Cart::count(),
            ]);
        } else {
            return Inertia::render('Explore/AdvSearch', [
                'albums' => []
            ]);
        }




        return Inertia::render('Explore/AdvSearch', [

            // 'albums' => $albums,
            'collections' => Collection::with('user')->where('user_id', Auth::user()->id)->get(),
            'cartCount' => Cart::count(),
        ]);
    }
}