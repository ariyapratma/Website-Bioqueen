<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\HeroFlyer;
use App\Models\HeaderHome;
use App\Models\HeroCompany;
use App\Models\HeroWhyChoose;
use Illuminate\Http\Request;

class HomeController extends Controller
{
    public function index()
    {

        // Mengambil data dari tabel header_home
        $headerHome = HeaderHome::first();

        // Mengambil semua data dari tabel hero_flyer
        $flyerHome = HeroFlyer::all();

        // Mengambil semua data dari tabel hero_company
        $heroCompany = HeroCompany::latest()->first();

        // Mengambil semua data dari tabel hero_why_choose
        $heroWhyChoose = HeroWhyChoose::first();

        // Kembalikan data ke view Inertia 'Home.Index'
        return Inertia::render('Home/Index', [
            'dataHeaderHome' => $headerHome,
            'dataHeroFlyer' => $flyerHome,
            'dataHeroCompany' => $heroCompany,
            'dataHeroWhyChoose' => $heroWhyChoose,
        ]);
    }
}
