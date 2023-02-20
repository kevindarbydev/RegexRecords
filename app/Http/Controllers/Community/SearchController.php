<?php

namespace App\Http\Controllers\Community;

use App\Http\Controllers\Controller;
use App\Models\User;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\Request;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Auth;

class SearchController extends Controller
{
  public function index(Request $request): Response
  {
    //TODO: 
    // prevent logged in user from showing up as querry 
    // prevent "add friend" button if friend is already added
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

  // goal --> retrieve searched user and befriend 
  public function update(Request $request): RedirectResponse
  {
    $loggedInUser = Auth()->user();
    $friend = User::where('name', $request->message)->first();

    // TODO: Only logged in user can send request from their account -- maybe create policy
    // $this->authorize('update', $user); 

    // sending and accepting friend request in one shot for now
    $loggedInUser->befriend($friend);
    $friend->acceptFriendRequest($loggedInUser);
    error_log("{$friend} accepted {$loggedInUser}'s friend request");

    return redirect(route('friends.index'));
  }
}
