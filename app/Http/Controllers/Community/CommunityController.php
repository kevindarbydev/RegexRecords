<?php

namespace App\Http\Controllers\Community;

use Inertia\Inertia;
use Inertia\Response;
use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use Illuminate\Http\RedirectResponse;


class CommunityController extends Controller
{
    public function index(): Response
    {
        $user = Auth()->user();

        return Inertia::render('Community/Index', ['friendCount' => $user->getFriendsCount()]);
    }

    public function search(Request $request): Response
    {
        $keySearch = $request->search;
        if ($keySearch != "") {
            $users = User::where(function ($query) use ($request) {
                $query->where('name', 'LIKE', '%' . $request->search . '%')
                    ->orWhere('email', 'LIKE', '%' . $request->search . '%');
            })
                ->where(function ($query) {
                    $query->where('id', '!=', Auth::user()->id); //preventing logged in user from showing up as querry
                })->paginate(5)->appends($request->all());
            return Inertia::render('Community/Search', [
                'users' => $users
            ]);
        } else {
            //return empty array if keysearch is just spaces
            $users = [];
            return Inertia::render('Community/Search', [
                'users' => $users
            ]);
        }
    }

    public function searchPost(Request $request): RedirectResponse
    {
        return redirect()->route('community.search', ['search' => $request->search])->with('success', 'Search results!');;
    }

    public function addFriend(Request $request, User $user): RedirectResponse
    {
        $loggedInUser = Auth()->user();

        if ($loggedInUser->isFriendWith($user)) {

            return redirect(route('community.search'))->with('warning', 'Already friends!');
        } else if ($loggedInUser->hasSentFriendRequestTo($user)) {

            return redirect(route('community.search'))->with('warning', 'Friend request already sent!');
        } else {

            $loggedInUser->befriend($user);
            return redirect(route('friends.index'))->with('success', 'Friend request sent!');
        }
    }
}
