<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\HeroFlyer;
use App\Models\HeaderHome; // Pastikan nama model benar
use Illuminate\Http\Request;

class HomeController extends Controller
{
    public function index()
    {
        // Mengambil data pertama dari tabel header_home
        // $dataHeaderHome = HeaderHome::first(); // Singular, bukan plural

        $headerHome = HeaderHome::first(); // Ambil data HeaderHome

        // Mengambil semua data dari tabel hero_flyer
        $dataFlyer = HeroFlyer::all();

        // Kembalikan data ke view Inertia 'Home.Index'
        return Inertia::render('Home/Index', [
            'dataHeaderHome' => $headerHome,
            // 'headerHome' => $dataHeaderHome,
            'flyers' => $dataFlyer,
            // Tambahkan data hero lainnya di sini jika diperlukan
        ]);
    }
}
