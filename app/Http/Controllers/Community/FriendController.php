<?php

namespace App\Http\Controllers\Community;

use App\Http\Controllers\Controller;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use Illuminate\Http\RedirectResponse;
use App\Models\User;
use Error;
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

    // accept friend request
    public function denyRequest(Request $request, Friendship $friendship): RedirectResponse
    {
        $loggedInUser = Auth()->user();

        $loggedInUser->denyFriendRequest($friendship->sender);

        return redirect(route('friends.index'));
    }

    // delete friend
    public function unfriend(Request $request, Friendship $friendship): RedirectResponse
    {
        $loggedInUser = Auth()->user();

        $loggedInUser->unfriend($friendship->sender);

        return redirect(route('friends.index'));
    }
}
