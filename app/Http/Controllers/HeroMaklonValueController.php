<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Models\HeroMaklonValue;
use Illuminate\Support\Facades\Storage;

class HeroMaklonValueController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $heroMaklonValue = HeroMaklonValue::all();
        return Inertia::render('Admin/Home/ManageHeroMaklonValue', [
            'dataHeroMaklonValue' => $heroMaklonValue
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Admin/Home/CreateHeroMaklonValue');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // Validasi input
        $request->validate([
            'title' => 'required|string|max:255',
            'heading1' => 'required|string|max:255',
            'content1' => 'nullable|string',
            'image_url1' => 'nullable|image|mimes:jpg,jpeg,png|max:2048',
            'heading2' => 'required|string|max:255',
            'content2' => 'nullable|string',
            'image_url2' => 'nullable|image|mimes:jpg,jpeg,png|max:2048',
        ]);

        // Ambil data input tanpa gambar
        $data = $request->only(['title', 'heading1', 'content1', 'heading2', 'content2']);

        // Proses gambar pertama jika ada
        if ($request->hasFile('image_url1')) {
            $data['image_url1'] = $this->handleFileUpload($request->file('image_url1'), 'hero_maklon_value');
        }

        // Proses gambar kedua jika ada
        if ($request->hasFile('image_url2')) {
            $data['image_url2'] = $this->handleFileUpload($request->file('image_url2'), 'hero_maklon_value');
        }

        // Simpan data ke database
        HeroMaklonValue::create($data);

        // Redirect setelah sukses
        return redirect()->route('hero-maklon-value.index');
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
    public function show(HeroMaklonValue $heroMaklonValue)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit($id)
    {
        $heroMaklonValue = HeroMaklonValue::findOrFail($id);
        return Inertia::render('Admin/Home/EditHeroMaklonValue', [
            'dataHeroMaklonValue' => $heroMaklonValue
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, HeroMaklonValue $heroMaklonValue)
    {
        // Validasi input
        $request->validate([
            'title' => 'required|string|max:255',
            'heading1' => 'required|string|max:255',
            'content1' => 'nullable|string',
            'image_url1' => 'nullable|image|mimes:jpg,jpeg,png|max:2048',
            'heading2' => 'required|string|max:255',
            'content2' => 'nullable|string',
            'image_url2' => 'nullable|image|mimes:jpg,jpeg,png|max:2048',
        ]);

        // Ambil data input tanpa gambar
        $data = $request->only(['title', 'heading1', 'content1', 'heading2', 'content2']);

        // Proses gambar pertama jika ada
        if ($request->hasFile('image_url1')) {
            $data['image_url1'] = $this->handleFileUpload($request->file('image_url1'), 'hero_maklon_value');
        }

        // Proses gambar kedua jika ada
        if ($request->hasFile('image_url2')) {
            $data['image_url2'] = $this->handleFileUpload($request->file('image_url2'), 'hero_maklon_value');
        }

        // Simpan data ke database
        $heroMaklonValue->update($data);

        // Redirect setelah sukses
        return redirect()->route('hero-maklon-value.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(HeroMaklonValue $id)
    {
        $id->delete();
        return redirect()->route('hero-maklon-value.index');
    }
}
