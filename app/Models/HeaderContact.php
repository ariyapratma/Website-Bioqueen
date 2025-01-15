<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class HeaderContact extends Model
{
    use HasFactory;

    protected $table = 'header_contact';

    protected $fillable = [
        'title',
        'description',
        'image_url',
    ];
}
