<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\HeroCompany;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class HeroCompanyController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $heroCompany = HeroCompany::all();
        return Inertia::render('Admin/Home/ManageHeroCompany', [
            'dataHeroCompany' => $heroCompany
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Admin/Home/CreateHeroCompany');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'image_url' => 'image|mimes:jpg,jpeg,png|max:2048',
            'youtube_link' => 'required|string|max:255',
            'title' => 'required|string|max:255',
            'description' => 'required|string|max:255',
        ]);

        $data = $request->only(['youtube_link', 'title', 'description']);

        if ($request->hasFile('image_url')) {
            $file = $request->file('image_url');

            // Menggunakan nama asli dari file
            $filename = $file->getClientOriginalName();

            // Tambahkan logika untuk menangani nama file yang sama
            $path = 'public/hero_company/' . $filename;
            $counter = 1;

            while (Storage::exists($path)) {
                // Menambahkan angka untuk membedakan nama file jika sudah ada
                $filename = pathinfo($filename, PATHINFO_FILENAME) . " ($counter)." . $file->getClientOriginalExtension();
                $path = 'public/hero_company/' . $filename;
                $counter++;
            }

            // Menyimpan file
            $file->storeAs('public/hero_company', $filename);
            $data['image_url'] = 'storage/hero_company/' . $filename;
        }

        HeroCompany::create($data);

        return redirect()->route('hero-company.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(HeroCompany $heroCompany)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit($id)
    {
        $heroCompany = HeroCompany::findOrFail($id);
        return Inertia::render('Admin/Home/EditHeroCompany', [
            'dataHeroCompany' => $heroCompany
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, HeroCompany $heroCompany)
    {
        // Validasi data yang diinput
        $request->validate([
            'image_url' => 'image|mimes:jpg,jpeg,png|max:2048',
            'youtube_link' => 'nullable|string|max:255',
            'title' => 'nullable|string|max:255',
            'description' => 'nullable|string|max:255',
        ]);

        $data = $request->only(['youtube_link', 'title', 'description']);

        // Handle image upload
        if ($request->hasFile('image_url')) {
            // Hapus gambar lama jika ada
            $oldImagePath = public_path($heroCompany->image_url);
            if (file_exists($oldImagePath)) {
                unlink($oldImagePath);
            }

            // Simpan gambar baru
            $file = $request->file('image_url');
            $filename = time() . '_' . $file->getClientOriginalName();
            $file->move(public_path('storage/hero_company/'), $filename);

            // Perbarui path gambar di database
            $data['image_url'] = 'storage/hero_company/' . $filename;
        }

        // Update data lainnya
        $heroCompany->update($data);

        // Redirect ke halaman index setelah update berhasil
        return redirect()->route('hero-company.index');
    }


    /**
     * Remove the specified resource from storage.
     */
    public function destroy(HeroCompany $id)
    {
        $id->delete();
        return redirect()->route('hero-company.index');
    }
}
