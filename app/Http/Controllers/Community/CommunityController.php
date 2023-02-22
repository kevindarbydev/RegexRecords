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
        //TODO:
        // prevent "add friend" button if friend is already added
        $users = User::where(function ($query) use ($request) {
            $query->where('name', 'LIKE', '%' . $request->search . '%')
                ->orWhere('email', 'LIKE', '%' . $request->search . '%');
        })
            ->where(function ($query) {
                $query->where('id', '!=', Auth::user()->id); //preventing logged in user from showing up as querry
            })
            ->latest()->get();
        return Inertia::render('Community/Search', [
            'users' => $users
        ]);
    }

    public function searchPost(Request $request): RedirectResponse
    {
        return redirect()->route('community.search', ['search' => $request->search]);
    }

    public function addFriend(Request $request): RedirectResponse
    {
        $user = Auth()->user();
        $friend = User::where('name', $request->name)->first();

        $user->befriend($friend);


        return redirect(route('friends.index'));
    }
}
