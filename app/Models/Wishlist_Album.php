<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Wishlist_Album extends Model
{
    use HasFactory;

    public function wishlist(): BelongsTo
    {
        return $this->belongsTo(Wishlist::class);
    }
    public function album(): BelongsTo
    {
        return $this->belongsTo(Album::class);
    }
}
