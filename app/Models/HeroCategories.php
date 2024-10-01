<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class HeroCategories extends Model
{
    use HasFactory;

    protected $table = 'categories';

    protected $fillable = [
        'slug',
        'image_url',
        'name',
        'description_categories',
    ];
}
