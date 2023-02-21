<?php

namespace App\Models;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;


class Collection_Album extends Model
{
    use HasFactory;
    protected $fillable = [
        'for_sale',

    ];
    public function collection(): BelongsTo
    {
        return $this->belongsTo(Collection::class);
    }
    public function album(): BelongsTo
    {
        return $this->belongsTo(Album::class);
    }

}
