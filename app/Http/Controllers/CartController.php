<?php

namespace App\Http\Controllers;

use App\Models\Cart;
use App\Models\Order;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class CartController extends Controller
{

    public function getCartItems(Request $request)
    {
        if ($request->expectsJson()) {
            $cartItems = Cart::with('product')
                ->where('user_id', auth()->id())
                ->get()
                ->map(function ($cart) {
                    return [
                        'id' => $cart->id,
                        'product_id' => $cart->product_id,
                        'product_name' => $cart->product->name,
                        'quantity' => $cart->quantity,
                        'price' => $cart->price,
                        'image_url' => $cart->product->image_url,
                    ];
                });

            return response()->json($cartItems);
        }

        return response()->json(['message' => 'Invalid request'], 400);
    }

    public function addToCart(Request $request)
    {
        $request->validate([
            'product_id' => 'required|exists:products,id',
            'quantity' => 'required|integer|min:1',
            'price' => 'required|numeric|min:0',
        ]);

        try {
            $cart = Cart::where('user_id', auth()->id())
                ->where('product_id', $request->product_id)
                ->first();

            if ($cart) {
                $cart->quantity += $request->quantity;

                $cart->price = $cart->quantity * $request->price;

                $cart->save();

                return response()->json([
                    'message' => 'Product quantity and price updated successfully',
                    'isNewProduct' => false,
                ]);
            } else {
                Cart::create([
                    'user_id' => auth()->id(),
                    'product_id' => $request->product_id,
                    'quantity' => $request->quantity,
                    'price' => $request->price,
                ]);

                return response()->json([
                    'message' => 'Product added to cart successfully',
                    'isNewProduct' => true,
                ]);
            }
        } catch (\Exception $e) {
            // Log error untuk debugging
            Log::error('Failed to add product to cart: ' . $e->getMessage());

            return response()->json([
                'message' => 'Error adding product to cart',
                'error' => $e->getMessage(),
            ], 409); // Gunakan kode status 409 untuk konflik
        }
    }

    public function removeFromCart($id)
    {
        $cartItem = Cart::where('user_id', auth()->id())->findOrFail($id);
        $productId = $cartItem->product_id;
        $cartItem->delete();

        $order = Order::where('user_id', auth()->id())
            ->whereHas('orderDetails', function ($query) use ($productId) {
                $query->where('product_id', $productId);
            })
            ->first();

        if ($order) {
            $order->orderDetails()->where('product_id', $productId)->delete();

            if ($order->orderDetails->isEmpty()) {
                $order->delete();
            }
        }

        return redirect()->route('carts.index')->with('success', 'Item removed from cart and order updated.');
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $cartItems = Cart::where('user_id', auth()->id())->with('product')->get();
        return inertia('Cart/Index', [
            'cartItems' => $cartItems,
            'user' => auth()->user(),
            'auth' => auth()->check(),
        ]);
    }


    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'product_id' => 'required|exists:products,id',
            'quantity' => 'required|integer|min:1',
        ]);

        $cartItem = Cart::where('user_id', auth()->id())
            ->where('product_id', $request->product_id)
            ->first();

        if ($cartItem) {
            $cartItem->quantity += $request->quantity;
            $cartItem->price = $cartItem->product->price * $cartItem->quantity;
            $cartItem->save();
        } else {

            Cart::create([
                'user_id' => auth()->id(),
                'product_id' => $validated['product_id'],
                'quantity' => $validated['quantity'],
                'price' => Product::find($validated['product_id'])->price * $validated['quantity'],
            ]);
        }

        return redirect()->route('carts.index')->with('success', 'Item added to cart');
    }


    /**
     * Display the specified resource.
     */
    public function show(Cart $cart)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Request $request, $id)
    {
        // Validasi kuantitas
        $request->validate([
            'quantity' => 'required|integer|min:1',
        ]);

        // Cari item di keranjang berdasarkan ID
        $cartItem = Cart::where('id', $id)->where('user_id', auth()->id())->first();

        if (!$cartItem) {
            return redirect()->back()->with('error', 'Item not found');
        }

        $cartItem->quantity = $request->input('quantity');

        $product = Product::find($cartItem->product_id);
        if ($product) {
            $cartItem->price = $cartItem->quantity * $product->price;
        } else {
            return redirect()->back()->with('error', 'Product not found');
        }

        $cartItem->save();

        return redirect()->back()->with('success', 'Quantity and price updated successfully');
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $request->validate([
            'quantity' => 'required|integer|min:1',
        ]);

        $cartItem = Cart::where('id', $id)->where('user_id', auth()->id())->firstOrFail();
        $product = Product::find($cartItem->product_id);

        if ($product) {
            $cartItem->quantity = $request->input('quantity');
            $cartItem->price = $cartItem->quantity * $product->price;
            $cartItem->save();

            return redirect()->back()->with('success', 'Quantity and price updated successfully.');
        } else {
            return redirect()->back()->with('error', 'Product not found.');
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Cart $cart)
    {
        //
    }
}
