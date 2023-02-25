<?php

namespace App\Http\Controllers;

use App\Models\Conversation;
use App\Models\User;
use Carbon\Carbon;
use Cmgmyr\Messenger\Models\Message;
use Cmgmyr\Messenger\Models\Participant;
use Cmgmyr\Messenger\Models\Thread;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Request;
use Illuminate\Support\Facades\Session;
use Inertia\Inertia;
use Inertia\Response;
use Multicaret\Acquaintances\Traits\Friendable;
use Cmgmyr\Messenger\Traits\Messagable;


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

            $messagesByConversation[$conversationId] = [
                'messages' => $messages,
                'sender' => $sender->name,
                'recipient' => $recipient->name,
            ];

            //error_log("Content of messagesbyconversation: " . $conversationId . ": " . $messagesByConversation[$conversationId]);
        }
        return Inertia::render(
            'Messages/Index',
            [
                'conversations' => $conversations,
                'messagesByConversation' => $messagesByConversation,
                'friends' => $friends,
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
        error_log("here");
        //creating both objects for now
        $thread = Thread::create([
            'subject' => 'New Message',
        ]);

        $convo = Conversation::create([
            'sender' => Auth::id(),
            'recipient' => $userId,
            'threadId' => $thread->id,
        ]);


        return redirect()->back()->with('success', 'Item added successfully!');
    }

    /**
     * Adds a new message to a current thread.
     *
     * @param $id
     * @return mixed
     */
    public function update($threadId, $message)
    {
       

        // Message
        Message::create([
            'thread_id' => $threadId,
            'user_id' => Auth::id(),
            'body' => $message,
        ]);
        error_log("Message created with text: " . $message);
      
  

        return redirect()->back();
    }
}
