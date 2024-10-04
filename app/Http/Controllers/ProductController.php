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

        return Inertia::render('Product/Index', [
            'dataHeaderProduct' => $headerProduct,
            'dataHeroCategories' => $heroCategories,
        ]);
    }

    // Menampilkan produk berdasarkan kategori yang dipilih (menggunakan slug)
    public function showCategory($slug)
    {
        // Cari kategori berdasarkan slug
        $category = HeroCategories::where('slug', $slug)->firstOrFail();

        // Ambil produk terkait kategori
        $products = Product::where('category_id', $category->id)->get();

        return Inertia::render('Product/Category', [
            'category' => $category,
            'products' => $products,
        ]);
    }
}
