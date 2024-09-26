<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class HeroAboutUs extends Model
{
    use HasFactory;

    protected $table = 'hero_about_us';

    protected $fillable = [
        'title',
        'description1',
        'description2',
        'description3',
        'image_url',
    ];
}
