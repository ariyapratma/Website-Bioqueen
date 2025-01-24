<?php

namespace App\Http\Controllers;

use App\Models\Order;
use Illuminate\Http\Request;
use Midtrans\Transaction;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

class PaymentController extends Controller
{
    public function index($orderId)
    {
        $order = Order::findOrFail($orderId);
        $totalPrice = optional($order->orderItems)->sum(function ($item) {
            return $item->price * $item->quantity;
        });
        return Inertia::render('Payment/Index', [
            'order' => $order,
            'orderItems' => $order->orderItems,
            'totalPrice' => $totalPrice,
            'cartItems' => $order->orderItems,
            'auth' => [
                'user' => Auth::user(),
            ],
        ]);
    }


    public function process(Request $request)
    {
        $order = Order::findOrFail($request->order_id);
        $transaction = Transaction::status($order->transaction_id);

        // Set your Merchant Server Key
        \Midtrans\Config::$serverKey = config('midtrans.serverKey');
        // Set to Development/Sandbox Environment (default). Set to true for Production Environment (accept real transaction).
        \Midtrans\Config::$isProduction = false;
        // Set sanitization on (default)
        \Midtrans\Config::$isSanitized = true;
        // Set 3DS transaction for credit card to true
        \Midtrans\Config::$is3ds = true;

        $params = array(
            'transaction_details' => array(
                'order_id' => rand(),
                'gross_amount' => $order->total_price,
            ),
            'customer_details' => array(
                'first_name' => $order->recipient_name,
                'email' => $order->email,
                'shipping_address' => array(
                    'address' => $order->address,
                    'city' => $order->city,
                    'postal_code' => $order->postal_code,
                ),
            ),
        );

        $snapToken = \Midtrans\Snap::getSnapToken($params);
        $order->snap_token = $snapToken;
        $order->save();

        return Inertia::render('Payment/Index', [
            'order' => $order,
            'orderItems' => $order->orderItems,
            'totalPrice' => $order->total_price,
            'cartItems' => $order->orderItems,
        ]);
    }
}
