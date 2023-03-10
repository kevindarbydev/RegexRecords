<?php

namespace App\Http\Controllers;


use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Http;
use App\Models\User;
use App\Models\Album;
use Cmgmyr\Messenger\Models\Message;
use Gloudemans\Shoppingcart\Facades\Cart;


class AdminController extends Controller
{

    public function index()
    {
        $cartCount = Cart::count();
        $user = auth()->user();
        //retrieve everything on index and switch between tables
        $users = User::all();
        $albums = Album::with('user')->orderByDesc('created_at')->get();
        $messages = Message::all();
        return Inertia::render('Admin/AdminPage', [
            'users' => $users,
            'albums' => $albums,
            'messages' => $messages,
            'currentUser' => $user->id,
            'cartCount' => $cartCount,
        ]);
    }

    public function deleteAlbum($album_id)
    {
        $album = Album::find($album_id);
        error_log("Deleting album ID:{" . $album_id . "} , NAME:{" . $album->album_name . "}");
        $album->delete();
        return response()->json(['success' => true]);
    }

    public function deleteUser($user_id)
    {
        $user = User::find($user_id);
        error_log("Deleting user ID:{" . $user_id . "} , NAME:{" . $user->name . "}");
        $user->delete();
        return response()->json(['success' => true]);
    }

    public function deleteMessage($message_id)
    {
        $msg = Message::find($message_id);
        error_log("Deleting message ID:{" . $message_id . "} , CONTENT:{" . $msg->body . "}");
        $msg->delete();
        return response()->json(['success' => true]);
    }
}
