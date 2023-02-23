<?php

namespace App\Models;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    use HasFactory;
    protected $fillable = [
        'subtotal',
        'shipping',
        'tax',
        'totalPrice',

    ];
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
    public function order_item(): HasMany
    {
        return $this->hasMany(Order_Item::class);
    }
}
