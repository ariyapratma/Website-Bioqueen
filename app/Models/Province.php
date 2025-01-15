<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Province extends Model
{
    use HasFactory;

    // Tentukan primary key jika bukan id
    protected $primaryKey = 'id';

    // Primary key bukan auto increment
    public $incrementing = false;

    // Tipe primary key
    protected $keyType = 'string';

    // Tentukan field yang boleh diisi
    protected $fillable = ['id', 'name'];
}
