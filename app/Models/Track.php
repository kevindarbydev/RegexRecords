<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Track extends Model
{
    use HasFactory;

    protected $fillable = ['track_number', 'title', 'duration'];

    public function tracklist()
    {
        return $this->belongsTo(Tracklist::class);
    }
 

}
