<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Models\HeroCertificate;
use Illuminate\Support\Facades\Storage;

class HeroCertificateController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $heroCertificate = HeroCertificate::all();
        return Inertia::render('Admin/Home/ManageHeroCertificate', [
            'dataHeroCertificate' => $heroCertificate
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Admin/Home/CreateHeroCertificate');
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
            'image_url1' => 'nullable|image|mimes:jpg,jpeg,png|max:2048',
            'image_url2' => 'nullable|image|mimes:jpg,jpeg,png|max:2048',
            'image_url3' => 'nullable|image|mimes:jpg,jpeg,png|max:2048',
            'image_url4' => 'nullable|image|mimes:jpg,jpeg,png|max:2048',
            'image_url5' => 'nullable|image|mimes:jpg,jpeg,png|max:2048',
        ]);

        // Ambil data input tanpa gambar
        $data = $request->only(['title', 'subtitle']);

        // Proses gambar pertama jika ada
        if ($request->hasFile('image_url1')) {
            $data['image_url1'] = $this->handleFileUpload($request->file('image_url1'), 'hero_certificate');
        }

        // Proses gambar kedua jika ada
        if ($request->hasFile('image_url2')) {
            $data['image_url2'] = $this->handleFileUpload($request->file('image_url2'), 'hero_certificate');
        }

        // Proses gambar ketiga jika ada
        if ($request->hasFile('image_url3')) {
            $data['image_url3'] = $this->handleFileUpload($request->file('image_url3'), 'hero_certificate');
        }

        // Proses gambar keempat jika ada
        if ($request->hasFile('image_url4')) {
            $data['image_url4'] = $this->handleFileUpload($request->file('image_url4'), 'hero_certificate');
        }

        // Proses gambar kelima jika ada
        if ($request->hasFile('image_url5')) {
            $data['image_url5'] = $this->handleFileUpload($request->file('image_url5'), 'hero_certificate');
        }

        // Simpan data ke database
        HeroCertificate::create($data);

        // Redirect setelah sukses
        return redirect()->route('hero-certificate.index');
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
    public function show(HeroCertificate $heroCertificate)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit($id)
    {
        $heroCertificate = HeroCertificate::findOrFail($id);
        return Inertia::render('Admin/Home/EditHeroCertificate', [
            'dataHeroCertificate' => $heroCertificate
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, HeroCertificate $heroCertificate)
    {
        // Validasi input
        $request->validate([
            'title' => 'required|string|max:255',
            'subtitle' => 'required|string|max:255',
            'image_url1' => 'nullable|image|mimes:jpg,jpeg,png|max:2048',
            'image_url2' => 'nullable|image|mimes:jpg,jpeg,png|max:2048',
            'image_url3' => 'nullable|image|mimes:jpg,jpeg,png|max:2048',
            'image_url4' => 'nullable|image|mimes:jpg,jpeg,png|max:2048',
            'image_url5' => 'nullable|image|mimes:jpg,jpeg,png|max:2048',
        ]);

        // Ambil data input tanpa gambar
        $data = $request->only(['title', 'subtitle']);

        // Proses gambar pertama jika ada
        if ($request->hasFile('image_url1')) {
            $data['image_url1'] = $this->handleFileUpload($request->file('image_url1'), 'hero_certificate');
        }

        // Proses gambar kedua jika ada
        if ($request->hasFile('image_url2')) {
            $data['image_url2'] = $this->handleFileUpload($request->file('image_url2'), 'hero_certificate');
        }

        // Proses gambar ketiga jika ada
        if ($request->hasFile('image_url3')) {
            $data['image_url3'] = $this->handleFileUpload($request->file('image_url3'), 'hero_certificate');
        }

        // Proses gambar keempat jika ada
        if ($request->hasFile('image_url4')) {
            $data['image_url4'] = $this->handleFileUpload($request->file('image_url4'), 'hero_certificate');
        }

        // Proses gambar kelima jika ada
        if ($request->hasFile('image_url5')) {
            $data['image_url5'] = $this->handleFileUpload($request->file('image_url5'), 'hero_certificate');
        }

        // Simpan data ke database
        $heroCertificate->update($data);

        // Redirect setelah sukses
        return redirect()->route('hero-certificate.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(HeroCertificate $id)
    {
        $id->delete();
        return redirect()->route('hero-certificate.index');
    }
}
