<?php

namespace App\Http\Controllers\Dashboard;

use App\Models\Wishlist;
use App\Models\Wishlist_Album;
use App\Models\Album;
use App\Http\Controllers\Controller;
use App\Models\User;
use Gloudemans\Shoppingcart\Facades\Cart;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;


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
    //Add Album to Wishlist
    public function addAlbumToWishlist(Request $request): RedirectResponse
    {

        $user = User::where('id', Auth::user()->id)->first();
        $wishlist = Wishlist::where('id', 1)->first();

        if ($wishlist == null) {
            $wishlist = new Wishlist();
            $wishlist->user_id = $user->id;
            $wishlist->list_name = 'My Wishlist';

            $user->wishlists()->save($wishlist);
        }

        $wAlbum = new Wishlist_Album();
        $wAlbum->wishlist_id = 1;
        $wAlbum->album_id = $request->album;

        $album_id = $request->album;
        $duplicate = Wishlist_Album::where('album_id', $album_id)->count();

        if ($duplicate == 0) {

            $wishlist->wishlist_albums()->save($wAlbum);
            return redirect()->route('dashboard.wishlists');
        }

        return redirect()->route('dashboard.wishlists');
    }

    //Remove Album from Wishlist
    public function removeFromWishlist(Request $request): RedirectResponse
    {

        $wAlbum = Wishlist_Album::where('id', $request->album_id)->first();

        $wAlbum->delete();

        return redirect(route('dashboard.wishlists'));
    }
}
