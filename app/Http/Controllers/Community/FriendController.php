<?php

namespace App\Http\Controllers\Community;

use App\Http\Controllers\Controller;
use Inertia\Inertia;
use Inertia\Response;
use Multicaret\Acquaintances\Models\Friendship;
use Illuminate\Support\Facades\Auth;

class FriendController extends Controller
{
  public function index(): Response
  {
    $userFriendships = Friendship::with('recipient')->where('sender_id', Auth::user()->id)->latest()->get();
    return Inertia::render('Community/Friends', [
      'userFriendships' => $userFriendships
    ]);
  }
}
