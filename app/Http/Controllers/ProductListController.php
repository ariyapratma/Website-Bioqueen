<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Product;
use App\Models\ProductList;
use Illuminate\Http\Request;
use App\Models\HeroCategories;
use Illuminate\Support\Facades\Storage;

class ProductListController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $products = Product::all();
        return Inertia::render('Admin/Product/ManageProductList', [
            'products' => $products,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $categories = HeroCategories::all(); // Mengambil kategori untuk dropdown
        return Inertia::render('Admin/Product/CreateProductList', [
            'categories' => $categories,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // Preprocessing harga: Hapus format Rp. dan karakter selain angka
        $request->merge([
            'price' => preg_replace('/[Rp. ]/', '', $request->input('price')),
        ]);

        // Validasi data input
        $validatedData = $request->validate([
            'category_id' => 'required|exists:hero_categories,id',
            'name' => 'required|string|max:255',
            'description' => 'required|string|max:255',
            'image_url' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048',
            'price' => 'required|numeric', // Pastikan setelah di-preprocess, ini berupa angka
        ]);

        // Simpan gambar ke folder product_list
        $file = $request->file('image_url');
        $filename = pathinfo($file->getClientOriginalName(), PATHINFO_FILENAME);
        $extension = $file->getClientOriginalExtension();
        $path = 'public/product_list/' . $filename . '.' . $extension;

        $counter = 1;
        // Tangani jika nama file sudah ada
        while (Storage::exists($path)) {
            $filename = pathinfo($file->getClientOriginalName(), PATHINFO_FILENAME) . " ($counter)";
            $path = 'public/product_list/' . $filename . '.' . $extension;
            $counter++;
        }

        // Simpan file ke storage
        $imagePath = $file->storeAs('product_list', $filename . '.' . $extension, 'public');

        // Membuat produk baru, termasuk menyimpan harga sebagai angka
        $validatedData['image_url'] = $imagePath;
        Product::create($validatedData);

        return redirect()->route('product-list.index')->with('success', 'Product created successfully!');
    }

    /**
     * Display the specified resource.
     */
    public function show(ProductList $productList)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit($id)
    {
        $product = Product::findOrFail($id);
        $categories = HeroCategories::all();
        return Inertia::render('Product/Edit', [
            'product' => $product,
            'categories' => $categories,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        // Validasi data input
        $validatedData = $request->validate([
            'category_id' => 'required|exists:hero_categories,id',
            'name' => 'required|string|max:255',
            'description' => 'required|string',
            'image_url' => 'required|string',
            'price' => 'required|numeric',
        ]);

        // Update produk
        $product = Product::findOrFail($id);
        $product->update($validatedData);

        return redirect()->route('product-list.index')->with('success', 'Product updated successfully!');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(ProductList $id)
    {
        $product = Product::findOrFail($id);
        $product->delete();

        return redirect()->route('product-list.index')->with('success', 'Product deleted successfully!');
    }
}
