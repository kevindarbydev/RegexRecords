<?php

namespace App\Http\Controllers\Dashboard;

use App\Models\Wishlist;
use App\Models\Wishlist_Album;
use App\Models\Album;
use App\Http\Controllers\Controller;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;


class WishlistController extends Controller
{
    //Display Wishlist Albums
    public function index(): Response {
        
        return Inertia::render('Dashboard/Wishlists', [
            'wishlist_albums' => Wishlist_Album::with('wishlist','album')->latest()->get(),

        ]);
    }
    public function addAlbumToWishlist(Request $request): RedirectResponse {
        
        $wishlist = Wishlist::with('user','album')->where('list_name', $request->list_name)->first();
        $wAlbum = new Wishlist_Album();
        $wAlbum->wishlist_id = 1;
        $wAlbum->album_id = $request->album_id;

        $wAlbum2 = DB::table('wishlist__albums')->where('wishlist_id', 1)->where('album_id', $wAlbum->album_id)->first();
        if ($wAlbum2 != null) {
            return redirect()->route('dashboard.index');
        }

        $wishlist->wishlist_albums()->save($wAlbum);
        return redirect()->route('dashboard.wishlists');

    }

    public function removeFromWishlist(Request $request): RedirectResponse {

        $wAlbum = Wishlist_Album::where('id', $request->wAlbum)->first();
        $wAlbum->delete();
        return redirect(route('dashboard.wishlists'));

    }
    
}
