<?php

namespace App\Http\Controllers;

use App\Models\Conversation;
use App\Models\User;
use App\Mail\NewMessage;
use Carbon\Carbon;
use Cmgmyr\Messenger\Models\Message;
use Cmgmyr\Messenger\Models\Thread;
use Gloudemans\Shoppingcart\Facades\Cart;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Session;
use Illuminate\Support\Facades\Mail;
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
                    'senderId' => $sender->id,
                    'recipientId' => $recipient->id,
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
        $user1 = User::find($userId);
        $user2 = Auth::user();
        $subStr= "Conversation with: " . $user1->name . "+" . $user2->name;
        error_log($subStr);
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

        $thread = Thread::create([
            'subject' => $subStr,
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
        $notifyUser = $request->input('idForEmail');
        error_log("Found id: " . $notifyUser);
        $user = User::findOrFail($notifyUser);
         error_log("Found user: " . $user->name);
        $newMsg = Message::create([
            'thread_id' => $threadId,
            'user_id' => Auth::id(),
            'body' => $message,
        ]);
        Mail::to($user->email)->send(new NewMessage($user));
        return $newMsg;
    }

    //deletes selected conversation and all related entities
    public function delete($threadId){       
        $thread = Thread::find($threadId);
        $thread->delete();

        $convo = Conversation::where('threadId', $threadId)->first();
        if (!$convo){
            error_log("trying to delete a conversation that doesnt exist");
            return;
        }
        $convo->delete();

        Message::where('thread_id', $threadId)->delete();

        error_log("Deleted conversation #" . $threadId);

        return response()->json(['message' => 'Conversation deleted successfully.'], 200);

    }

    public function contactSeller(Request $request): RedirectResponse
    {
        $conversationlist = Conversation::all();

        $conversation = new Conversation();
        $conversation->sender = Auth::id();
        $conversation->recipient = $request-> seller;
        $conversation->threadid = 1;
        $conversation->album_id = $request -> album;

        $album_id = $request->album;
        $duplicate = Conversation::where('album_id', $album_id)->count();

        if ($duplicate ==0){

            $request->user()->conversations()->save($conversation);
            
            return redirect()->route('messages.show');

        }

        return redirect()->route('marketplace.index');

    }
}
