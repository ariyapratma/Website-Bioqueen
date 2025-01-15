<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class HeroReview extends Model
{
    use HasFactory;

    protected $table = 'hero_review';

    protected $fillable = ['user_id', 'name', 'avatar', 'rating', 'comment'];
}
