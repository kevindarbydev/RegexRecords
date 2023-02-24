<?php

namespace App\Models;

use Cmgmyr\Messenger\Models\Thread;

class Conversation extends Thread
{
    protected $fillable = [
        'subject',
        'sender_id',
        'recipient_id',
    ];
}
