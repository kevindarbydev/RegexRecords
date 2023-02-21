<?php

namespace App\Models;
use Illuminate\Database\Eloquent\Relations\HasMany;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Collection extends Model
{
    use HasFactory;
    protected $fillable = [
        'collection_name',
    ];
    public function user(): HasOne
    {
        return $this->hasOne(User::class);
    }
    public function collection_albums(): HasMany
    {
        return $this->hasMany(Collection_Album::class);
    }

}
