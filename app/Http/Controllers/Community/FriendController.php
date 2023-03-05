<?php

namespace App\Http\Controllers\Community;

use App\Http\Controllers\Controller;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\Request;
use Illuminate\Http\RedirectResponse;
use App\Models\User;
use App\Models\Collection;
use App\Models\Collection_Album;
use Gloudemans\Shoppingcart\Facades\Cart;
use Multicaret\Acquaintances\Interaction;
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
            'pendingFriendships'  => $pendingFriendships,
            'current_user' => $user,
            'cartCount' => Cart::count(),
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

    // view friend
    public function viewFriend(User $friend): Response
    {
        $user = Auth()->user();

        $friendCollections = Collection::where('user_id', $friend->id)->get();
        $ids = [];
        $i = 0;
        foreach ($friendCollections as $collection) {
            $ids[$i] = [$collection->id];
            $i++;
        }
        $friendsCollectionsWithAlbums = Collection_Album::with('collection', 'album')->whereIn('collection_id', $ids)->get();
        $mutualFriends = $user->getMutualFriends($friend);
        $mutualFriendsCount = $user->getMutualFriendsCount($friend);

        $likeStatus = $user->likes(Collection::class)->get();


        error_log("LIKE STATUS: $likeStatus");
        return Inertia::render('Community/FriendDetails', [
            'friend' => $friend,
            'cartCount' => Cart::count(),
            'mutualFriends' => $mutualFriends,
            'mutualFriendsCount' => $mutualFriendsCount,
            'friendCollections' => $friendCollections,
            'friendsCollectionsWithAlbums' => $friendsCollectionsWithAlbums,
            'likeStatus' => $likeStatus,
        ]);
    }

    public function likeCollection(Collection $collection): RedirectResponse
    {
        $friend = $collection->user;

        $user = Auth()->user();

        if ($user->hasLiked($collection)) {
            $user->unlike($collection);
            return redirect(route('friends.view.friend', $friend));
        } else {
            $user->like($collection);
            return redirect(route('friends.view.friend', $friend));
        }
    }
}
