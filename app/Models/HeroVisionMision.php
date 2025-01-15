<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class HeroVisionMision extends Model
{
    use HasFactory;

    protected $table = 'hero_vision_mision';

    protected $fillable = [
        'title',
        'subtitle',
        'description1',
        'description2',
        'description3',
        'description4',
        'description5',
        'description6',
        'image_url',
    ];
}
