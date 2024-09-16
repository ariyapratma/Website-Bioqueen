<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class HeroVideo extends Model
{
    use HasFactory;

    protected $table = 'hero_video';

    protected $fillable = [
        'title',
        'subtitle',
        'youtube_link',
    ];
}
