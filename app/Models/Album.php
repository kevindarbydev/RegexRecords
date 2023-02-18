<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Album extends Model
{
    use HasFactory;

    protected $fillable = [
        'album_name',
        'artist',
        'cover_image_url',
        'value',

    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
