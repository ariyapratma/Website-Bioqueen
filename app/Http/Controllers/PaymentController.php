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
    //     try {
    //         // Cari order berdasarkan ID
    //         $order = Order::findOrFail($orderId);
    //         $orderInformation = OrderInformation::where('order_id', $orderId)->firstOrFail();

    //         // Validasi harga total
    //         $totalPrice = $request->input('total_price');
    //         if ($totalPrice <= 0) {
    //             return response()->json(['error' => 'Invalid total price'], 400);
    //         }

    //         // Konfigurasi Midtrans
    //         Config::$serverKey = env('MIDTRANS_SERVER_KEY');
    //         Config::$isProduction = env('MIDTRANS_IS_PRODUCTION', false);
    //         Config::$isSanitized = env('MIDTRANS_IS_SANITIZED', true);
    //         Config::$is3ds = env('MIDTRANS_IS_3DS', true);

    //         // Rincian transaksi
    //         $transactionDetails = [
    //             'order_id' => $order->id,
    //             'gross_amount' => $totalPrice,
    //         ];

    //         // Data pelanggan dan alamat pengiriman
    //         $customerDetails = [
    //             'first_name' => $orderInformation->recipient_name,
    //             'email' => $orderInformation->email,
    //             'phone' => $orderInformation->phone ?? '081234567890', // Default jika phone kosong
    //             'shipping_address' => [
    //                 'address' => $orderInformation->address,
    //                 'city' => $orderInformation->city ?? 'Unknown City',
    //                 'postal_code' => $orderInformation->postal_code,
    //             ],
    //         ];

    //         // Persiapkan data transaksi lengkap
    //         $transactionData = [
    //             'transaction_details' => $transactionDetails,
    //             'customer_details' => $customerDetails,
    //         ];

    //         // Generate Snap Token
    //         $snapToken = Snap::getSnapToken($transactionData);

    //         // Kembalikan Snap Token ke frontend
    //         return response()->json(['snap_token' => $snapToken]);
    //     } catch (\Exception $e) {
    //         // Tangkap error dan kembalikan pesan kesalahan
    //         return response()->json([
    //             'error' => 'Failed to generate Snap Token',
    //             'message' => $e->getMessage(),
    //         ], 500);
    //     }
    // }

    // public function store(Request $request, $orderId)
    // {
    //     try {
    //         $order = Order::findOrFail($orderId);
    //         $orderInformation = OrderInformation::where('order_id', $orderId)->firstOrFail();

    //         // Midtrans Configuration
    //         \Midtrans\Config::$serverKey = env('MIDTRANS_SERVER_KEY');
    //         \Midtrans\Config::$isProduction = env('MIDTRANS_IS_PRODUCTION', false);
    //         \Midtrans\Config::$isSanitized = true;
    //         \Midtrans\Config::$is3ds = true;

    //         // Transaction Details
    //         $transactionDetails = [
    //             'order_id' => $order->id,
    //             'gross_amount' => $order->total_price,
    //         ];

    //         // Customer Details
    //         $customerDetails = [
    //             'first_name' => $orderInformation->recipient_name,
    //             'email' => $orderInformation->email,
    //             'phone' => $orderInformation->phone ?? '081234567890', // default phone if not available
    //             'shipping_address' => [
    //                 'address' => $orderInformation->address,
    //                 'city' => $orderInformation->city ?? 'Unknown City',
    //                 'postal_code' => $orderInformation->postal_code,
    //             ],
    //         ];

    //         $transactionData = [
    //             'transaction_details' => $transactionDetails,
    //             'customer_details' => $customerDetails,
    //         ];

    //         // Get Snap Token
    //         $snapToken = \Midtrans\Snap::getSnapToken($transactionData);

    //         // Return the Snap Token to frontend
    //         return response()->json(['snap_token' => $snapToken]);
    //     } catch (\Exception $e) {
    //         return response()->json(['error' => 'Failed to generate Snap Token', 'message' => $e->getMessage()], 500);
    //     }
    // }

    // public function store(Request $request, $orderId)
    // {
    //     try {
    //         $order = Order::findOrFail($orderId);

    //         // Gunakan kolom `id` atau kolom lain dari tabel `order_informations`
    //         $orderInformation = OrderInformation::where('id', $orderId)->firstOrFail();

    //         // Midtrans Configuration
    //         \Midtrans\Config::$serverKey = env('MIDTRANS_SERVER_KEY');
    //         \Midtrans\Config::$isProduction = env('MIDTRANS_IS_PRODUCTION', false);
    //         \Midtrans\Config::$isSanitized = true;
    //         \Midtrans\Config::$is3ds = true;

    //         // Transaction Details
    //         $transactionDetails = [
    //             'order_id' => $order->id,
    //             'gross_amount' => $order->total_price,
    //         ];

    //         // Customer Details
    //         $customerDetails = [
    //             'first_name' => $orderInformation->recipient_name,
    //             'email' => $orderInformation->email,
    //             'phone' => $orderInformation->phone ?? '081234567890', // Default phone jika tidak tersedia
    //             'shipping_address' => [
    //                 'address' => $orderInformation->address,
    //                 'city' => $orderInformation->city ?? 'Unknown City',
    //                 'postal_code' => $orderInformation->postal_code,
    //             ],
    //         ];

    //         $transactionData = [
    //             'transaction_details' => $transactionDetails,
    //             'customer_details' => $customerDetails,
    //         ];

    //         // Dapatkan Snap Token
    //         $snapToken = \Midtrans\Snap::getSnapToken($transactionData);

    //         // Kembalikan Snap Token ke frontend
    //         return response()->json(['snap_token' => $snapToken]);
    //     } catch (\Exception $e) {
    //         return response()->json([
    //             'error' => 'Failed to generate Snap Token',
    //             'message' => $e->getMessage()
    //         ], 500);
    //     }
    // }

    public function store(Request $request, $orderId)
{
    try {
        // Ambil data order berdasarkan ID
        $order = Order::findOrFail($orderId);

        // Ambil informasi order berdasarkan ID atau kolom lain yang relevan
        $orderInformation = OrderInformation::findOrFail($orderId);

        // Konfigurasi Midtrans
        \Midtrans\Config::$serverKey = env('MIDTRANS_SERVER_KEY');
        \Midtrans\Config::$isProduction = env('MIDTRANS_IS_PRODUCTION', false);
        \Midtrans\Config::$isSanitized = true;
        \Midtrans\Config::$is3ds = true;

        // Detail transaksi
        $transactionDetails = [
            'order_id' => $order->id, // ID transaksi unik
            'gross_amount' => $order->total_price, // Total harga
        ];

        // Detail pelanggan
        $customerDetails = [
            'first_name' => $orderInformation->recipient_name,
            'email' => $orderInformation->email,
            'phone' => $orderInformation->phone ?? '081234567890', // Nilai default jika kosong
            'shipping_address' => [
                'address' => $orderInformation->address,
                'city' => $orderInformation->city ?? 'Unknown City', // Default jika city tidak tersedia
                'postal_code' => $orderInformation->postal_code ?? '00000', // Default jika postal code tidak ada
            ],
        ];

        // Data transaksi lengkap
        $transactionData = [
            'transaction_details' => $transactionDetails,
            'customer_details' => $customerDetails,
        ];

        // Generate Snap Token
        $snapToken = \Midtrans\Snap::getSnapToken($transactionData);

        // Kirim Snap Token ke frontend
        return response()->json([
            'success' => true,
            'snap_token' => $snapToken,
        ]);
    } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
        // Jika data tidak ditemukan
        return response()->json([
            'success' => false,
            'error' => 'Data not found',
            'message' => $e->getMessage(),
        ], 404);
    } catch (\Exception $e) {
        // Jika terjadi error lainnya
        return response()->json([
            'success' => false,
            'error' => 'Failed to generate Snap Token',
            'message' => $e->getMessage(),
        ], 500);
    }
}

}
