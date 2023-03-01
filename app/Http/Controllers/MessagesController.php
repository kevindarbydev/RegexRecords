<?php

namespace App\Http\Controllers;

use App\Models\Conversation;
use App\Models\User;
use Carbon\Carbon;
use Cmgmyr\Messenger\Models\Message;
use Cmgmyr\Messenger\Models\Thread;
use Gloudemans\Shoppingcart\Facades\Cart;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Session;
use Inertia\Inertia;
use Inertia\Response;


class MessagesController extends Controller
{
    /**
     * Show all of the message threads to the user.
     *
     * @return mixed
     */
    public function index(): Response
    {

        $user = auth()->user();

        $friends = $user->getFriendsList();

        //conversation lets us get threadId and sender/recipient information
        $conversations = Conversation::where('sender', $user->id)
            ->orWhere('recipient', $user->id)
            ->get();

        // Retrieve the message threads for the conversations
        $threads = Thread::whereIn('id', $conversations->pluck('threadId')->toArray())->get();

        // Retrieve the messages for each thread and group them by conversation
        $messagesByConversation = [];
        foreach ($threads as $thread) {
            $messages = Message::where('thread_id', $thread->id)->get();
            $conversation = $conversations->where('threadId', $thread->id)->first();
            $conversationId = $conversation->id;
            $sender = User::find($conversation->sender);
            $recipient = User::find($conversation->recipient);
            if ($sender && $recipient) {
                $messagesByConversation[$conversationId] = [
                    'messages' => $messages,
                    'sender' => $sender->name,
                    'recipient' => $recipient->name,
                ];
            }
            error_log("Found a thread with a user that has been deleted --- continuing.");
        }
        return Inertia::render(
            'Messages/Index',
            [
                'conversations' => $conversations,
                'messagesByConversation' => $messagesByConversation,
                'friends' => $friends,
                'currentUserId' => $user->id,
                'cartCount' => Cart::count(),
            ]
        );
    }


    /**
     * Creates a new message thread.
     * currently used to display modal of users to create a new thread with
     * @return mixed
     */
    public function create()
    {
        //$users = User::where('id', '!=', Auth::id())->get(); // get all users


        $friends = Auth::user()->getFriendsList(); //display only friends to message


        return response()->json($friends);
    }

    /**
     * Stores a new message thread.
     * 
     *
     * @return mixed
     */
    public function store($userId)
    {

        // Check if conversation already exists between the current user and the second user
        $conversationExists = Conversation::where(function ($query) use ($userId) {
            $query->where('sender', Auth::id())
                ->where('recipient', $userId);
        })->orWhere(function ($query) use ($userId) {
            $query->where('sender', $userId)
                ->where('recipient', Auth::id());
        })->exists();

        if ($conversationExists) {
            return response()->json([
                'errors' => 'Conversation already exists'
            ]);
        }


        //creating both objects for now
        $thread = Thread::create([
            'subject' => 'New Message',
        ]);

        $convo = Conversation::create([
            'sender' => Auth::id(),
            'recipient' => $userId,
            'threadId' => $thread->id,
        ]);

        return response()->json([
            'conversation' => $convo,
        ]);
    }
    /*
      *
      *  Adds a new message to the conversation
      *  temporarily returning all msgs in the conversation
      */
    public function update(Request $request)
    {

        $message = $request->input('message');
        $threadId = $request->input('threadId');


        // Message
        $newMsg = Message::create([
            'thread_id' => $threadId,
            'user_id' => Auth::id(),
            'body' => $message,
        ]);

        $allMessages = Message::where('thread_id', $threadId)->get();
        foreach ($allMessages as $mzg) {
            error_log($mzg);
        }


        return $allMessages;
    }
}
