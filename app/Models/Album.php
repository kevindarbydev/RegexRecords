<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Relations\HasMany;

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
        'genre',
        'year_of_release',
        'value',
        'discogs_album_id',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
    public function tracklist()
    {
        return $this->hasOne(Tracklist::class);
    }
    public function collection_albums(): HasMany
    {
        return $this->hasMany(Collection_Album::class);
    }
}
