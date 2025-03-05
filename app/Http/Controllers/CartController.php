<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Cart;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class CartController extends Controller
{
    /**
     * Display the user's cart items.
     */

    public function index()
    {
        $cartItems = Cart::where('user_id', Auth::id())->with('product')->get();
        return Inertia::render('Cart/Index', [
            'cartItems' => $cartItems,
            'auth' => ['user' => Auth::user()],

        ]);
    }

    /**
     * Store a new cart item or update an existing one.
     */

    public function store(Request $request)
    {
        $userId = auth()->id(); // Pastikan user login

        if (!$userId) {
            return response()->json(['error' => 'User tidak terautentikasi'], 401);
        }

        $validated = $request->validate([
            'product_id' => 'required|exists:products,id',
            'quantity' => 'required|integer|min:1',
        ]);

        $product = Product::findOrFail($validated['product_id']);

        $cartItem = Cart::where('user_id', $userId)
            ->where('product_id', $product->id)
            ->lockForUpdate()
            ->first();

        if ($cartItem) {
            $cartItem->increment('quantity', $validated['quantity']);
            $cartItem->update(['price' => $cartItem->quantity * $product->price]);
        } else {
            Cart::create([
                'user_id' => $userId,
                'product_id' => $product->id,
                'quantity' => $validated['quantity'],
                'price' => $product->price * $validated['quantity'],
            ]);
        }

        return response()->json(['success' => true, 'message' => 'Item added to cart']);
    }

    /**
     * Get all cart items for the authenticated user.
     */
    public function getCartItems(Request $request)
    {
        if (!$request->expectsJson()) {
            return response()->json(['message' => 'Invalid request'], 400);
        }

        $cartItems = Cart::with('product')
            ->where('user_id', auth()->id())
            ->get()
            ->map(fn($cart) => [
                'id' => $cart->id,
                'product_id' => $cart->product_id,
                'product_name' => $cart->product->name,
                'quantity' => $cart->quantity,
                'price' => $cart->price,
                'image_url' => $cart->product->image_url,
            ]);

        return response()->json($cartItems);
    }

    /**
     * Update the quantity of a cart item.
     */
    public function update(Request $request, $id)
    {
        $validated = $request->validate(['quantity' => 'required|integer|min:1']);

        $cartItem = Cart::where('id', $id)->where('user_id', auth()->id())->firstOrFail();
        $product = Product::findOrFail($cartItem->product_id);

        $cartItem->update([
            'quantity' => $validated['quantity'],
            'price' => $validated['quantity'] * $product->price,
        ]);

        return response()->json(['success' => true, 'message' => 'Cart updated successfully.']);
    }

    /**
     * Remove an item from the cart.
     */
    public function removeFromCart($id)
    {
        $cartItem = Cart::where('user_id', auth()->id())->findOrFail($id);
        $cartItem->delete();

        return response()->json(['success' => true, 'message' => 'Item removed from cart.']);
    }
}
