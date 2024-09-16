<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\HeroFlyer;
use App\Models\HeaderHome;
use App\Models\HeroCertificate;
use App\Models\HeroCompany;
use App\Models\HeroExcellenceValue;
use App\Models\HeroFacilitiesValue;
use App\Models\HeroMaklonValue;
use App\Models\HeroService;
use App\Models\HeroTeamValue;
use App\Models\HeroVideo;
use App\Models\HeroWhyChoose;
use Illuminate\Http\Request;

class HomeController extends Controller
{
    public function index()
    {

        // Mengambil data dari tabel header_home
        $headerHome = HeaderHome::first();

        // Mengambil semua data dari tabel hero_flyer
        $heroFlyer = HeroFlyer::all();

        // Mengambil semua data dari tabel hero_company
        $heroCompany = HeroCompany::latest()->first();

        // Mengambil semua data dari tabel hero_why_choose
        $heroWhyChoose = HeroWhyChoose::first();

        // Mengambil semua data dari tabel hero_maklon_value
        $heroMaklonValue = HeroMaklonValue::first();

        // Mengambil semua data dari tabel hero_team_value
        $heroTeamValue = HeroTeamValue::first();

        // Mengambil semua data dari tabel hero_facilities_value
        $heroFacilitiesValue = HeroFacilitiesValue::first();

        // Mengambil semua data dari tabel hero_certificate
        $heroCertificate = HeroCertificate::first();

        // Mengambil semua data dari tabel hero_service
        $heroService = HeroService::latest()->first();

        // Mengambil semua data dari tabel hero_video
        $heroVideo = HeroVideo::first();

        // Mengambil semua data dari tabel hero_excellence_value
        $heroExcellenceValue = HeroExcellenceValue::first();

        // Kembalikan data ke view Inertia 'Home.Index'
        return Inertia::render('Home/Index', [
            'dataHeaderHome' => $headerHome,
            'dataHeroFlyer' => $heroFlyer,
            'dataHeroCompany' => $heroCompany,
            'dataHeroWhyChoose' => $heroWhyChoose,
            'dataHeroMaklonValue' => $heroMaklonValue,
            'dataHeroTeamValue' => $heroTeamValue,
            'dataHeroFacilitiesValue' => $heroFacilitiesValue,
            'dataHeroCertificate' => $heroCertificate,
            'dataHeroService' => $heroService,
            'dataHeroVideo' => $heroVideo,
            'dataHeroExcellenceValue' => $heroExcellenceValue,
        ]);
    }
}
