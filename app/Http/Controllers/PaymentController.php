<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Order;
use Midtrans\Snap;
use Midtrans\Config;
use Illuminate\Http\Request;
use App\Models\OrderInformation;
use Illuminate\Support\Facades\Auth;

class PaymentController extends Controller
{
    public function index($orderId)
    {
        $order = Order::findOrFail($orderId);
        $orderInformation = OrderInformation::findOrFail($orderId);
        $totalPrice = optional($order->orderItems)->sum(function ($item) {
            return $item->price * $item->quantity;
        });
        return Inertia::render('Payment/Index', [
            'order' => $order,
            'orderItems' => $order->orderItems,
            'orderInformation' => $orderInformation,
            'totalPrice' => $totalPrice,
            'cartItems' => $order->orderItems,
            'auth' => [
                'user' => Auth::user(),
            ],
        ])->withViewData(['layout' => 'layouts.app']);
    }

    // public function store(Request $request, $orderId)
    // {
    //     // Cari order dan informasi order terkait
    //     $order = Order::with('orderItems')->findOrFail($orderId);
    //     $orderInformation = OrderInformation::where('order_id', $orderId)->firstOrFail();

    //     // Hitung total harga dari orderItems
    //     $totalPrice = $order->orderItems->sum(function ($item) {
    //         return $item->price * $item->quantity;
    //     });

    //     // Pastikan total harga valid
    //     if ($totalPrice <= 0) {
    //         return response()->json(['error' => 'Invalid total price'], 400);
    //     }

    //     // Konfigurasi Midtrans
    //     Config::$serverKey = env('MIDTRANS_SERVER_KEY');
    //     Config::$isProduction = env('MIDTRANS_IS_PRODUCTION', false);
    //     Config::$isSanitized = true;
    //     Config::$is3ds = true;

    //     // Rincian transaksi
    //     $transactionDetails = [
    //         'order_id' => $order->id,
    //         'gross_amount' => $totalPrice,
    //     ];

    //     // Data pelanggan dan pengiriman
    //     $transactionData = [
    //         'transaction_details' => $transactionDetails,
    //         'customer_details' => [
    //             'first_name' => $orderInformation->recipient_name,
    //             'email' => $orderInformation->email,
    //             'phone' => $orderInformation->phone ?? '081234567890', // Default jika phone kosong
    //             'shipping_address' => [
    //                 'address' => $orderInformation->address,
    //                 'city' => $orderInformation->city ?? 'Unknown City',
    //                 'postal_code' => $orderInformation->postal_code,
    //             ],
    //         ],
    //     ];

    //     try {
    //         // Generate Snap Token
    //         $snapToken = Snap::getSnapToken($transactionData);

    //         // Kembalikan Snap Token ke frontend
    //         return response()->json(['snap_token' => $snapToken]);
    //     } catch (\Exception $e) {
    //         // Tangkap error jika terjadi masalah dengan Midtrans API
    //         return response()->json([
    //             'error' => 'Failed to generate Snap Token',
    //             'message' => $e->getMessage(),
    //         ], 500);
    //     }
    // }

    public function store(Request $request, $orderId)
    {
        try {
            $order = Order::findOrFail($orderId);

            // Hit API Midtrans
            $params = [
                'transaction_details' => [
                    'order_id' => $order->id,
                    'gross_amount' => $request->input('total_price'),
                ],
                'customer_details' => [
                    'first_name' => $order->recipient_name,
                    'email' => $order->email,
                ],
            ];

            $snapToken = \Midtrans\Snap::getSnapToken($params);

            return response()->json(['snap_token' => $snapToken]);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }
}
