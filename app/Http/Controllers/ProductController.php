<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Product;
use App\Models\HeaderProduct;
use App\Models\HeroCategories;

class ProductController extends Controller
{
    public function index()
    {
        // Mengambil data dari tabel header_product
        $headerProduct = HeaderProduct::first();

        // Mengambil semua data dari tabel categories
        $heroCategories = HeroCategories::all();

        // Mengambil semua data dari tabel products
        $productList = Product::all();

        return Inertia::render('Product/Index', [
            'dataHeaderProduct' => $headerProduct,
            'dataHeroCategories' => $heroCategories,
            'dataProductList' => $productList,
        ]);
    }

    /**
     * Tampilkan produk berdasarkan kategori yang dipilih.
     */
    public function showByCategory($slug)
    {
        // Cari kategori berdasarkan slug
        $category = HeroCategories::where('slug', $slug)->firstOrFail();

        // Ambil semua produk berdasarkan kategori
        $products = Product::where('category_id', $category->id)->get();

        return Inertia::render('Product/ProductList', [
            'category' => $category, // Informasi kategori
            'products' => $products, // Daftar produk sesuai kategori
        ]);
    }
}
