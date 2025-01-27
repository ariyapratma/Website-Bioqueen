<?php

namespace App\Http\Controllers;

use App\Models\Cart;
use Inertia\Inertia;
use App\Models\Order;
use App\Models\HeaderOrder;
use App\Models\OrderInformation;
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
        $cartItems = Cart::where('user_id', Auth::id())->with('product')->get();
        $headerOrder = HeaderOrder::first();

        return Inertia::render('Order/Index', [
            'dataHeaderOrder' => $headerOrder,
            'auth' => [
                'user' => Auth::user(),
            ],
            'cartItems' => $cartItems->map(function ($cartItem) {
                if ($cartItem->product) {
                    return [
                        'id' => $cartItem->id,
                        'product' => [
                            'name' => $cartItem->product->name,
                            'price' => $cartItem->product->price,
                            'image_url' => $cartItem->product->image_url,
                        ],
                        'quantity' => $cartItem->quantity,
                        'price' => $cartItem->price,
                    ];
                }
                return null;
            })->filter(),

            'orderInfo' => [
                'total_price' => $cartItems->sum(function ($item) {
                    return $item->price;
                }),
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

        $existingOrder = Order::where('user_id', auth()->id())->first();

        if ($existingOrder) {
            $existingOrder->total_price = $validated['total_price'];
            $existingOrder->product_id = $validated['orderItems'][0]['product_id'];
            $existingOrder->status = 'Processing';
            $existingOrder->save();

            return redirect()->route('order.index')->with('success', 'Order sudah diperbarui!');
        } else {
            do {
                $randomId = random_int(1000000000, 9999999999);
            } while (Order::where('id', $randomId)->exists());

            $order = Order::create([
                'user_id' => auth()->id(),
                'product_id' => $validated['orderItems'][0]['product_id'],
                'total_price' => $validated['total_price'],
                'status' => 'pending',
            ]);

            $order->status = 'Processing';
            $order->save();

            return redirect()->route('order.index')->with('success', 'Order berhasil dibuat!');
        }
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

        try {
            $orderInformation = OrderInformation::create($validated);

            return response()->json([
                'message' => 'Order information submitted successfully!',
                'orderInformation' => $orderInformation
            ]);
        } catch (\Exception $e) {
            Log::error($e->getMessage());

            return response()->json([
                'message' => 'Failed to submit order information.',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function myOrder()
    {
        $orders = Order::where('user_id', auth()->user()->id)->get();
        $orders = Order::with('product')->where('user_id', auth()->id())->get();

        return Inertia::render('User/Order/MyOrder', [
            'orders' => $orders,
            'cartItems' => $orders->flatMap->items,
        ]);
    }

    public function manageOrders()
    {
        $orders = Order::all();
        $orderInformations = OrderInformation::all();

        return Inertia::render('Admin/Order/ManageOrderProducts', [
            'orders' => $orders->map(function ($order) use ($orderInformations) {
                $informations = $orderInformations->filter(function ($information) use ($order) {
                    return $information->order_id === $order->id;
                });

                return [
                    'id' => $order->id,
                    'recipient_name' => $informations->first()->recipient_name ?? '',
                    'email' => $informations->first()->email ?? '',
                    'address' => $informations->first()->address ?? '',
                    'postal_code' => $informations->first()->postal_code ?? '',
                    'notes' => $informations->first()->notes ?? '',
                    'total_price' => $order->total_price,
                    'created_at' => $order->created_at->format('Y-m-d H:i:s'),
                    'status' => $order->status,
                ];
            }),
        ]);
    }
}
