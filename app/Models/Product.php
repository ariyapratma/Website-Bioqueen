<?php

namespace App\Models;

use App\Models\HeroCategories;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Product extends Model
{
    use HasFactory;
    
    protected $fillable = ['name', 'price', 'description', 'category_id'];

    public function category()
    {
        return $this->belongsTo(HeroCategories::class, 'category_id');
    }
}
