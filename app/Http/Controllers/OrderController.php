<?php

namespace App\Http\Controllers;

use App\Models\HeaderOrder;
use Inertia\Inertia;
use Illuminate\Http\Request;

class OrderController extends Controller
{
    public function index()
    {
        // Mengambil data dari tabel header_order
        $headerOrder = HeaderOrder::first();
        return Inertia::render('Order/Index', [
            'dataHeaderOrder' => $headerOrder,

        ]);
    }
}
