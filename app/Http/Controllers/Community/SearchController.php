<?php

namespace App\Http\Controllers\Community;

use App\Http\Controllers\Controller;
use App\Models\User;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\Request;
use Illuminate\Http\RedirectResponse;


class SearchController extends Controller
{
  public function index(Request $request): Response
  {
    $users = User::where('name', 'LIKE', '%' . $request->search . '%')
      ->orWhere('email', 'LIKE', '%' . $request->search . '%')
      ->latest()->get();
    return Inertia::render('Community/Search', [
      'users' => $users
    ]);
  }
  // not storing anything --> just handling form post method
  public function store(Request $request): RedirectResponse
  {
    return redirect()->route('search.index', ['search' => $request->search]);
  }
}
