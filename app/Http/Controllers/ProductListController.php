<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Product;
use App\Models\ProductList;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use App\Models\HeaderProduct;
use App\Models\HeroCategories;
use Illuminate\Support\Facades\Storage;

class ProductListController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {

        // Mengambil data pertama dari tabel header_product
        $headerProduct = HeaderProduct::first();
        $products = Product::all();
        return Inertia::render('Admin/Product/ManageProductList', [
            'dataHeaderProduct' => $headerProduct,
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
            'slug' => 'nullable|string|unique:hero_categories,slug',
            'image_url' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048',
            'name' => 'required|string|max:255',
            'description' => 'required|string|max:255',
            'price' => 'required|numeric', // Pastikan setelah di-preprocess, ini berupa angka
        ]);

        // Buat slug dari name jika slug tidak diberikan
        $slug = $request->slug ?? Str::slug($request->name, '-');

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
        $products = Product::findOrFail($id);
        $categories = HeroCategories::all();
        return Inertia::render('Admin/Product/EditProductList', [
            'products' => $products,
            'categories' => $categories,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */

    public function update(Request $request, Product $product)
    {
        // Preprocess harga agar menghapus karakter yang tidak diperlukan (Rp, titik, dan spasi)
        $request->merge([
            'price' => preg_replace('/[Rp. ]/', '', $request->input('price')),
        ]);

        // Validasi data input
        $request->validate([
            'category_id' => 'required|exists:hero_categories,id',
            'slug' => 'nullable|string|unique:products,slug,' . $product->id,
            'image_url' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'name' => 'required|string|max:255',
            'description' => 'required|string|max:255',
            'price' => 'required|numeric',
        ]);

        // Update data produk
        $data = $request->only(['category_id', 'slug', 'name', 'description', 'price']);

        // Handle gambar jika ada
        if ($request->hasFile('image_url')) {
            if ($product->image_url && Storage::exists(str_replace('storage/', 'public/', $product->image_url))) {
                Storage::delete(str_replace('storage/', 'public/', $product->image_url));
            }

            $file = $request->file('image_url');
            $filename = pathinfo($file->getClientOriginalName(), PATHINFO_FILENAME);
            $extension = $file->getClientOriginalExtension();
            $path = 'public/products/' . $filename . '.' . $extension;

            $counter = 1;
            while (Storage::exists($path)) {
                $filename = pathinfo($file->getClientOriginalName(), PATHINFO_FILENAME) . " ($counter)";
                $path = 'public/products/' . $filename . '.' . $extension;
                $counter++;
            }

            $file->storeAs('public/products', $filename . '.' . $extension);
            $data['image_url'] = 'storage/products/' . $filename . '.' . $extension;
        } else {
            $data['image_url'] = $product->image_url;
        }

        $product->update($data);

        return redirect()->route('product-list.index')->with('success', 'Product updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $product = Product::findOrFail($id);
        $product->delete();

        return redirect()->route('product-list.index')->with('success', 'Product deleted successfully!');
    }
}
