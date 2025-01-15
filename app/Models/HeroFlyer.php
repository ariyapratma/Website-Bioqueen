<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class HeroFlyer extends Model
{
    use HasFactory;

    protected $table = 'hero_flyer';

    protected $fillable = [
        'image_url',
    ];
}
