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
        // Validasi data yang masuk
        $request->validate([
            'product_id' => 'required|exists:products,id', // Pastikan produk ada
            'quantity' => 'required|integer|min:1', // Pastikan kuantitas valid
            'price' => 'required|numeric|min:0', // Pastikan harga valid
        ]);

        // Mencari item keranjang berdasarkan user dan product
        $cart = Cart::where('user_id', auth()->id())
            ->where('product_id', $request->product_id)
            ->first();

        if ($cart) {
            // Jika produk sudah ada, tambahkan kuantitas
            $cart->quantity += $request->quantity;

            // Perbarui total price berdasarkan kuantitas dan harga produk
            $cart->price = $cart->quantity * $request->price;

            $cart->save();
            return response()->json([
                'message' => 'Product quantity and price updated successfully',
                'isNewProduct' => false,  // Produk sudah ada sebelumnya
            ]);
        } else {
            // Tambahkan item baru ke keranjang
            Cart::create([
                'user_id' => auth()->id(),
                'product_id' => $request->product_id,
                'quantity' => $request->quantity,
                'price' => $request->price, // Simpan harga awal
            ]);

            return response()->json([
                'message' => 'Product added to cart successfully',
                'isNewProduct' => true,  // Produk baru ditambahkan
            ]);
        }
    }


    public function removeFromCart($id)
    {
        // Hapus item dari keranjang berdasarkan id
        $cartItem = Cart::where('id', $id)->where('user_id', auth()->id())->first();
        if ($cartItem) {
            $cartItem->delete();

            // Set a success message in the session
            return redirect()->route('carts')->with('success', 'Edit Cart Successfully');
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
    public function edit(Request $request, $id)
    {
        // Validasi kuantitas
        $request->validate([
            'quantity' => 'required|integer|min:1',
        ]);

        // Cari item di keranjang berdasarkan ID
        $cartItem = Cart::where('id', $id)->where('user_id', auth()->id())->first();

        if (!$cartItem) {
            return response()->json(['message' => 'Item not found'], 404);
        }

        // Update kuantitas
        $cartItem->quantity = $request->input('quantity');

        // Perbarui total price berdasarkan kuantitas dan harga produk
        $product = Product::find($cartItem->product_id); // Ambil produk untuk mendapatkan harga
        if ($product) {
            $cartItem->price = $cartItem->quantity * $product->price; // Perbarui harga total
        }

        $cartItem->save();

        // Kembali ke halaman keranjang dengan Inertia response
        return response()->json([
            'message' => 'Quantity updated successfully',
            'cartItem' => $cartItem,  // Mengembalikan item keranjang yang diperbarui
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        // Validasi kuantitas
        $request->validate([
            'quantity' => 'required|integer|min:1',
        ]);

        // Cari item di keranjang berdasarkan ID
        $cartItem = Cart::findOrFail($id);

        // Update kuantitas
        $cartItem->quantity = $request->input('quantity');
        $cartItem->save();

        // Kembali ke halaman keranjang dengan Inertia response
        return redirect()->back()->with('success', 'Quantity updated successfully');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Cart $cart)
    {
        //
    }
}
