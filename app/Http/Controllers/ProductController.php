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

        // Mengambil data dari tabel header_product
        $headerProduct = HeaderProduct::first();

        return Inertia::render('Product/ProductList', [
            'category' => $category,
            'products' => $products,
            'dataHeaderProduct' => $headerProduct,

        ]);
    }

    public function showProduct($categorySlug, $productSlug)
    {
        // Mendapatkan kategori berdasarkan slug
        $category = HeroCategories::where('slug', $categorySlug)->firstOrFail();

        // Mendapatkan produk berdasarkan slug dan kategori
        $product = Product::where('slug', $productSlug)->where('category_id', $category->id)->firstOrFail();

        return Inertia::render('Product/ProductDetail', [
            'category' => $category,
            'product' => $product,
        ]);
    }
}
