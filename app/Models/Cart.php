<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Cart extends Model
{
    use HasFactory;

    // Tentukan tabel yang digunakan jika tidak mengikuti konvensi penamaan Laravel
    protected $table = 'carts';

    // Kolom yang bisa diisi
    protected $fillable = [
        'user_id',        // ID pengguna yang memiliki keranjang
        'product_id',     // ID produk yang ditambahkan ke keranjang
        'quantity',       // Jumlah produk yang ditambahkan
        'price',          // Harga produk saat ditambahkan ke keranjang
    ];

    // Relasi ke pengguna (user)
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    // Relasi ke produk (product)
    public function product()
    {
        return $this->belongsTo(Product::class);
    }

    // Metode untuk menghitung total harga item dalam keranjang
    public function getTotalPriceAttribute()
    {
        return $this->quantity * $this->price;
    }

    public function orderDetails()
    {
        return $this->hasMany(OrderDetail::class);
    }
}
