<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class HeroCategories extends Model
{
    use HasFactory;

    protected $table = 'hero_categories';

    protected $fillable = [
        'slug',
        'image_url',
        'name',
        'description_categories',
    ];

    // Mendapatkan slug untuk URL
    public function getRouteKeyName()
    {
        return 'slug';
    }

    // Relasi ke produk
    public function products()
    {
        return $this->hasMany(Product::class, 'category_id');
    }
}
