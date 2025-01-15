<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class HeroCompany extends Model
{
    use HasFactory;

    protected $table = 'hero_company';

    protected $fillable = [
        'image_url',
        'youtube_link',
        'title',
        'description',
    ];
}
