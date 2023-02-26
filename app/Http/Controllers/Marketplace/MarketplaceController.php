<?php

namespace App\Http\Controllers\Marketplace;

use App\Models\Collection;
use App\Models\Album;
use App\Models\Tracklist;
use App\Models\Track;
use App\Models\Collection_Album;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Http;
use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Support\Facades\DB;

class MarketplaceController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Marketplace/Index', [
            'current_user' => Auth::user(),
            'collection_albums' => Collection_Album::where('for_sale', true)->latest()->get(),
            'collection_albums2' => DB::table('collection__albums')->where('for_sale', true)->join('albums', 'collection__albums.album_id', '=', 'albums.id')->orderBy('albums.value', 'asc')->get(),
            'collection_albums3' => DB::table('collection__albums')->where('for_sale', true)->join('albums', 'collection__albums.album_id', '=', 'albums.id')->orderBy('albums.value', 'desc')->get(),
            'collection_albums4' => DB::table('collection__albums')->where('for_sale', true)->join('collections', 'collection__albums.collection_id', '=', 'collections.id')->join('users', 'collections.user_id', '=', 'users.id')->orderBy('users.name', 'asc')->get(),
            'albums' => Album::with('user')->latest()->get(),
            'collections' => Collection::with('user')->latest()->get(),
            'users' => User::all(),
        ]);
    }
}
