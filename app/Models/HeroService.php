<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class HeroService extends Model
{
    use HasFactory;

    protected $table = 'hero_service';

    protected $fillable = [
        'title',
        'image_url',
        'heading1',
        'content1',
        'heading2',
        'content2',
        'heading3',
        'content3',
    ];
}
