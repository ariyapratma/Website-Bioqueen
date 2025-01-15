<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class HeaderHome extends Model
{
    use HasFactory;

    protected $table = 'header_home';

    protected $fillable = [
        'title',
        'description',
        'image_url',
        'whatsapp_link'
    ];
}
