<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class OrderDetail extends Model
{
    use HasFactory;

    // Tentukan tabel yang akan digunakan
    protected $table = 'order_details';

    // Kolom-kolom yang dapat diisi melalui mass assignment
    protected $fillable = [
        'order_id',
        'recipient_name',
        'email',
        'province_id',
        'regency_id',
        'district_id',
        'village_id',
        'postal_code',
        'notes',
    ];

    // Relasi dengan model Order
    public function order()
    {
        return $this->belongsTo(Order::class);
    }
}
