<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class HeroCertificate extends Model
{
    use HasFactory;

    protected $table = 'hero_certificate';

    protected $fillable = [
        'title',
        'subtitle',
        'image_url1',
        'image_url2',
        'image_url3',
        'image_url4',
        'image_url5',
    ];
}
