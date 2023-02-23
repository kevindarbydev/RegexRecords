<?php

namespace App\Http\Controllers\Explore;

use App\Models\User;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\RedirectResponse;
use Illuminate\Pagination\Paginator;
use Illuminate\Pagination\LengthAwarePaginator;

use App\Models\Album;

class ExploreController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Explore/Index');
    }

    public function viewAllAlbums(): Response
    {
        $albums = Album::all();
        $totalAlbums = count($albums);
        $perPage = 5;
        $page = Paginator::resolveCurrentPage('viewAllAlbums');
        error_log('TOTAL ALBUMS: ' . $totalAlbums);

        $albums = new LengthAwarePaginator($albums->forPage($page, $perPage), $totalAlbums, $perPage, $page, [
            'path' => Paginator::resolveCurrentPath(),
            'pageName' => 'page',
        ]);



        return Inertia::render('Explore/ViewAllAlbums', [
            'albums' => Album::all(),
            'totalAlbums' => $totalAlbums,
            compact('albums')

        ]);
    }
}
