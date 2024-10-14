<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Order;
use App\Models\HeaderOrder;
use Illuminate\Support\Facades\Auth;

class OrderController extends Controller
{

    public function __construct()
    {
        $this->middleware('auth');
    }

    public function index()
    {
        // Ambil semua pesanan pengguna yang terautentikasi dan load relasi produk
        $orders = Order::where('user_id', Auth::id())->with('product')->get();

        // Mengambil data produk dari pesanan
        $cartItems = $orders->map(function ($order) {
            return [
                'id' => $order->id,
                'product' => [
                    'name' => $order->product->name, // Menggunakan relasi product
                    'price' => $order->product->price,
                    'image_url' => $order->product->image_url,
                ],
                'quantity' => $order->quantity,
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
            'cartItems' => $cartItems,
            'orderInfo' => [
                'total_price' => $cartItems->sum(function ($item) {
                    return $item['product']['price'] * $item['quantity'];
                }),
                'item_count' => $cartItems->count(),
            ],
        ]);
    }
}
