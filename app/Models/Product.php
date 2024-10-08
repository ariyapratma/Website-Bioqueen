<?php

namespace App\Models;

use Illuminate\Support\Str;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Product extends Model
{
    use HasFactory;

    protected $table = 'products';

    protected $fillable = [
        'category_id',
        'slug',
        'image_url',
        'name',
        'description',
        'price',
    ];

    // Relasi ke kategori
    public function category()
    {
        return $this->belongsTo(HeroCategories::class, 'category_id');
    }

    // Setter untuk otomatis membuat slug berdasarkan nama
    public function setNameAttribute($value)
    {
        $this->attributes['name'] = $value;
        $this->attributes['slug'] = Str::slug($value); // Otomatis membuat slug dari nama produk
    }
}
