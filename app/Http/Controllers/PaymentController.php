<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Order;
use Midtrans\Transaction;
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

    public function process(Request $request)
    {
        // Find order based on ID
        $order = Order::findOrFail($request->order_id);

        // Midtrans configuration using .env variables
        \Midtrans\Config::$serverKey = 'SB-Mid-server-v_CWiXT88eK2aWCna2pmraKe';
        \Midtrans\Config::$clientKey = 'SB-Mid-client-rt_DUdvnps2sazPn';
        \Midtrans\Config::$isProduction = false;
        \Midtrans\Config::$isSanitized = true;
        \Midtrans\Config::$is3ds = true;

        // Parameters for Midtrans transaction
        $params = [
            'transaction_details' => [
                'order_id' => $order->id, // Use the order ID as order_id
                'gross_amount' => $order->total_price, // Total price
            ],
            'customer_details' => [
                'first_name' => $order->recipient_name,
                'email' => $order->email,
                'shipping_address' => [
                    'address' => $order->address,
                    'city' => $order->city,
                    'postal_code' => $order->postal_code,
                ],
            ],
        ];

        // Generate Snap Token
        $snapToken = \Midtrans\Snap::getSnapToken($params);

        // Save the Snap Token in the database (optional)
        $order->snap_token = $snapToken;
        $order->save();
    }
}
