<?php

namespace App\Http\Controllers\Community;

use App\Http\Controllers\Controller;
use Inertia\Inertia;
use Inertia\Response;
use App\Models\User;



class FriendController extends Controller
{
  public function index(): Response
  {
    $user = Auth()->user();
    return Inertia::render('Community/Friends', [
      'userFriendships' => $user->getAllFriendships()
    ]);
  }
}
