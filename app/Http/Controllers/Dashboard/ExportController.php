<?php

namespace App\Http\Controllers\Dashboard;

use App\Models\Album;
use App\Http\Controllers\Controller;
use App\Models\Collection;
use App\Models\Collection_Album;
use Error;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class ExportController extends Controller
{

    public function index(): Response
    {
        return Inertia::render('Dashboard/Export', []);
    }
}
