<?php

namespace App\Http\Controllers\Community;

use App\Http\Controllers\Controller;
use Inertia\Inertia;
use Inertia\Response;
use Multicaret\Acquaintances\Models\Friendship;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use Illuminate\Http\RedirectResponse;
use App\Models\User;

class FriendController extends Controller
{
  public function index(): Response
  {
    // current friendships
    $currentFriendships = Friendship::with(['sender', 'recipient'])
      // ->where(function ($query) {
      //   $query->where('sender_id', Auth::user()->id);
      // })
      ->where(function ($query) {
        $query->where('status', 'accepted');
      })
      ->latest()->get();

    // pending friendships
    $pendingFriendships = Friendship::with(['sender', 'recipient'])
      ->where(function ($query) {
        $query->where('recipient_id', Auth::user()->id);
      })
      ->where(function ($query) {
        $query->where('status', 'pending');
      })
      ->latest()->get();

    return Inertia::render('Community/Friends', [
      'currentFriendships' => $currentFriendships,
      'pendingFriendships'  => $pendingFriendships
    ]);
  }

  // accept friend request friend request
  public function acceptRequest(Request $request): RedirectResponse
  {
    $loggedInUser = Auth()->user();
    $sender = User::where('name', $request->name)->first();

    $loggedInUser->acceptFriendRequest($sender);
    error_log("LOGGED IN USER: $loggedInUser");
    error_log("SENDER: $sender");
    error_log("friend request accepted");
    return redirect(route('friends.index'));
  }
}
