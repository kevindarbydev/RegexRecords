<?php

namespace App\Models;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Wishlist extends Model
{
    use HasFactory;
    protected $fillable = [
        'list_name',
        
    ];
    public function user(): HasOne
    {
        return $this->hasOne(User::class);
    }
    public function wishlist_albums(): HasMany
    {
        return $this->hasMany(Wishlist_Album::class);
    }
}
