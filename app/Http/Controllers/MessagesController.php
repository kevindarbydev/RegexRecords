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
 
        $messages = Message::all();

        $user = auth()->user();
       
        $friends = $user->getFriendsList();
   
        // // create a new thread
        // $thread = Thread::create(['subject' => 'Test Thread']);

        // // add users to the thread
        // $thread->addParticipant(auth()->user()->id);
        

        // // send a message
        // $message = Message::create([
        //         'thread_id' => $thread->id,
        //         'user_id' => auth()->user()->id,
        //         'body' => 'Test Message'
        //     ]);

        return Inertia::render('Messages/Index',
        [
            'messages' => $messages,
            'friends' => $friends,
        ]
    );
    }

    // /**
    //  * Shows a message thread.
    //  *
    //  * @param $id
    //  * @return mixed
    //  */
    // public function show($id)
    // {
    //     try {
    //         $thread = Thread::findOrFail($id);
    //     } catch (ModelNotFoundException $e) {
    //         Session::flash('error_message', 'The thread with ID: ' . $id . ' was not found.');

    //         return redirect()->route('messages');
    //     }

    //     // show current user in list if not a current participant
    //     // $users = User::whereNotIn('id', $thread->participantsUserIds())->get();

    //     // don't show the current user in list
    //     $userId = Auth::id();
    //     $users = User::whereNotIn('id', $thread->participantsUserIds($userId))->get();

    //     $thread->markAsRead($userId);

    //     return view('messenger.show', compact('thread', 'users'));
    // }

    // /**
    //  * Creates a new message thread.
    //  *
    //  * @return mixed
    //  */
    // public function create()
    // {
    //     $users = User::where('id', '!=', Auth::id())->get();

    //     return view('messenger.create', compact('users'));
    // }

    // /**
    //  * Stores a new message thread.
    //  *
    //  * @return mixed
    //  */
    // public function store()
    // {
    //     $input = Request::all();

    //     $thread = Thread::create([
    //         'subject' => $input['subject'],
    //     ]);

    //     // Message
    //     Message::create([
    //         'thread_id' => $thread->id,
    //         'user_id' => Auth::id(),
    //         'body' => $input['message'],
    //     ]);

    //     // Sender
    //     Participant::create([
    //         'thread_id' => $thread->id,
    //         'user_id' => Auth::id(),
    //         'last_read' => new Carbon(),
    //     ]);

    //     // Recipients
    //     if (Request::has('recipients')) {
    //         $thread->addParticipant($input['recipients']);
    //     }

    //     return redirect()->route('messages');
    // }

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
