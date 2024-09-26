<?php

namespace App\Http\Controllers;

use App\Models\HeaderAboutUs;
use App\Models\HeroAboutUs;
use Inertia\Inertia;

class AboutUsController extends Controller
{
    public function index()
    {
        // Mengambil data dari tabel header_about_us
        $headerAboutUs = HeaderAboutUs::first();

        // Mengambil data dari tabel hero_about_us
        $heroAboutUs = HeroAboutUs::first();

        return Inertia::render('AboutUs/Index', [
            'dataHeaderAboutUs' => $headerAboutUs,
            'dataHeroAboutUs' => $heroAboutUs,

        ]);
    }
}
