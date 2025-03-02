<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Order;
use Midtrans\Snap;
use Midtrans\Config;
use Illuminate\Http\Request;
use App\Models\OrderInformation;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

class PaymentController extends Controller
{

    public function index()
    {
        try {
            $order = Order::where('user_id', Auth::id())
                ->whereIn('status', ['Approved'])
                ->firstOrFail();

            // Pastikan pesanan tidak dibatalkan
            if ($order->status === 'Cancelled') {
                return redirect()->back()->with('error', 'This order has been cancelled.');
            }

            // Ambil informasi order terkait dari tabel order_informations
            $orderInformation = OrderInformation::where('order_id', $order->id)->first();

            // Jika informasi pesanan belum ada, arahkan pengguna untuk melengkapi informasi
            if (!$orderInformation) {
                return redirect()->route('order.storeInformations')->with('error', 'Please complete your order information before proceeding to payment.');
            }

            // Validasi kelengkapan informasi pesanan
            if (
                empty($orderInformation->recipient_name) ||
                empty($orderInformation->email) ||
                empty($orderInformation->address) ||
                empty($orderInformation->postal_code)
            ) {
                return redirect()->back()->with('error', 'Please complete your order information before proceeding to payment.');
            }

            // Render halaman pembayaran
            return Inertia::render('Payment/Index', [
                'order' => $order,
                'orderInformation' => $orderInformation,
                'auth' => [
                    'user' => Auth::user(),
                ],
            ])->withViewData(['layout' => 'layouts.app']);
        } catch (\Exception $e) {
            Log::error("Payment Index Error: " . $e->getMessage());
            return redirect()->back()->with('error', 'Failed to load payment page. Please try again later.');
        }
    }

    public function store(Request $request)
    {
        try {
            // Cari order yang sedang diproses oleh user yang sedang login
            $order = Order::where('user_id', Auth::id())
                ->whereIn('status', ['Approved']) // Pastikan status valid
                ->firstOrFail();

            // Pastikan pesanan tidak dibatalkan
            if ($order->status === 'Cancelled') {
                return response()->json(['error' => 'This order has been cancelled'], 400);
            }

            // Ambil informasi order terkait
            $orderInformation = OrderInformation::where('order_id', $order->id)->firstOrFail();

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
                'order_id' => $order->id,
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

            return response()->json(['snap_token' => $snapToken]);
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

            return response()->json([
                'status' => $order->status,
            ]);
        } catch (\Exception $e) {
            Log::error("Error checking order status for order ID {$orderId}: " . $e->getMessage());
            return response()->json([
                'error' => 'Failed to check order status.',
            ], 500);
        }
    }
}
