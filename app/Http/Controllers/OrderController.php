<?php

namespace App\Http\Controllers;

use App\Models\Cart;
use App\Models\Order;
use App\Models\HeaderOrder;
use App\Models\OrderInformation;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

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

    public function store(Request $request)
    {
        $validated = $request->validate([
            'orderItems' => 'required|array',
            'orderItems.*.product_id' => 'required|exists:products,id',
            'orderItems.*.quantity' => 'required|integer|min:1',
            'total_price' => 'required|numeric|min:0',
        ]);

        foreach ($validated['orderItems'] as $item) {
            Order::create([
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
            'recipient_name' => 'required|string',
            'email' => 'required|email',
            'notes' => 'nullable|string',
            'address' => 'required|string',
            'postal_code' => 'required|numeric',
        ]);

        $existingOrder = Order::where('user_id', auth()->id())->where('status', 'Processing')->first();

        if (!$existingOrder) {
            return response()->json(['message' => 'No active order found.'], 400);
        }

        $orderInformation = $existingOrder->orderInformation()->create($validated);

        return response()->json(['message' => 'Order information submitted successfully!', 'orderInformation' => $orderInformation]);
    }

    public function myOrder()
    {
        $orders = Order::with('product')->where('user_id', auth()->id())->get();
        $orderInformations = OrderInformation::whereIn('order_id', $orders->pluck('id'))->get()->keyBy('order_id');

        return Inertia::render('User/Order/MyOrder', [
            'orders' => $orders->map(fn($order) => [
                'id' => $order->id,
                'created_at' => $order->created_at->format('Y-m-d H:i:s'),
                'status' => $order->status,
                'product' => optional($order->product)->only(['id', 'name', 'image_url']),
                'total_price' => $order->total_price,
                'informations' => optional($orderInformations->get($order->id))->only(['recipient_name', 'email', 'address', 'postal_code', 'notes']),
            ]),
        ]);
    }

    public function cancel()
    {
        $orders = Order::where('user_id', auth()->id())->get();

        if ($orders->isEmpty()) {
            return back()->with('error', 'No orders found to cancel.');
        }

        $orders->each->update(['status' => 'Cancelled']);

        return back()->with('success', 'All orders have been successfully cancelled!');
    }

    public function manageOrders()
    {
        $orders = Order::with('product')->get();
        $orderInformations = OrderInformation::all()->keyBy('order_id');

        return Inertia::render('Admin/Order/ManageOrderProducts', [
            'orders' => $orders->map(fn($order) => [
                'id' => $order->id,
                'recipient_name' => optional($orderInformations->get($order->id))->recipient_name,
                'email' => optional($orderInformations->get($order->id))->email,
                'address' => optional($orderInformations->get($order->id))->address,
                'postal_code' => optional($orderInformations->get($order->id))->postal_code,
                'notes' => optional($orderInformations->get($order->id))->notes,
                'total_price' => $order->total_price,
                'created_at' => $order->created_at->format('Y-m-d H:i:s'),
                'status' => $order->status,
                'product' => optional($order->product)->only(['id', 'name', 'image_url']),
            ]),
        ]);
    }
}
