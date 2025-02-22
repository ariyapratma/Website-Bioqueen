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
        $validated = $request->validate([
            'orderItems' => 'required|array',
            'orderItems.*.product_id' => 'required|exists:products,id',
            'orderItems.*.quantity' => 'required|integer|min:1',
            'orderItems.*.price' => 'required|numeric|min:0',
            'total_price' => 'required|numeric|min:0',
        ]);

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

        return redirect()->route('order.index')->with('success', 'Order successfully placed!');
    }

    public function storeInformations(Request $request)
    {
        $validated = $request->validate([
            'recipient_name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'notes' => 'nullable|string',
            'address' => 'required|string',
            'postal_code' => 'required|integer',
            'payment_method_id' => 'required|exists:payment_methods,id',
            'shipping_method_id' => 'required|exists:shipping_methods,id',
        ]);

        $existingOrder = Order::where('user_id', auth()->id())->where('status', 'Processing')->first();
        if (!$existingOrder) {
            return response()->json(['error' => 'No active order found.'], 400);
        }

        try {
            $orderInformation = $existingOrder->OrderInformations()->create($validated);

            return response()->json([
                'message' => 'Order information submitted successfully!',
                'orderInformation' => $orderInformation,
            ]);
        } catch (\Exception $e) {
            \Log::error('Error saving order information:', ['error' => $e->getMessage()]);
            return response()->json(['error' => 'Failed to save order information.'], 500);
        }
    }

    // public function myOrder()
    // {
    //     $orders = Order::with('product')->where('user_id', auth()->id())->get();
    //     $OrderInformations = OrderInformation::with(['paymentMethod', 'shippingMethod'])
    //         ->whereIn('order_id', $orders->pluck('id'))
    //         ->get()
    //         ->keyBy('order_id');

    //     return Inertia::render('User/Order/MyOrder', [
    //         'orders' => $orders->map(function ($order) use ($OrderInformations) {
    //             $info = optional($OrderInformations->get($order->id));
    //             return [
    //                 'id' => $order->id,
    //                 'created_at' => $order->created_at->format('Y-m-d H:i:s'),
    //                 'status' => $order->status,
    //                 'product' => optional($order->product)->only(['id', 'name', 'image_url']),
    //                 'total_price' => $order->total_price,
    //                 'quantity' => $order->quantity,
    //                 'informations' => [
    //                     'recipient_name' => $info?->recipient_name,
    //                     'email' => $info?->email,
    //                     'notes' => $info?->notes,
    //                     'address' => $info?->address,
    //                     'postal_code' => $info?->postal_code,
    //                     'payment_method' => optional($info?->paymentMethod)->only(['id', 'name']),
    //                     'shipping_method' => optional($info?->shippingMethod)->only(['id', 'name']),
    //                 ],
    //             ];
    //         }),
    //     ]);
    // }

    public function myOrder()
    {
        $orders = Order::with('product')->where('user_id', auth()->id())->get();

        if ($orders->isEmpty()) {
            return Inertia::render('User/Order/MyOrder', [
                'orders' => [],
            ]);
        }

        $OrderInformations = OrderInformation::with(['paymentMethod', 'shippingMethod'])
            ->whereIn('order_id', $orders->pluck('id'))
            ->get()
            ->keyBy('order_id');

        return Inertia::render('User/Order/MyOrder', [
            'orders' => $orders->map(function ($order) use ($OrderInformations) {
                $info = optional($OrderInformations->get($order->id));
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

    // public function cancel()
    // {
    //     $orders = Order::where('user_id', auth()->id())->get();

    //     if ($orders->isEmpty()) {
    //         return back()->with('error', 'No orders found to cancel.');
    //     }

    //     $orders->each->update(['status' => 'Cancelled']);

    //     return back()->with('success', 'All orders have been successfully cancelled!');
    // }

    public function cancel()
    {
        $orders = Order::where('user_id', auth()->id())
            ->whereIn('status', ['Processing'])
            ->get();

        if ($orders->isEmpty()) {
            return back()->with('error', 'No orders found to cancel.');
        }

        $orders->each->update(['status' => 'Cancelled']);

        return back()->with('success', 'All orders have been successfully cancelled!');
    }

    public function manageOrders()
    {
        $orders = Order::with('product')->get();
        $OrderInformations = OrderInformation::all()->keyBy('order_id');

        return Inertia::render('Admin/Order/ManageOrderProducts', [
            'orders' => $orders->map(fn($order) => [
                'id' => $order->id,
                'recipient_name' => optional($OrderInformations->get($order->id))->recipient_name,
                'email' => optional($OrderInformations->get($order->id))->email,
                'address' => optional($OrderInformations->get($order->id))->address,
                'postal_code' => optional($OrderInformations->get($order->id))->postal_code,
                'notes' => optional($OrderInformations->get($order->id))->notes,
                'total_price' => $order->total_price,
                'created_at' => $order->created_at->format('Y-m-d H:i:s'),
                'status' => $order->status,
                'product' => optional($order->product)->only(['id', 'name', 'image_url']),
            ]),
        ]);
    }
}
