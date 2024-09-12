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

        // Mengambil data HeaderHome
        $headerHome = HeaderHome::first();

        // Mengambil semua data dari tabel hero_flyer
        $flyerHome = HeroFlyer::all();

        // Kembalikan data ke view Inertia 'Home.Index'
        return Inertia::render('Home/Index', [
            'dataHeaderHome' => $headerHome,
            'dataHeroFlyer' => $flyerHome,
        ]);
    }
}
