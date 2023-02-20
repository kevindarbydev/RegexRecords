<?php

namespace App\Http\Controllers\Community;

use Inertia\Inertia;
use Inertia\Response;
use App\Http\Controllers\Controller;

class CommunityController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Community/Index');
    }
}
