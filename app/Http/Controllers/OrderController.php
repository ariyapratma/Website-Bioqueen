<?php

namespace App\Http\Controllers;

use App\Models\Cart;
use Inertia\Inertia;
use App\Models\Order;
use App\Models\Product;
use App\Models\HeaderOrder;
use App\Models\OrderDetail;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Auth;

class OrderController extends Controller
{

    public function __construct()
    {
        $this->middleware('auth');
    }

    public function index()
    {
        // Ambil item dari cart, bukan order
        $cartItems = Cart::where('user_id', Auth::id())->with('product')->get();

        // Mengambil data dari tabel header_order
        $headerOrder = HeaderOrder::first();

        return Inertia::render('Order/Index', [
            'dataHeaderOrder' => $headerOrder,
            'auth' => [
                'user' => Auth::user(),
            ],
            'cartItems' => $cartItems->map(function ($cartItem) {
                return [
                    'id' => $cartItem->id,
                    'product' => [
                        'name' => $cartItem->product->name,
                        'price' => $cartItem->product->price,
                        'image_url' => $cartItem->product->image_url,
                    ],
                    'quantity' => $cartItem->quantity,
                    'price' => $cartItem->price, // Harga setelah diperbarui
                ];
            }),
            'orderInfo' => [
                'total_price' => $cartItems->sum(function ($item) {
                    return $item->price; // Menghitung total harga
                }),
                'item_count' => $cartItems->count(),
            ],
        ]);
    }

    public function store(Request $request)
    {
        // Validasi input
        $request->validate([
            'orderItems' => 'required|array',
            'orderItems.*.product_id' => 'required|exists:products,id',
            'orderItems.*.quantity' => 'required|integer|min:1',
        ]);

        foreach ($request->orderItems as $item) {
            // Ambil produk berdasarkan id
            $product = Product::find($item['product_id']);

            if ($product) {
                // Cek apakah ada pesanan dengan produk yang sama dan status 'pending' untuk user yang sama
                $existingOrder = Order::where('user_id', Auth::id())
                    ->where('product_id', $item['product_id'])
                    ->where('status', 'pending')
                    ->first();

                // Jika pesanan sudah ada, update kuantitas dan total harga
                if ($existingOrder) {
                    // Pastikan hanya menyimpan kuantitas yang diberikan, tidak menggandakan
                    $existingOrder->quantity = $item['quantity'];

                    // Hitung total harga berdasarkan kuantitas dan harga produk
                    $existingOrder->total_price = $product->price * $existingOrder->quantity;

                    // Simpan perubahan
                    $existingOrder->save();
                } else {
                    // Jika pesanan belum ada, buat pesanan baru dengan status 'pending'
                    $totalPrice = $product->price * $item['quantity'];

                    Order::create([
                        'user_id' => Auth::id(),
                        'product_id' => $item['product_id'],
                        'quantity' => $item['quantity'],
                        'total_price' => $totalPrice,
                        'status' => 'pending', // Status default adalah 'pending'
                    ]);
                }
            }
        }

        // Redirect ke halaman pesanan dengan pesan sukses
        return redirect()->route('order.index')->with('success', 'Order placed successfully.');
    }

    public function storeDetails(Request $request)
    {
        // Validasi input
        $request->validate([
            'recipientName' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'provinceId' => 'required|integer',
            'regencyId' => 'required|integer',
            'districtId' => 'required|integer',
            'villageId' => 'required|integer',
            'postalCode' => 'required|string|max:10',
            'notes' => 'nullable|string',
            'orderId' => 'required|integer|exists:orders,id',
            'productId' => 'required|integer|exists:products,id',
        ]);

        try {
            // Simpan detail pesanan menggunakan `orderId` dari request
            $orderDetail = OrderDetail::create([
                'order_id' => $request->orderId,
                'product_id' => $request->productId,
                'recipient_name' => $request->recipientName,
                'email' => $request->email,
                'province_id' => $request->provinceId,
                'regency_id' => $request->regencyId,
                'district_id' => $request->districtId,
                'village_id' => $request->villageId,
                'postal_code' => $request->postalCode,
                'notes' => $request->notes,
            ]);

            return response()->json([
                'success' => true,
                'message' => 'Order details saved successfully!',
                'orderDetail' => $orderDetail,
            ], 200);
        } catch (\Illuminate\Database\QueryException $e) {
            Log::error('Database query error: ' . $e->getMessage());

            return response()->json([
                'success' => false,
                'message' => 'Database error occurred',
                'error' => $e->getMessage(),
            ], 500);
        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            Log::error('Model not found: ' . $e->getMessage());

            return response()->json([
                'success' => false,
                'message' => 'Model not found',
                'error' => $e->getMessage(),
            ], 500);
        } catch (\Exception $e) {
            Log::error('Failed to save order details: ' . $e->getMessage());

            return response()->json([
                'success' => false,
                'message' => 'Failed to save order details',
                'error' => $e->getMessage(),
            ], 500);
        }
    }
}
