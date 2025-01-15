<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Models\HeroOurGallery;
use Illuminate\Support\Facades\Storage;

class HeroOurGalleryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $heroOurGallery = HeroOurGallery::all();
        return Inertia::render('Admin/AboutUs/ManageHeroOurGallery', [
            'dataHeroOurGallery' => $heroOurGallery
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Admin/AboutUs/CreateHeroOurGallery');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'subtitle' => 'required|string|max:255',
            'image_url1' => 'nullable|image|mimes:jpg,jpeg,png|max:100072',
            'title_image_url1' => 'required|string||max:255',
            'image_url2' => 'nullable|image|mimes:jpg,jpeg,png|max:100072',
            'title_image_url2' => 'required|string||max:255',
            'image_url3' => 'nullable|image|mimes:jpg,jpeg,png|max:100072',
            'title_image_url3' => 'required|string||max:255',
        ]);

        $data = $request->only(['title', 'subtitle', 'title_image_url1', 'title_image_url2', 'title_image_url3']);

        // Proses gambar pertama jika ada
        if ($request->hasFile('image_url1')) {
            $data['image_url1'] = $this->handleFileUpload($request->file('image_url1'), 'hero_our_gallery');
        }

        // Proses gambar kedua jika ada
        if ($request->hasFile('image_url2')) {
            $data['image_url2'] = $this->handleFileUpload($request->file('image_url2'), 'hero_our_gallery');
        }

        // Proses gambar ketiga jika ada
        if ($request->hasFile('image_url3')) {
            $data['image_url3'] = $this->handleFileUpload($request->file('image_url3'), 'hero_our_gallery');
        }

        // Simpan data ke database
        HeroOurGallery::create($data);

        return redirect()->route('hero-our-gallery.index');
    }

    /**
     * Fungsi untuk menangani upload file dan menghindari nama file yang sama.
     */
    private function handleFileUpload($file, $directory)
    {
        $filename = $file->getClientOriginalName();
        $path = 'public/' . $directory . '/' . $filename;
        $counter = 1;

        // Tambahkan angka jika file dengan nama yang sama sudah ada
        while (Storage::exists($path)) {
            $filename = pathinfo($file->getClientOriginalName(), PATHINFO_FILENAME) . " ($counter)." . $file->getClientOriginalExtension();
            $path = 'public/' . $directory . '/' . $filename;
            $counter++;
        }

        // Simpan file
        $file->storeAs('public/' . $directory, $filename);

        // Kembalikan path yang disimpan
        return 'storage/' . $directory . '/' . $filename;
    }

    /**
     * Display the specified resource.
     */
    public function show(HeroOurGallery $heroOurGallery)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit($id)
    {
        $heroOurGallery = HeroOurGallery::findOrFail($id);
        return Inertia::render('Admin/AboutUs/EditHeroOurGallery', [
            'dataHeroOurGallery' => $heroOurGallery
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, HeroOurGallery $heroOurGallery)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'subtitle' => 'required|string|max:255',
            'image_url1' => 'nullable|image|mimes:jpg,jpeg,png|max:100072',
            'title_image_url1' => 'required|string||max:255',
            'image_url2' => 'nullable|image|mimes:jpg,jpeg,png|max:100072',
            'title_image_url2' => 'required|string||max:255',
            'image_url3' => 'nullable|image|mimes:jpg,jpeg,png|max:100072',
            'title_image_url3' => 'required|string||max:255',
        ]);

        $data = $request->only(['title', 'subtitle', 'title_image_url1', 'title_image_url2', 'title_image_url3']);

        // Proses gambar pertama jika ada
        if ($request->hasFile('image_url1')) {
            $data['image_url1'] = $this->handleFileUpload($request->file('image_url1'), 'hero_our_gallery');
        }

        // Proses gambar kedua jika ada
        if ($request->hasFile('image_url2')) {
            $data['image_url2'] = $this->handleFileUpload($request->file('image_url2'), 'hero_our_gallery');
        }

        // Proses gambar ketiga jika ada
        if ($request->hasFile('image_url3')) {
            $data['image_url3'] = $this->handleFileUpload($request->file('image_url3'), 'hero_our_gallery');
        }

        // Simpan data ke database
        $heroOurGallery->update($data);

        // Redirect setelah sukses
        return redirect()->route('hero-our-gallery.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(HeroOurGallery $id)
    {
        $id->delete();
        return redirect()->route('hero-our-gallery.index');
    }
}
