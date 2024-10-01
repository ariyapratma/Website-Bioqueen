<?php

namespace App\Http\Controllers;

use App\Models\HeaderProduct;
use App\Models\HeroCategories;
use Inertia\Inertia;

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
}
