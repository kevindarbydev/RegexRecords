<?php

namespace App\Http\Controllers\Community;

use App\Http\Controllers\Controller;
use Illuminate\View\View;
use Inertia\Inertia;
use Inertia\Response;
use App\Models\User;



class FriendController extends Controller
{
  // FIXME: routing to an blade.php view for now 
  public function index(): View
  {
    $user = Auth()->user();
    $userFriendships = $user->getAllFriendships();
    return view('friendships.index', [
      'friendships' => $userFriendships
    ]);
  }

  // SOLUTION (Not rendering properly)
  // public function index(): Response
  // {
  //   $user = Auth()->user();
  //   return Inertia::render('Community/Friends', [
  //     'userFriendships' => $user->getAllFriendships()
  //   ]);
  // }
}
