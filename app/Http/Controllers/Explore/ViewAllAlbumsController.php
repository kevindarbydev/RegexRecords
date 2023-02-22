<?php

namespace App\Http\Controllers\Explore;

use Inertia\Inertia;
use Inertia\Response;
use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use Illuminate\Http\RedirectResponse;

class ViewAllAlbumsController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Explore/ViewAllAlbums');
    }

    // public function viewAll(): Response
    // {
    //     
    // }
}
