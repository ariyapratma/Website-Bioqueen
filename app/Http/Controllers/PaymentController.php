<?php

namespace App\Http\Controllers;

use App\Models\OrderInformation;
use Illuminate\Http\Request;
use Midtrans\Snap;
use Midtrans\Config;
use Midtrans\Transaction;
use Inertia\Inertia;

class PaymentController extends Controller
{
    public function __construct()
    {
        // Set your server key
        Config::$serverKey = config('midtrans.server_key');
        Config::$clientKey = config('midtrans.client_key');
        Config::$isProduction = config('midtrans.is_production');
        Config::$isSanitized = true;
        Config::$is3ds = true;
    }

    public function index($orderId)
    {
        // Ambil data order dari database
        $order = OrderInformation::findOrFail($orderId);

        // Kirim data order ke halaman React menggunakan Inertia
        return Inertia::render('Payment/Payment', [
            'order' => $order,
        ]);
    }

    public function createTransaction(Request $request)
    {
        $orderId = $request->order_id;
        $order = OrderInformation::findOrFail($orderId);

        // Create transaction params
        $params = [
            'transaction_details' => [
                'order_id' => 'order-' . $order->id,
                'gross_amount' => $order->total_amount, // Anda bisa menambahkan logika untuk menghitung total_amount
            ],
            'customer_details' => [
                'first_name' => $order->recipient_name,
                'email' => $order->email,
                'shipping_address' => [
                    'address' => $order->address,
                    'city' => $order->city ?? '',
                    'postal_code' => $order->postal_code,
                ],
            ],
        ];

        try {
            $snapToken = Snap::getSnapToken($params);
            return response()->json([
                'token' => $snapToken
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
