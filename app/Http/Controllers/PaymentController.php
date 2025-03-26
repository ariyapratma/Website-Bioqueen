<?php

namespace App\Http\Controllers;

use App\Models\Order;
use Midtrans\Snap;
use Midtrans\Config;
use Illuminate\Http\Request;
use App\Models\OrderInformation;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

class PaymentController extends Controller
{
    public function store(Request $request)
    {
        try {
            $order = Order::where('user_id', Auth::id())
                ->where('status', 'Approved')
                ->first();

            if (!$order) {
                return response()->json(['error' => 'No order found for payment'], 404);
            }

            if ($order->status === 'Cancelled') {
                return response()->json(['error' => 'This order has been cancelled'], 400);
            }

            $orderInformation = OrderInformation::where('order_id', $order->id)->first();

            if (!$orderInformation) {
                return response()->json(['error' => 'Order information not found. Please complete it before proceeding.'], 400);
            }

            if (
                empty($orderInformation->recipient_name) ||
                empty($orderInformation->email) ||
                empty($orderInformation->address) ||
                empty($orderInformation->postal_code)
            ) {
                return response()->json(['error' => 'Please complete your order information before proceeding to payment.'], 400);
            }

            if ($order->total_price <= 0) {
                return response()->json(['error' => 'Invalid total price'], 400);
            }

            Config::$serverKey = env('MIDTRANS_SERVER_KEY');
            Config::$isProduction = env('MIDTRANS_IS_PRODUCTION', false);
            Config::$isSanitized = true;
            Config::$is3ds = true;

            $transactionDetails = [
                'order_id' => $order->id . '-' . time(),
                'gross_amount' => $order->total_price,
            ];

            $transactionData = [
                'transaction_details' => $transactionDetails,
                'customer_details' => [
                    'first_name' => $orderInformation->recipient_name,
                    'email' => $orderInformation->email,
                    'phone' => $orderInformation->phone ?? 'N/A',
                    'shipping_address' => [
                        'address' => $orderInformation->address,
                        'city' => $orderInformation->city ?? 'N/A',
                        'postal_code' => $orderInformation->postal_code,
                    ],
                ],
            ];

            $snapToken = Snap::getSnapToken($transactionData);
            $order->update(['status' => 'Processing']);

            return response()->json([
                'snap_token' => $snapToken,
                'status' => 'Processing'
            ]);
        } catch (\Exception $e) {
            Log::error("Payment Store Error: " . $e->getMessage());
            return response()->json([
                'error' => 'Failed to generate Snap Token',
                'message' => $e->getMessage(),
            ], 500);
        }
    }


    public function checkOrderStatus($orderId)
    {
        try {
            $order = Order::where('id', $orderId)
                ->whereIn('status', ['Processing', 'Approved'])
                ->firstOrFail();

            $orderInformation = OrderInformation::where('order_id', $order->id)->first();

            $isComplete = $orderInformation &&
                !empty($orderInformation->recipient_name) &&
                !empty($orderInformation->email) &&
                !empty($orderInformation->address) &&
                !empty($orderInformation->postal_code);

            return response()->json([
                'status' => $order->status,
                'is_complete' => $isComplete,
            ]);
        } catch (\Exception $e) {
            Log::error("Error checking order status for order ID {$orderId}: " . $e->getMessage());
            return response()->json([
                'error' => 'Order not found.',
            ], 404);
        }
    }
}
