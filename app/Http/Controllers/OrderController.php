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
                'name' => $order->product_name, // sesuaikan dengan kolom nama produk
                'price' => $order->price, // sesuaikan dengan kolom harga produk
                'quantity' => $order->quantity, // sesuaikan dengan kolom jumlah
            ];
        });

        // Mengambil data dari tabel header_order
        $headerOrder = HeaderOrder::first();
        return Inertia::render('Order/Index', [
            'dataHeaderOrder' => $headerOrder,
            'orders' => $orders,
            'cartItems' => $cartItems, // tambahkan ini

        ]);
    }
}
