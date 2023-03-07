<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;


class Conversation extends Model
{

    protected $table = 'conversations';
    protected $fillable = [
        'sender',
        'recipient',
        'threadId',
        'album_id',
    ];
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
    public function albums(): BelongsTo
    {
        return $this->belongsTo(Album::class);
    }
}
