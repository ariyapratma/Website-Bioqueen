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
            // Cari order yang sedang diproses oleh user yang sedang login
            $order = Order::where('user_id', Auth::id())
                ->where('status', 'Approved') // Pastikan status order adalah Approved
                ->first();

            if (!$order) {
                return response()->json(['error' => 'No order found for payment'], 404);
            }

            // Pastikan pesanan tidak dibatalkan
            if ($order->status === 'Cancelled') {
                return response()->json(['error' => 'This order has been cancelled'], 400);
            }

            // Ambil informasi order terkait
            $orderInformation = OrderInformation::where('order_id', $order->id)->first();

            if (!$orderInformation) {
                return response()->json(['error' => 'Order information not found. Please complete it before proceeding.'], 400);
            }

            // Validasi kelengkapan informasi pesanan
            if (
                empty($orderInformation->recipient_name) ||
                empty($orderInformation->email) ||
                empty($orderInformation->address) ||
                empty($orderInformation->postal_code)
            ) {
                return response()->json(['error' => 'Please complete your order information before proceeding to payment.'], 400);
            }

            // Pastikan total harga valid
            if ($order->total_price <= 0) {
                return response()->json(['error' => 'Invalid total price'], 400);
            }

            // Konfigurasi Midtrans
            Config::$serverKey = env('MIDTRANS_SERVER_KEY');
            Config::$isProduction = env('MIDTRANS_IS_PRODUCTION', false);
            Config::$isSanitized = true;
            Config::$is3ds = true;

            // Rincian transaksi
            $transactionDetails = [
                'order_id' => $order->id . '-' . time(), // Tambahkan timestamp agar unik
                'gross_amount' => $order->total_price,
            ];

            // Data pelanggan dan pengiriman
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

            // Generate Snap Token
            $snapToken = Snap::getSnapToken($transactionData);

            // Setelah token dibuat, ubah status order menjadi Processing
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
            // Cari pesanan berdasarkan ID
            $order = Order::where('id', $orderId)
                ->whereIn('status', ['Processing', 'Approved']) // Pastikan status valid
                ->firstOrFail(); // Gunakan firstOrFail untuk melempar exception jika tidak ditemukan

            // Ambil informasi order terkait
            $orderInformation = OrderInformation::where('order_id', $order->id)->first();

            // Validasi kelengkapan informasi pesanan
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
            ], 404); // Kembalikan respons 404 jika pesanan tidak ditemukan
        }
    }
}
