<?php

namespace App\Http\Controllers;

use App\Models\Cart;
use Inertia\Inertia;
use App\Models\Order;
use App\Models\HeaderOrder;
use Illuminate\Http\Request;
use App\Models\PaymentMethod;
use App\Models\ShippingMethod;
use App\Models\OrderInformation;
use App\Models\Notification;
use Illuminate\Support\Facades\Auth;

class OrderController extends Controller
{
    public function index()
    {
        $cartItems = Cart::where('user_id', Auth::id())->with('product')->get();
        $headerOrder = HeaderOrder::first();

        return Inertia::render('Order/Index', [
            'dataHeaderOrder' => $headerOrder,
            'auth' => ['user' => Auth::user()],
            'cartItems' => $cartItems->map(fn($cartItem) => [
                'id' => $cartItem->id,
                'product' => optional($cartItem->product)->only(['name', 'price', 'image_url']),
                'quantity' => $cartItem->quantity,
                'price' => $cartItem->price,
            ])->filter(),
            'orderInfo' => [
                'total_price' => $cartItems->sum('price'),
                'item_count' => $cartItems->count(),
            ],
        ]);
    }

    public function getMethods()
    {
        try {
            $paymentMethods = PaymentMethod::all(['id', 'name']);
            $shippingMethods = ShippingMethod::all(['id', 'name']);

            return response()->json([
                'payment_methods' => $paymentMethods,
                'shipping_methods' => $shippingMethods,
            ]);
        } catch (\Exception $e) {
            Log::error('Error fetching methods:', ['error' => $e->getMessage()]);
            return response()->json(['error' => 'Failed to fetch methods.'], 500);
        }
    }

    public function store(Request $request)
    {
        try {
            // Validasi data input
            $validated = $request->validate([
                'orderItems' => 'required|array',
                'orderItems.*.product_id' => 'required|exists:products,id',
                'orderItems.*.quantity' => 'required|integer|min:1',
                'orderItems.*.price' => 'required|numeric|min:0',
                'total_price' => 'required|numeric|min:0',
            ]);

            // Simpan data pesanan
            foreach ($validated['orderItems'] as $item) {
                Order::create([
                    'id' => uniqid(),
                    'user_id' => auth()->id(),
                    'product_id' => $item['product_id'],
                    'quantity' => $item['quantity'],
                    'total_price' => $item['price'] * $item['quantity'],
                    'status' => 'Processing',
                ]);
            }

            return response()->json(['success' => 'Order successfully placed!']);
        } catch (\Exception $e) {
            \Log::error('Error storing order:', ['error' => $e->getMessage()]);
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    public function storeInformations(Request $request)
    {
        // Validasi input dari request
        $validated = $request->validate([
            'recipient_name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'notes' => 'nullable|string',
            'address' => 'required|string',
            'postal_code' => 'required|integer',
            'payment_method_id' => 'required|exists:payment_methods,id',
            'shipping_method_id' => 'required|exists:shipping_methods,id',
            'user_id' => 'nullable|exists:users,id',
        ]);

        $userId = $request->input('user_id') ?? auth()->id();

        // Pastikan user_id valid
        if (!$userId) {
            return response()->json(['error' => 'User not authenticated or invalid user ID.'], 401);
        }

        // Cari pesanan aktif berdasarkan user_id
        $existingOrder = Order::where('user_id', $userId)
            ->where('status', 'Processing')
            ->first();

        if (!$existingOrder) {
            return response()->json(['error' => 'No active order found for the user.'], 400);
        }

        try {
            $orderInformation = $existingOrder->OrderInformations()->create($validated);

            // Simpan notifikasi
            Notification::create([
                'user_id' => $userId,
                'message' => 'Checkout successful!',
                'read' => false,
            ]);

            return response()->json([
                'message' => 'Order information submitted successfully!',
                'orderInformation' => $orderInformation,
            ]);
        } catch (\Exception $e) {
            \Log::error('Error saving order information:', ['error' => $e->getMessage()]);
            return response()->json(['error' => 'Failed to save order information.'], 500);
        }
    }

    public function cancel($id)
    {
        $order = Order::where('id', $id)
            ->where('user_id', auth()->id())
            ->whereIn('status', ['Processing', 'Approved'])
            ->first();

        if (!$order) {
            return response()->json(['message' => 'Order not found or cannot be cancelled.'], 404);
        }

        $order->update(['status' => 'Cancelled']);

        return response()->json(['message' => 'Order has been successfully cancelled!']);
    }

    public function myOrder()
    {
        $orders = Order::with('product')->where('user_id', auth()->id())->get();

        if ($orders->isEmpty()) {
            return Inertia::render('User/Order/MyOrder', [
                'orders' => [],
            ]);
        }

        $orderIds = $orders->pluck('id');
        $OrderInformations = OrderInformation::with(['paymentMethod', 'shippingMethod'])
            ->whereIn('order_id', $orderIds)
            ->get()
            ->keyBy('order_id');

        return Inertia::render('User/Order/MyOrder', [
            'orders' => $orders->map(function ($order) use ($OrderInformations) {
                $info = $OrderInformations->get($order->id);

                return [
                    'id' => $order->id,
                    'created_at' => $order->created_at->format('Y-m-d H:i:s'),
                    'status' => $order->status,
                    'product' => optional($order->product)->only(['id', 'name', 'image_url']),
                    'total_price' => $order->total_price,
                    'quantity' => $order->quantity,
                    'informations' => [
                        'recipient_name' => $info?->recipient_name,
                        'email' => $info?->email,
                        'notes' => $info?->notes,
                        'address' => $info?->address,
                        'postal_code' => $info?->postal_code,
                        'payment_method' => optional($info?->paymentMethod)->only(['id', 'name']),
                        'shipping_method' => optional($info?->shippingMethod)->only(['id', 'name']),
                    ],
                ];
            }),
        ]);
    }

    public function manageOrders()
    {
        $orders = Order::with('product')->get();
        $orderIds = $orders->pluck('id');

        $OrderInformations = OrderInformation::whereIn('order_id', $orderIds)
            ->get()
            ->keyBy('order_id');

        return Inertia::render('Admin/Order/ManageOrderProducts', [
            'orders' => $orders->map(function ($order) use ($OrderInformations) {
                $info = $OrderInformations->get($order->id);

                return [
                    'id' => $order->id,
                    'recipient_name' => $info?->recipient_name,
                    'email' => $info?->email,
                    'address' => $info?->address,
                    'postal_code' => $info?->postal_code,
                    'notes' => $info?->notes,
                    'total_price' => $order->total_price,
                    'created_at' => $order->created_at->format('Y-m-d H:i:s'),
                    'status' => $order->status,
                    'product' => optional($order->product)->only(['id', 'name', 'image_url']),
                    'can_approve' => !empty($info?->recipient_name) && !empty($info?->email) && !empty($info?->address) && !empty($info?->postal_code),
                ];
            }),
        ]);
    }

    public function approveOrder($id)
    {
        try {
            $order = Order::findOrFail($id);
            $orderInfo = OrderInformation::where('order_id', $id)->first();

            if (!$orderInfo || !$orderInfo->recipient_name || !$orderInfo->email || !$orderInfo->address || !$orderInfo->postal_code) {
                return response()->json(['error' => 'Cannot approve order. Missing required information.'], 400);
            }

            $order->update(['status' => 'Approved']);

            return response()->json(['success' => 'Order successfully approved!', 'status' => 'Approved']);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Something went wrong: ' . $e->getMessage()], 500);
        }
    }
}
