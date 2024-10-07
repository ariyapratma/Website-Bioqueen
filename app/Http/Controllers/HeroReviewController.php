<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\HeroReview;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Laravolt\Avatar\Facade as Avatar;

class HeroReviewController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // Mengambil semua ulasan dari database
        $heroReview = HeroReview::all();

        // Mengembalikan data dengan Inertia
        return Inertia::render('Home/Index', [
            'dataHeroReview' => $heroReview,
            'success' => session('success'),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // Validasi input review
        $request->validate([
            'rating' => 'required|integer|min:1|max:5',
            'comment' => 'required|string|max:255',
        ]);

        // Cek apakah pengguna memiliki avatar di storage
        $avatarPath = "storage/avatars/" . Auth::user()->id . ".png";
        if (!file_exists(public_path($avatarPath))) {
            // Jika tidak ada avatar, generate avatar menggunakan Laravolt
            $avatar = Avatar::create(Auth::user()->name)->toBase64();
        } else {
            $avatar = $avatarPath;
        }

        // Simpan review ke database
        HeroReview::create([
            'name' => Auth::user()->name,
            'avatar' => $avatar,
            'rating' => $request->rating,
            'comment' => $request->comment,
            'user_id' => Auth::id(),
        ]);

        session()->flash('success', 'Review has been added successfully.');

        // Kembali ke halaman sebelumnya (Home/Index)
        return redirect()->route('index');
    }


    /**
     * Display the specified resource.
     */
    public function show(HeroReview $heroReview)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(HeroReview $heroReview)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, HeroReview $heroReview)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(HeroReview $heroReview)
    {
        //
    }
}
