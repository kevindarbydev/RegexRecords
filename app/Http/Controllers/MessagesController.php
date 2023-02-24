<?php

namespace App\Http\Controllers;

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
        $messages = Message::where('id', $user->id)->get();
        $threads = Thread::where('sender', $user->id)->get();
        $friends = $user->getFriendsList();

        return Inertia::render(
            'Messages/Index',
            [
                'messages' => $messages,
                'friends' => $friends,
                'threads' => $threads,
            ]
        );
    }

    /**
     * Shows a message thread.
     *
     * @param $id
     * @return mixed
     */
    public function show($id)
    {
        try {
            $thread = Thread::findOrFail($id);
        } catch (ModelNotFoundException $e) {
            Session::flash('error_message', 'The thread with ID: ' . $id . ' was not found.');

            return redirect()->route('messages');
        }

        // show current user in list if not a current participant
        // $users = User::whereNotIn('id', $thread->participantsUserIds())->get();

        // don't show the current user in list
        $userId = Auth::id();
        $users = User::whereNotIn('id', $thread->participantsUserIds($userId))->get();

        $thread->markAsRead($userId);

        return view('messenger.show', compact('thread', 'users'));
    }

    /**
     * Creates a new message thread.
     * currently used to display modal of users to create a new thread with
     * @return mixed
     */
    public function create()
    {
        $users = User::where('id', '!=', Auth::id())->get(); // get all users

        // // Get the IDs of the current user's friends
        // $user = auth()->user();
        // //$friends = $user->getFriendsList();

        // $nums[] = [1,2,3];

        // // Get the users with the friend IDs
        // $users = User::whereIn('id', $nums)
        // ->where('id', '!=', Auth::id())
        // ->get();
        // error_log($users);
        return response()->json($users);
    }

    /**
     * Stores a new message thread.
     * 
     *
     * @return mixed
     */
    public function store($userId)
    {


        $thread = Thread::create([
            'subject' => 'New Message',
            'sender' => Auth::id(),
            'recipient' => $userId,
        ]);

        // Message
        Message::create([
            'thread_id' => $thread->id,
            'user_id' => Auth::id(),
            'body' => 'test', //$input['message']
        ]);

        // Sender
        $thread->sender = Auth::id();
        $thread->recipient = $userId;
       



        return redirect()->route('messages');
    }

    // /**
    //  * Adds a new message to a current thread.
    //  *
    //  * @param $id
    //  * @return mixed
    //  */
    // public function update($id)
    // {
    //     try {
    //         $thread = Thread::findOrFail($id);
    //     } catch (ModelNotFoundException $e) {
    //         Session::flash('error_message', 'The thread with ID: ' . $id . ' was not found.');

    //         return redirect()->route('messages');
    //     }

    //     $thread->activateAllParticipants();

    //     // Message
    //     Message::create([
    //         'thread_id' => $thread->id,
    //         'user_id' => Auth::id(),
    //         'body' => Request::input('message'),
    //     ]);

    //     // Add replier as a participant
    //     $participant = Participant::firstOrCreate([
    //         'thread_id' => $thread->id,
    //         'user_id' => Auth::id(),
    //     ]);
    //     $participant->last_read = new Carbon();
    //     $participant->save();

    //     // Recipients
    //     if (Request::has('recipients')) {
    //         $thread->addParticipant(Request::input('recipients'));
    //     }

    //     return redirect()->route('messages.show', $id);
    // }
}
