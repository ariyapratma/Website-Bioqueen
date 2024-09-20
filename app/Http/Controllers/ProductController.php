<?php

namespace App\Http\Controllers;

use App\Models\HeaderProduct;
use Inertia\Inertia;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    public function index()
    {
        // Mengambil data dari tabel header_product
        $headerProduct = HeaderProduct::first();
        return Inertia::render('Product/Index', [
            'dataHeaderProduct' => $headerProduct,

        ]);
    }
}
