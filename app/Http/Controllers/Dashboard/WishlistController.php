<?php

namespace App\Http\Controllers\Dashboard;

use App\Models\Wishlist;
use App\Models\Wishlist_Album;
use App\Models\Album;
use App\Http\Controllers\Controller;
use Gloudemans\Shoppingcart\Facades\Cart;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;


class WishlistController extends Controller
{
    //Display Wishlist Albums
    public function index(): Response
    {

        return Inertia::render('Dashboard/Wishlists', [
            'wishlist_albums' => Wishlist_Album::with('wishlist', 'album')->latest()->get(),
            'cartCount' => Cart::count(),

        ]);
    }
    public function addAlbumToWishlist(Request $request): RedirectResponse
    {

        $wishlist = Wishlist::where('id', 1)->first();
        
        $wAlbum = new Wishlist_Album();
        $wAlbum->wishlist_id = 1;
        $wAlbum->album_id = $request->album;        

        $album_id = $request->album;
        $duplicate = Wishlist_Album::where('album_id', $album_id)->count();

        if ($duplicate ==0) {

            $wishlist->wishlist_albums()->save($wAlbum);
            return redirect()->route('dashboard.wishlists');
        }

        return redirect()->route('dashboard.wishlists');
    }

    public function removeFromWishlist(Request $request): RedirectResponse
    {

        $wAlbum = Wishlist_Album::where('id', $request->id)->first();
        
        $wAlbum->delete();  

        return redirect(route('dashboard.wishlists'));


    }
    public function showAlbumDetails(Request $request): RedirectResponse {

        $wAlbum = Wishlist_Album::where('id', $request->id)->first();

    }
}
