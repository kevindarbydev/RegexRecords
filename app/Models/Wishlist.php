<?php

namespace App\Models;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Wishlist extends Model
{
    use HasFactory;
    protected $fillable = [
        'list_name',
    ];
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
    public function wishlist_albums(): HasMany
    {
        return $this->hasMany(Wishlist_Album::class);
    }
}
