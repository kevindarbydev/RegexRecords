<?php

namespace App\Http\Controllers\Community;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Http;

class SearchController extends Controller
{
  /**
   * Display a listing of the resource.
   */
  public function index(): Response

  {
    // $users = User::search(request('search'));
    return Inertia::render('Community/Search', [
      // 'users' => $users
    ]);
  }
}
