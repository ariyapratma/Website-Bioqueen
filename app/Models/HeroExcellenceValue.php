<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class HeroExcellenceValue extends Model
{
    use HasFactory;

    protected $table = 'hero_excellence_value';

    protected $fillable = [
        'title',
        'subtitle',
        'heading1',
        'content1',
        'heading2',
        'content2',
        'heading3',
        'content3',
        'heading4',
        'content4',
    ];
}
