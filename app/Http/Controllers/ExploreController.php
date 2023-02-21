<?php

namespace App\Http\Controllers;

use App\Models\Album;
use App\Models\Tracklist;
use App\Models\Track;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Http;
use App\Http\Controllers\Controller;

class ExploreController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Explore/Index');
    }
}
