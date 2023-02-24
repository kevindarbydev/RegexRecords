<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;



class Conversation extends Model
{

    protected $table = 'conversations';

    protected $fillable = [        
        'sender',
        'recipient',
    ];
}
