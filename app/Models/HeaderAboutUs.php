<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class HeaderAboutUs extends Model
{
    use HasFactory;

    protected $table = 'header_about_us';

    protected $fillable = [
        'title',
        'description',
        'image_url',
    ];
}
