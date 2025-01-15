<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\HeroFlyer;
use App\Models\HeroVideo;
use App\Models\HeaderHome;
use App\Models\HeroReview;
use App\Models\HeroCompany;
use App\Models\HeroService;
use Illuminate\Http\Request;
use App\Models\HeroTeamValue;
use App\Models\HeroWhyChoose;
use App\Models\HeroCertificate;
use App\Models\HeroMaklonValue;
use App\Models\HeroExcellenceValue;
use App\Models\HeroFacilitiesValue;

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

        // Mengambil semua data dari tabel hero_review
        $heroReview = HeroReview::latest()->get();

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
            'dataHeroReview' => $heroReview,
        ]);
    }

    public function search(Request $request)
    {
        // Mengambil keyword pencarian
        $searchTerm = $request->input('searchTerm');

        // Lakukan pencarian pada berbagai tabel
        $headerHome = HeaderHome::where('title', 'LIKE', "%{$searchTerm}%")->get();
        $heroFlyer = HeroFlyer::where('title', 'LIKE', "%{$searchTerm}%")->get();
        $heroCompany = HeroCompany::where('name', 'LIKE', "%{$searchTerm}%")->get();
        $heroWhyChoose = HeroWhyChoose::where('title', 'LIKE', "%{$searchTerm}%")->get();
        $heroMaklonValue = HeroMaklonValue::where('value', 'LIKE', "%{$searchTerm}%")->get();
        $heroTeamValue = HeroTeamValue::where('value', 'LIKE', "%{$searchTerm}%")->get();
        $heroFacilitiesValue = HeroFacilitiesValue::where('value', 'LIKE', "%{$searchTerm}%")->get();
        $heroCertificate = HeroCertificate::where('title', 'LIKE', "%{$searchTerm}%")->get();
        $heroService = HeroService::where('name', 'LIKE', "%{$searchTerm}%")->get();
        $heroVideo = HeroVideo::where('title', 'LIKE', "%{$searchTerm}%")->get();
        $heroExcellenceValue = HeroExcellenceValue::where('value', 'LIKE', "%{$searchTerm}%")->get();
        $heroReview = HeroReview::where('review', 'LIKE', "%{$searchTerm}%")->get();

        // Gabungkan semua hasil pencarian
        $results = collect([
            'headerHome' => $headerHome,
            'heroFlyer' => $heroFlyer,
            'heroCompany' => $heroCompany,
            'heroWhyChoose' => $heroWhyChoose,
            'heroMaklonValue' => $heroMaklonValue,
            'heroTeamValue' => $heroTeamValue,
            'heroFacilitiesValue' => $heroFacilitiesValue,
            'heroCertificate' => $heroCertificate,
            'heroService' => $heroService,
            'heroVideo' => $heroVideo,
            'heroExcellenceValue' => $heroExcellenceValue,
            'heroReview' => $heroReview,
        ]);

        return response()->json($results);
    }
}
