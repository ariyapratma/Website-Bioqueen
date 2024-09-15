<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class HeroTeamValue extends Model
{
    use HasFactory;

    protected $table = 'hero_team_value';

    protected $fillable = [
        'title',
        'subtitle',
        'heading1',
        'content1',
        'heading2',
        'content2',
        'image_url1',
        'image_url2',
    ];
}
