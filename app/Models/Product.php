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

    public function category()
    {
        return $this->belongsTo(HeroCategories::class, 'category_id');
    }

    public function orders()
    {
        return $this->hasMany(Order::class);
    }

    public function setNameAttribute($value)
    {
        $this->attributes['name'] = $value;
        $this->attributes['slug'] = Str::slug($value);
    }

    public function notifications()
    {
        return $this->hasMany(Notification::class);
    }
}
