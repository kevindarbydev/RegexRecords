<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Review extends Model
{
    use HasFactory;
    protected $fillable = [
        'rating',
        'content',
    ];
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
    
    public function albums(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}