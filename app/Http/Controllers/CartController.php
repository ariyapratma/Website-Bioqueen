<?php

namespace App\Http\Controllers;

use App\Models\Cart;
use Inertia\Inertia;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class CartController extends Controller
{

    public function getCartItems(Request $request)
    {
        // Cek jika permintaan adalah AJAX atau dari API
        if ($request->expectsJson()) {
            $cartItems = Cart::where('user_id', auth()->id())->get();
            return response()->json($cartItems);
        }

        // Jika permintaan tidak melalui API, lempar error
        return response()->json(['message' => 'Invalid request'], 400);
    }

    public function addToCart(Request $request)
    {
        // Validasi data yang masuk
        $request->validate([
            'product_id' => 'required|exists:products,id',
            'quantity' => 'required|integer|min:1',
            'price' => 'required|numeric|min:0',
        ]);

        try {
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
                    'isNewProduct' => false,
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
                    'isNewProduct' => true,
                ]);
            }
        } catch (\Exception $e) {
            // Log error untuk debugging
            Log::error('Failed to add product to cart: ' . $e->getMessage());

            // Kembalikan error 409 jika terjadi konflik
            return response()->json([
                'message' => 'Error adding product to cart',
                'error' => $e->getMessage(),
            ], 409); // Gunakan kode status 409 untuk konflik
        }
    }

    public function removeFromCart($id)
    {
        $cartItem = Cart::where('user_id', auth()->id())->findOrFail($id);

        // Hapus item dari keranjang
        $cartItem->delete();

        // Kembalikan redirect dengan Inertia dan pesan sukses
        return redirect()->route('carts.index')->with('success', 'Item removed from cart.');
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
            // Jika item sudah ada, update quantity
            $cartItem->quantity += $request->quantity;
            $cartItem->price = $cartItem->product->price * $cartItem->quantity;
            $cartItem->save();
        } else {
            // Jika item belum ada, tambahkan ke cart
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

        // Update kuantitas
        $cartItem->quantity = $request->input('quantity');

        // Ambil harga satuan produk dan hitung ulang total
        $product = Product::find($cartItem->product_id);
        if ($product) {
            $cartItem->price = $cartItem->quantity * $product->price; // Update total harga
        } else {
            return redirect()->back()->with('error', 'Product not found');
        }

        $cartItem->save();

        // Kembali ke halaman keranjang dengan Inertia response
        return redirect()->back()->with('success', 'Quantity and price updated successfully');
    }


    /**
     * Update the specified resource in storage.
     */
    // public function update(Request $request, $id)
    // {
    //     // Validasi kuantitas
    //     $request->validate([
    //         'quantity' => 'required|integer|min:1',
    //     ]);

    //     // Cari item di keranjang berdasarkan user dan product ID
    //     $cartItem = Cart::where('user_id', auth()->id())->where('id', $id)->first();

    //     if (!$cartItem) {
    //         return response()->json(['success' => false, 'message' => 'Item not found.'], 404);
    //     }

    //     // Ambil harga satuan produk
    //     $product = Product::find($cartItem->product_id);

    //     if (!$product) {
    //         return response()->json(['success' => false, 'message' => 'Product not found.'], 404);
    //     }

    //     // Update kuantitas dan harga
    //     $cartItem->quantity = $request->input('quantity');
    //     $cartItem->price = $cartItem->quantity * $product->price; // Update total harga
    //     $cartItem->save(); // Simpan perubahan keranjang

    //     return response()->json([
    //         'success' => true,
    //         'message' => 'Quantity and price updated successfully.',
    //     ]);
    // }

    // public function update(Request $request, $id)
    // {
    //     $request->validate([
    //         'quantity' => 'required|integer|min:1',
    //     ]);

    //     $cartItem = Cart::where('id', $id)->where('user_id', auth()->id())->firstOrFail();
    //     $product = Product::find($cartItem->product_id);

    //     if ($product) {
    //         $cartItem->quantity = $request->input('quantity');
    //         $cartItem->price = $cartItem->quantity * $product->price;
    //         $cartItem->save();

    //         return response()->json([
    //             'success' => true,
    //             'message' => 'Quantity and price updated successfully.',
    //         ]);
    //     } else {
    //         return response()->json(['message' => 'Product not found.'], 404);
    //     }
    // }

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

            // Menggunakan session flash untuk pesan
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
