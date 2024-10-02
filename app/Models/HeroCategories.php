<?php

namespace App\Models;

use App\Models\Product;
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

    public function products()
    {
        return $this->hasMany(Product::class, 'category_id');
    }
}
