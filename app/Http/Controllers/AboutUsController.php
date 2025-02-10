<?php

namespace App\Http\Controllers;

use App\Models\HeaderAboutUs;
use App\Models\HeroAboutUs;
use App\Models\HeroVisionMision;
use App\Models\HeroOurGallery;
use App\Models\HeaderContact;
use App\Models\HeaderMaklon;
use Inertia\Inertia;

class AboutUsController extends Controller
{
    public function index()
    {
        // Mengambil data dari tabel header_about_us
        $headerAboutUs = HeaderAboutUs::first();

        // Mengambil data dari tabel hero_about_us
        $heroAboutUs = HeroAboutUs::first();

        // Mengambil data dari tabel hero_vision_mision
        $heroVisionMision = HeroVisionMision::first();

        // Mengambil data dari tabel hero_our_gallery
        $heroOurGallery = HeroOurGallery::first();

        // Mengambil data dari tabel header_contact
        $headerContact = HeaderContact::first();

        // Mengambil data dari tabel header_maklon
        $headerMaklon = HeaderMaklon::first();

        return Inertia::render('AboutUs/Index', [
            'dataHeaderAboutUs' => $headerAboutUs,
            'dataHeroAboutUs' => $heroAboutUs,
            'dataHeroVisionMision' => $heroVisionMision,
            'dataHeroOurGallery' => $heroOurGallery,
            'dataHeaderContact' => $headerContact,
            'dataHeaderMaklon' => $headerMaklon,
        ]);
    }
}
