<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class HeaderMaklon extends Model
{
    use HasFactory;

    protected $table = 'header_maklon';

    protected $fillable = [
        'title',
        'description',
        'image_url',
    ];
}
