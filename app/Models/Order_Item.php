<?php

namespace App\Models;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order_Item extends Model
{
    use HasFactory;
    protected $fillable = [
        'quantity',
        'price',

    ];
    public function order(): BelongsTo
    {
        return $this->belongsTo(Order::class);
    }
    public function album(): BelongsTo
    {
        return $this->belongsTo(Album::class);
    }
}
