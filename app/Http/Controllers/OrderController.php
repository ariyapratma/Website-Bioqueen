<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Order;
use App\Models\HeaderOrder;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class OrderController extends Controller
{
    public function index()
    {
        // Ambil pesanan dari pengguna yang terautentikasi
        $orders = Order::where('user_id', Auth::id())->get();

        // Mengambil semua item produk dari pesanan untuk keranjang
        $cartItems = $orders->map(function ($order) {
            return [
                'id' => $order->id,
                'product' => [
                    'name' => $order->product_name, // Kolom nama produk
                    'price' => $order->price, // Kolom harga produk
                    'image_url' => $order->product->image_url ?? null, // Kolom image URL produk
                ],
                'quantity' => $order->quantity, // Kolom jumlah
            ];
        });

        // Mengambil data dari tabel header_order
        $headerOrder = HeaderOrder::first();

        return Inertia::render('Order/Index', [
            'dataHeaderOrder' => $headerOrder,
            'orders' => $orders,
            'auth' => [
                'user' => Auth::user(),
            ],
            'cartItems' => $cartItems, // Tambahkan data cartItems
            'orderInfo' => [ // Masukkan informasi order tambahan
                'total_price' => $cartItems->sum(function ($item) {
                    return $item['product']['price'] * $item['quantity'];
                }), // Hitung total harga dari keranjang
                'item_count' => $cartItems->count(), // Hitung jumlah item
            ],
        ]);
    }
}
