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

class WishlistController extends Controller
{
    //Display Wishlist Albums
    public function index(): Response {
        
        return Inertia::render('Dashboard/Wishlists', [
            'wishlist_albums' => Wishlist_Album::with('wishlist','album')->latest()->get(),

        ]);
    }
    
    
}
