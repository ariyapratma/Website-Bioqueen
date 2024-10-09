<?php

namespace App\Http\Controllers;

use App\Models\Cart;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Auth;

class CartController extends Controller
{
    // public function add(Request $request)
    // {
    //     // Validasi request
    //     $request->validate([
    //         'product_id' => 'required|exists:products,id',
    //         'quantity' => 'required|integer|min:1',
    //         'price' => 'required|numeric',
    //     ]);

    //     // Cek apakah user sudah login
    //     if (Auth::check()) {
    //         $user = Auth::user();

    //         // Cek apakah produk sudah ada di keranjang
    //         $cartItem = Cart::where('user_id', $user->id)
    //             ->where('product_id', $request->product_id)
    //             ->first();

    //         if ($cartItem) {
    //             // Update jumlah produk jika sudah ada
    //             $cartItem->quantity += $request->quantity;
    //             $cartItem->price = $request->price * $cartItem->quantity;
    //             $cartItem->save();
    //         } else {
    //             // Jika belum ada, buat item baru di keranjang
    //             Cart::create([
    //                 'user_id' => $user->id,
    //                 'product_id' => $request->product_id,
    //                 'quantity' => $request->quantity,
    //                 'price' => $request->price,
    //             ]);
    //         }

    //         return response()->json(['message' => 'Product added to cart successfully.'], 200);
    //     } else {
    //         return response()->json(['message' => 'User not authenticated.'], 401);
    //     }
    // }

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
        $validated = $request->validate([
            'product_id' => 'required|exists:products,id',
            'quantity' => 'required|integer|min:1',
            'price' => 'required|numeric|min:0',
        ]);

        // Ambil produk berdasarkan ID
        $product = Product::find($validated['product_id']);

        if (!$product) {
            return response()->json(['message' => 'Product not found'], 404);
        }

        // Tambahkan produk ke keranjang
        $cartItem = Cart::create([
            'user_id' => auth()->id(),
            'product_id' => $product->id,
            'quantity' => $validated['quantity'],
            'price' => $product->price, // Gunakan harga dari produk
        ]);

        return response()->json($cartItem, 201);
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
        //
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
    public function update(Request $request, Cart $cart)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Cart $cart)
    {
        //
    }
}
