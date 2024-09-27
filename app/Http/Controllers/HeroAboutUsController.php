<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\HeroAboutUs;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class HeroAboutUsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $heroAboutUs = HeroAboutUs::all();
        return Inertia::render('Admin/AboutUs/ManageHeroAboutUs', [
            'dataHeroAboutUs' => $heroAboutUs
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Admin/AboutUs/CreateHeroAboutUs');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:1500',
            'description1' => 'required|string|max:1500',
            'description2' => 'required|string|max:1500',
            'description3' => 'required|string|max:1500',
            'image_url' => 'nullable|image|mimes:jpg,jpeg,png|max:100072',
        ]);

        $data = $request->only(['title', 'description1', 'description2', 'description3']);

        if ($request->hasFile('image_url')) {
            $file = $request->file('image_url');

            // Menggunakan nama asli dari file
            $filename = $file->getClientOriginalName();

            // Tambahkan logika untuk menangani nama file yang sama
            $path = 'public/hero_about_us/' . $filename;
            $counter = 1;

            while (Storage::exists($path)) {
                // Menambahkan angka untuk membedakan nama file jika sudah ada
                $filename = pathinfo($filename, PATHINFO_FILENAME) . " ($counter)." . $file->getClientOriginalExtension();
                $path = 'public/hero_about_us/' . $filename;
                $counter++;
            }

            // Menyimpan file
            $file->storeAs('public/hero_about_us', $filename);
            $data['image_url'] = 'storage/hero_about_us/' . $filename;
        }

        HeroAboutUs::create($data);

        return redirect()->route('hero-about-us.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(HeroAboutUs $heroAboutUs)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit($id)
    {
        $heroAboutUs = HeroAboutUs::findOrFail($id);
        return Inertia::render('Admin/AboutUs/EditHeroAboutUs', [
            'dataHeroAboutUs' => $heroAboutUs
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, HeroAboutUs $heroAboutUs)
    {
        $request->validate([
            'title' => 'required|string|max:1500',
            'description1' => 'required|string|max:1500',
            'description2' => 'required|string|max:1500',
            'description3' => 'required|string|max:1500',
            'image_url' => 'nullable|image|mimes:jpg,jpeg,png|max:100072',
        ]);

        $data = $request->only(['title', 'description1', 'description2', 'description3']);

        // Handle image upload
        if ($request->hasFile('image_url')) {
            // Delete old image
            if ($heroAboutUs->image_url && Storage::exists(str_replace('storage/', 'public/', $heroAboutUs->image_url))) {
                Storage::delete(str_replace('storage/', 'public/', $heroAboutUs->image_url));
            }

            $file = $request->file('image_url');

            // Menggunakan nama asli dari file
            $filename = $file->getClientOriginalName();

            // Tambahkan logika untuk menangani nama file yang sama
            $path = 'public/hero_about_us/' . $filename;
            $counter = 1;

            while (Storage::exists($path)) {
                // Menambahkan angka untuk membedakan nama file jika sudah ada
                $filename = pathinfo($filename, PATHINFO_FILENAME) . " ($counter)." . $file->getClientOriginalExtension();
                $path = 'public/hero_about_us/' . $filename;
                $counter++;
            }

            // Menyimpan file
            $file->storeAs('public/hero_about_us', $filename);
            $data['image_url'] = 'storage/hero_about_us/' . $filename;
        } else {
            // Gunakan existing image URL jika tidak ada gambar baru yang diupload
            $data['image_url'] = $heroAboutUs->image_url;
        }

        // Update model
        $heroAboutUs->update($data);

        return redirect()->route('hero-about-us.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(HeroAboutUs $id)
    {
        $id->delete();
        return redirect()->route('hero-about-us.index');
    }
}
