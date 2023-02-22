<?php

namespace App\Http\Controllers\Explore;

use Inertia\Inertia;
use Inertia\Response;
use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use Illuminate\Http\RedirectResponse;
use App\Models\Album;

class ViewAllAlbumsController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Explore/ViewAllAlbums', [

            'albums' => Album::all(),
            // 'users' => Auth::all()
            // ->with('user:id')->all()->get()


        ]);
        //testing out stuff
        // $albums = Album::whereHas('users', function ($getAllUsers) use ($userId) {
        //     $getAllUsers->whereIn('id', $userId);
        // })->get();
    }
}
