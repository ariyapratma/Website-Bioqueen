<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Models\User;
use App\Models\HeroFlyer; // Contoh model
use App\Models\HeaderHome; // Contoh model

class AdminController extends Controller
{
    // Menampilkan dashboard admin
    public function index()
    {
        // Mengambil data pengguna dan data lainnya untuk ditampilkan di dashboard
        $users = User::all();
        $heroFlyers = HeroFlyer::all(); // Contoh data dari tabel HeroFlyer
        $headerHome = HeaderHome::first(); // Contoh data HeaderHome

        // Mengembalikan view inertia untuk dashboard admin
        return Inertia::render('Admin/Dashboard', [
            'users' => $users,
            'heroFlyers' => $heroFlyers,
            'headerHome' => $headerHome
        ]);
    }
}
