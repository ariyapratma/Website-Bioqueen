<?php

namespace App\Http\Controllers;

use App\Models\HeaderAboutUs;
use Inertia\Inertia;
use Illuminate\Http\Request;

class AboutUsController extends Controller
{
    public function index()
    {
         // Mengambil data dari tabel header_about_us
        $headerAboutUs = HeaderAboutUs::first();
        return Inertia::render('AboutUs/Index', [
            'dataHeaderAboutUs' => $headerAboutUs,

        ]);
    }
}
