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
        'product_id',
        'recipient_name',
        'email',
        'notes',
        'address',
        'postal_code',
        'notes',
    ];

    // Relasi dengan model Order
    public function order()
    {
        return $this->belongsTo(Order::class);
    }

    public function product()
    {
        return $this->belongsTo(Product::class);
    }

    public function cart()
    {
        return $this->belongsTo(Cart::class);
    }
}
