<?php

namespace App\Http\Controllers\Community;

use App\Http\Controllers\Controller;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use Illuminate\Http\RedirectResponse;
use App\Models\User;
use Multicaret\Acquaintances\Models\Friendship;

class FriendController extends Controller
{
    public function index(): Response
    {
        $user = Auth()->user();
        $currentFriendships = $user->getAcceptedFriendships();

        $pendingFriendships = $user->getPendingFriendships();

        return Inertia::render('Community/Friends', [
            'currentFriendships' => $currentFriendships,
            'pendingFriendships'  => $pendingFriendships
        ]);
    }

    // accept friend request
    public function acceptRequest(Request $request, Friendship $friendship): RedirectResponse
    {

        $loggedInUser = Auth()->user();

        $loggedInUser->acceptFriendRequest($friendship->sender);

        return redirect(route('friends.index'));
    }
}
