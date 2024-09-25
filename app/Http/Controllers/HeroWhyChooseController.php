<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Models\HeroWhyChoose;
use Illuminate\Support\Facades\Storage;

class HeroWhyChooseController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $heroWhyChoose = HeroWhyChoose::all();
        return Inertia::render('Admin/Home/ManageHeroWhyChoose', [
            'dataHeroWhyChoose' => $heroWhyChoose
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Admin/Home/CreateHeroWhyChoose');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // Validasi input
        $request->validate([
            'title' => 'required|string|max:255',
            'subtitle' => 'required|string|max:255',
            'heading1' => 'required|string|max:255',
            'content1' => 'nullable|string',
            'heading2' => 'required|string|max:255',
            'content2' => 'nullable|string',
            'image_url1' => 'nullable|image|mimes:jpg,jpeg,png|max:2048',
            'image_url2' => 'nullable|image|mimes:jpg,jpeg,png|max:2048',
        ]);

        // Ambil data input tanpa gambar
        $data = $request->only(['title', 'subtitle', 'heading1', 'content1', 'heading2', 'content2']);

        // Proses gambar pertama jika ada
        if ($request->hasFile('image_url1')) {
            $data['image_url1'] = $this->handleFileUpload($request->file('image_url1'), 'hero_why_choose');
        }

        // Proses gambar kedua jika ada
        if ($request->hasFile('image_url2')) {
            $data['image_url2'] = $this->handleFileUpload($request->file('image_url2'), 'hero_why_choose');
        }

        // Simpan data ke database
        HeroWhyChoose::create($data);

        // Redirect setelah sukses
        return redirect()->route('hero-why-choose.index');
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
    public function show(HeroWhyChoose $heroWhyChoose)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit($id)
    {
        $heroWhyChoose = HeroWhyChoose::findOrFail($id);
        return Inertia::render('Admin/Home/EditHeroWhyChoose', [
            'dataHeroWhyChoose' => $heroWhyChoose
        ]);
    }


    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, HeroWhyChoose $heroWhyChoose)
    {
        // Validasi input
        $request->validate([
            'title' => 'nullable|string|max:255',
            'subtitle' => 'nullable|string|max:255',
            'heading1' => 'nullable|string|max:255',
            'content1' => 'nullable|string',
            'heading2' => 'nullable|string|max:255',
            'content2' => 'nullable|string',
            'image_url1' => 'nullable|image|mimes:jpg,jpeg,png|max:2048',
            'image_url2' => 'nullable|image|mimes:jpg,jpeg,png|max:2048',
        ]);

        // Ambil data input tanpa gambar
        $data = $request->only(['title', 'subtitle', 'heading1', 'content1', 'heading2', 'content2']);

        // Proses gambar pertama jika ada
        if ($request->hasFile('image_url1')) {
            $data['image_url1'] = $this->handleFileUpload($request->file('image_url1'), 'hero_why_choose');
        }

        // Proses gambar kedua jika ada
        if ($request->hasFile('image_url2')) {
            $data['image_url2'] = $this->handleFileUpload($request->file('image_url2'), 'hero_why_choose');
        }

        // Simpan data ke database
        $heroWhyChoose->update($data);

        // Redirect setelah sukses
        return redirect()->route('hero-why-choose.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(HeroWhyChoose $id)
    {
        $id->delete();
        return redirect()->route('hero-why-choose.index');
    }
}
