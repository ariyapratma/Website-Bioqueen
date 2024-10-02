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
        $productList = Product::with('category')->get(); // Mengambil produk dengan relasi kategori
        return Inertia::render('Admin/Product/ManageProductList', [
            'dataProductList' => $productList
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        // Ambil data kategori untuk dropdown
        $heroCategories = HeroCategories::all(); // Pastikan model HeroCategory ada
        return Inertia::render('Admin/Product/CreateProductList', [
            'dataHeroCategories' => $heroCategories
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // Validasi data yang diterima
        $request->validate([
            'name' => 'required|string|max:255',
            'price' => 'required|numeric|min:0', // Validasi untuk harga
            'description' => 'nullable|string',
            'category_id' => 'required|exists:hero_categories,id', // Validasi untuk kategori
            'image_url' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        // Simpan gambar ke folder product_lists jika ada
        $imagePath = null;
        if ($request->hasFile('image_url')) {
            $file = $request->file('image_url');
            $filename = pathinfo($file->getClientOriginalName(), PATHINFO_FILENAME);
            $extension = $file->getClientOriginalExtension();
            $path = 'public/products_list/' . $filename . '.' . $extension;

            $counter = 1;
            while (Storage::exists($path)) {
                $filename = pathinfo($file->getClientOriginalName(), PATHINFO_FILENAME) . " ($counter)";
                $path = 'public/products_list/' . $filename . '.' . $extension;
                $counter++;
            }

            // Simpan file ke storage
            $imagePath = $file->storeAs('products_list', $filename . '.' . $extension, 'public');
        }

        // Simpan data produk baru ke database
        Product::create([
            'name' => $request->name,
            'price' => $request->price,
            'description' => $request->description,
            'category_id' => $request->category_id,
            'image_url' => $imagePath ? Storage::url($imagePath) : null,
        ]);

        return redirect()->route('product-lists.index')->with('success', 'Product created successfully.');
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
        $productList = Product::findOrFail($id);
        $heroCategories = HeroCategories::all(); // Ambil data kategori untuk dropdown
        return Inertia::render('Admin/Product/EditProductList', [
            'dataProductList' => $productList,
            'dataHeroCategories' => $heroCategories
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, ProductList $productList)
    {
        // Validasi data
        $request->validate([
            'name' => 'required|string|max:255',
            'price' => 'required|numeric|min:0', // Validasi untuk harga
            'description' => 'nullable|string',
            'category_id' => 'required|exists:hero_categories,id', // Validasi untuk kategori
            'image_url' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        // Proses gambar jika ada
        if ($request->hasFile('image_url')) {
            // Hapus gambar lama jika ada
            if ($productList->image_url) {
                $oldImagePath = str_replace('/storage/', 'public/', $productList->image_url);
                if (Storage::exists($oldImagePath)) {
                    Storage::delete($oldImagePath);
                }
            }

            $file = $request->file('image_url');
            $filename = pathinfo($file->getClientOriginalName(), PATHINFO_FILENAME);
            $extension = $file->getClientOriginalExtension();
            $path = 'public/products_list/' . $filename . '.' . $extension;

            $counter = 1;
            while (Storage::exists($path)) {
                $filename = pathinfo($file->getClientOriginalName(), PATHINFO_FILENAME) . " ($counter)";
                $path = 'public/products_list/' . $filename . '.' . $extension;
                $counter++;
            }

            // Simpan gambar baru
            $imagePath = $file->storeAs('products_list', $filename . '.' . $extension, 'public');
            $productList->image_url = Storage::url($imagePath);
        }

        // Update data produk
        $productList->update([
            'name' => $request->name,
            'price' => $request->price,
            'description' => $request->description,
            'category_id' => $request->category_id,
        ]);

        return redirect()->route('product-lists.index')->with('success', 'Product updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $productList = Product::findOrFail($id);

        // Hapus gambar jika ada
        if ($productList->image_url) {
            $oldImagePath = str_replace('/storage/', 'public/', $productList->image_url);
            if (Storage::exists($oldImagePath)) {
                Storage::delete($oldImagePath);
            }
        }

        $productList->delete();

        return redirect()->route('product-lists.index')->with('success', 'Product deleted successfully.');
    }
}
