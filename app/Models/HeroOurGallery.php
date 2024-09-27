<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class HeroOurGallery extends Model
{
    use HasFactory;

    protected $table = 'hero_our_gallery';

    protected $fillable = [
        'title',
        'subtitle',
        'image_url1',
        'title_image_url1',
        'image_url2',
        'title_image_url2',
        'image_url3',
        'title_image_url3',
    ];
}
