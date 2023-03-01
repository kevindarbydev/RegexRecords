<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Relations\HasMany;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Multicaret\Acquaintances\Traits\CanBeRated;

class Album extends Model
{
    use HasFactory, CanBeRated;

    protected $fillable = [
        'album_name',
        'artist',
        'cover_image_url',
        'genre',
        'subgenres',
        'year_of_release',
        'value',
        'discogs_album_id',
    ];
    protected $casts = [
        'subgenres' => 'array',
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
    public function wishlist_albums(): HasMany
    {
        return $this->hasMany(Wishlist_Album::class);
    }
    public function reviews(): HasMany
    {
        return $this->hasMany(Wishlist_Album::class);
    }
    public function order_item(): HasMany
    {
        return $this->hasMany(Order_Item::class);
    }
}
