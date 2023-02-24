<?php

use Illuminate\Database\Eloquent\Model;

namespace App\Models;

class Conversation extends Model
{

    protected $table = 'conversations';

    protected $fillable = [        
        'sender',
        'recipient',
    ];
}
