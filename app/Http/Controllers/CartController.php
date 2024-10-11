<?php

namespace App\Http\Controllers;

use App\Models\Cart;
use Inertia\Inertia;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Auth;

class CartController extends Controller
{

    public function getCartItems(Request $request)
    {
        // Cek jika permintaan adalah AJAX atau dari API
        if ($request->expectsJson()) {
            $cartItems = Cart::where('user_id', auth()->id())->get();
            return response()->json($cartItems); // Mengembalikan respons JSON
        }

        // Jika permintaan tidak melalui API, lempar error
        return response()->json(['message' => 'Invalid request'], 400);
    }

    public function addToCart(Request $request)
    {
        $cart = Cart::where('user_id', auth()->id())->where('product_id', $request->product_id)->first();

        if ($cart) {
            // Update quantity jika produk sudah ada
            $cart->quantity += $request->quantity;
            $cart->save();
            return response()->json([
                'message' => 'Product quantity updated successfully',
                'isNewProduct' => false,  // Produk sudah ada sebelumnya
            ]);
        } else {
            // Tambahkan item baru ke keranjang
            Cart::create([
                'user_id' => auth()->id(),
                'product_id' => $request->product_id,
                'quantity' => $request->quantity,
                'price' => $request->price,
            ]);

            return response()->json([
                'message' => 'Product added to cart successfully',
                'isNewProduct' => true,  // Produk baru ditambahkan
            ]);
        }
    }

    public function update(Request $request, $id)
    {
        $cartItem = Cart::find($id);
        if (!$cartItem) {
            return response()->json(['message' => 'Item not found'], 404);
        }

        $cartItem->quantity = $request->input('quantity');
        $cartItem->save();

        return response()->json(['message' => 'Cart updated successfully']);
    }


    public function removeFromCart($id)
    {
        // Hapus item dari keranjang berdasarkan id
        $cartItem = Cart::where('id', $id)->where('user_id', auth()->id())->first();
        if ($cartItem) {
            $cartItem->delete();
            return response()->json(null, 204);
        }

        return response()->json(['message' => 'Item not found'], 404);
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // Ambil item keranjang berdasarkan user yang sedang login
        $cartItems = Cart::where('user_id', Auth::id())
            ->with('product') // Pastikan ada relasi ke produk
            ->get();

        // Kirim data ke komponen React menggunakan Inertia
        return Inertia::render('Cart/Index', [
            'cartItems' => $cartItems,
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
        //
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
    public function edit(Cart $cart)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    // public function update(Request $request, Cart $cart)
    // {
    //     //
    // }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Cart $cart)
    {
        //
    }
}
