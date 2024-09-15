<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class HeroMaklonValue extends Model
{
    use HasFactory;

    protected $table = 'hero_maklon_value';

    protected $fillable = [
        'title',
        'heading1',
        'content1',
        'image_url1',
        'heading2',
        'content2',
        'image_url2',
    ];
}
