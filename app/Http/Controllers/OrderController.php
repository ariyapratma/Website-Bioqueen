<?php

namespace App\Http\Controllers;

use App\Models\Cart;
use Inertia\Inertia;
use App\Models\Order;
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

        $existingOrder = Order::where('user_id', auth()->id())
            ->first();

        if ($existingOrder) {
            $existingOrder->total_price = $validated['total_price'];
            $existingOrder->save();

            return redirect()->route('order.index')->with('success', 'Order sudah diperbarui!');
        } else {
            $order = Order::create([
                'user_id' => auth()->id(),
                'total_price' => $validated['total_price'],
            ]);

            return redirect()->route('order.index')->with('success', 'Order berhasil dibuat!');
        }
    }

    public function storeDetails(Request $request)
    {
        $validatedData = $request->validate([
            'recipient_name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'notes' => 'required|string',
            'address' => 'required|string|max:255',
            'postal_code' => 'required|numeric|digits_between:1,10',
        ]);

        try {
            OrderDetail::create([
                'recipient_name' => $validatedData['recipient_name'],
                'email' => $validatedData['email'],
                'notes' => $validatedData['notes'] ?? null,
                'address' => $validatedData['address'],
                'postal_code' => $validatedData['postal_code'],
            ]);

            return response()->json(['message' => 'Order detail saved successfully.'], 201);
        } catch (\Exception $e) {
            Log::error('Error saving order detail: ' . $e->getMessage());
            return response()->json(['message' => 'Failed to save order detail.', 'error' => $e->getMessage()], 500);
        }
    }
}
