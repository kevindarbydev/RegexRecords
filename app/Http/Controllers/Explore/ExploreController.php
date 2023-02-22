<?php

namespace App\Http\Controllers\Explore;

use App\Models\User;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\RedirectResponse;
use App\Models\Album;

class ExploreController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Explore/Index');
    }

    public function viewAllAlbums(): Response
    {
        return Inertia::render('Explore/ViewAllAlbums', [
            'albums' => Album::all()
        ]);
    }
}
