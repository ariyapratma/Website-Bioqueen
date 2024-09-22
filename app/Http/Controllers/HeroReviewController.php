<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\HeroReview;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class HeroReviewController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // // Mengambil semua ulasan dari database
        // $heroReview = HeroReview::all();
        // return Inertia::render('Home/HeroReview', [
        //     'dataHeroReview' => $heroReview,
        //     'success' => 'Review berhasil ditambahkan',
        // ]);
        // Mengambil semua ulasan dari database
        $heroReview = HeroReview::all();

        // Mengembalikan data dengan Inertia
        return Inertia::render('Home/HeroReview', [
            'dataHeroReview' => $heroReview,
            'success' => session('success'), // Mengambil pesan sukses dari session jika ada
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

        // Simpan review ke database
        HeroReview::create([
            'name' => Auth::user()->name,
            'avatar' => Auth::user()->avatar ?? 'default-avatar.png',
            'rating' => $request->rating,
            'comment' => $request->comment,
            'user_id' => Auth::id(),
        ]);

        // Ambil semua ulasan untuk dikirim kembali ke halaman Home
        $heroReview = HeroReview::all();

        // Kembali ke halaman Home dengan data ulasan yang diperbarui
        return Inertia::render('Home/HeroReview', [
            'dataHeroReview' => $heroReview,
            'success' => 'Review has been added successfully.',
        ]);
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
