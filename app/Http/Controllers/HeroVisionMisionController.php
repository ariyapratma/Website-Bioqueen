<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Models\HeroVisionMision;
use Illuminate\Support\Facades\Storage;

class HeroVisionMisionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $heroVisionMision = HeroVisionMision::all();
        return Inertia::render('Admin/AboutUs/ManageHeroVisionMision', [
            'dataHeroVisionMision' => $heroVisionMision
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Admin/AboutUs/CreateHeroVisionMision');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'subtitle' => 'required|string|max:255',
            'description1' => 'required|string|max:255',
            'description2' => 'required|string|max:255',
            'description3' => 'required|string|max:255',
            'description4' => 'required|string|max:255',
            'description5' => 'required|string|max:255',
            'description6' => 'required|string|max:255',
            'image_url' => 'nullable|image|mimes:jpg,jpeg,png|max:100072',
        ]);

        $data = $request->only(['title', 'subtitle', 'description1', 'description2', 'description3', 'description4', 'description5', 'description6']);

        if ($request->hasFile('image_url')) {
            $file = $request->file('image_url');

            // Menggunakan nama asli dari file
            $filename = $file->getClientOriginalName();

            // Tambahkan logika untuk menangani nama file yang sama
            $path = 'public/hero_vision_mision/' . $filename;
            $counter = 1;

            while (Storage::exists($path)) {
                // Menambahkan angka untuk membedakan nama file jika sudah ada
                $filename = pathinfo($filename, PATHINFO_FILENAME) . " ($counter)." . $file->getClientOriginalExtension();
                $path = 'public/hero_vision_mision/' . $filename;
                $counter++;
            }

            // Menyimpan file
            $file->storeAs('public/hero_vision_mision', $filename);
            $data['image_url'] = 'storage/hero_vision_mision/' . $filename;
        }

        HeroVisionMision::create($data);

        return redirect()->route('hero-vision-mision.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(HeroVisionMision $heroVisionMision)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit($id)
    {
        $heroVisionMision = HeroVisionMision::findOrFail($id);
        return Inertia::render('Admin/AboutUs/EditHeroVisionMision', [
            'dataHeroVisionMision' => $heroVisionMision
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, HeroVisionMision $heroVisionMision)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'subtitle' => 'required|string|max:255',
            'description1' => 'required|string|max:255',
            'description2' => 'required|string|max:255',
            'description3' => 'required|string|max:255',
            'description4' => 'required|string|max:255',
            'description5' => 'required|string|max:255',
            'description6' => 'required|string|max:255',
            'image_url' => 'nullable|image|mimes:jpg,jpeg,png|max:100072',
        ]);

        $data = $request->only(['title', 'subtitle', 'description1', 'description2', 'description3', 'description4', 'description5', 'description6']);

        // Handle image upload
        if ($request->hasFile('image_url')) {
            // Delete old image
            if ($heroVisionMision->image_url && Storage::exists(str_replace('storage/', 'public/', $heroVisionMision->image_url))) {
                Storage::delete(str_replace('storage/', 'public/', $heroVisionMision->image_url));
            }

            $file = $request->file('image_url');

            // Menggunakan nama asli dari file
            $filename = $file->getClientOriginalName();

            // Tambahkan logika untuk menangani nama file yang sama
            $path = 'public/hero_vision_mision/' . $filename;
            $counter = 1;

            while (Storage::exists($path)) {
                // Menambahkan angka untuk membedakan nama file jika sudah ada
                $filename = pathinfo($filename, PATHINFO_FILENAME) . " ($counter)." . $file->getClientOriginalExtension();
                $path = 'public/hero_vision_mision/' . $filename;
                $counter++;
            }

            // Menyimpan file
            $file->storeAs('public/hero_vision_mision', $filename);
            $data['image_url'] = 'storage/hero_vision_mision/' . $filename;
        } else {
            // Gunakan existing image URL jika tidak ada gambar baru yang diupload
            $data['image_url'] = $heroVisionMision->image_url;
        }

        // Update model
        $heroVisionMision->update($data);

        return redirect()->route('hero-vision-mision.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(HeroVisionMision $id)
    {
        $id->delete();
        return redirect()->route('hero-vision-mision.index');
    }
}
