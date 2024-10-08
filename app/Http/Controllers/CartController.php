<?php

namespace App\Http\Controllers;

use App\Models\Cart;
use Illuminate\Http\Request;

class CartController extends Controller
{
    public function add(Request $request)
    {
        try {
            // Validasi request
            $validated = $request->validate([
                'product_id' => 'required|exists:products,id',
                'quantity' => 'required|integer|min:1',
                'price' => 'required|numeric',
            ]);

            // Cek apakah produk sudah ada di keranjang
            $cartItem = Cart::where('user_id', auth()->id())
                ->where('product_id', $validated['product_id'])
                ->first();

            if ($cartItem) {
                // Jika ada, update kuantitas dan total harga
                $cartItem->quantity += $validated['quantity'];
                $cartItem->price = $cartItem->quantity * $validated['price'];
                $cartItem->save();
            } else {
                // Jika tidak ada, buat item baru di keranjang
                Cart::create([
                    'user_id' => auth()->id(),
                    'product_id' => $validated['product_id'],
                    'quantity' => $validated['quantity'],
                    'price' => $validated['price'] * $validated['quantity'],
                ]);
            }

            return response()->json(['message' => 'Product added to cart'], 200);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Error adding product to cart: ' . $e->getMessage()], 500);
        }
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
