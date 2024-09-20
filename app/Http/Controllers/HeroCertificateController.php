<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Models\HeroCertificate;

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
            $file = $request->file('image_url1');
            $filename = time() . '_1.' . $file->getClientOriginalExtension();
            $file->storeAs('public/hero_certificate', $filename);
            $data['image_url1'] = 'storage/hero_certificate/' . $filename;
        }

        // Proses gambar kedua jika ada
        if ($request->hasFile('image_url2')) {
            $file = $request->file('image_url2');
            $filename = time() . '_2.' . $file->getClientOriginalExtension();
            $file->storeAs('public/hero_certificate', $filename);
            $data['image_url2'] = 'storage/hero_certificate/' . $filename;
        }

        // Proses gambar ketiga jika ada
        if ($request->hasFile('image_url3')) {
            $file = $request->file('image_url3');
            $filename = time() . '_3.' . $file->getClientOriginalExtension();
            $file->storeAs('public/hero_certificate', $filename);
            $data['image_url3'] = 'storage/hero_certificate/' . $filename;
        }

        // Proses gambar keempat jika ada
        if ($request->hasFile('image_url4')) {
            $file = $request->file('image_url4');
            $filename = time() . '_4.' . $file->getClientOriginalExtension();
            $file->storeAs('public/hero_certificate', $filename);
            $data['image_url4'] = 'storage/hero_certificate/' . $filename;
        }

        // Proses gambar kelima jika ada
        if ($request->hasFile('image_url5')) {
            $file = $request->file('image_url5');
            $filename = time() . '_5.' . $file->getClientOriginalExtension();
            $file->storeAs('public/hero_certificate', $filename);
            $data['image_url5'] = 'storage/hero_certificate/' . $filename;
        }

        // Simpan data ke database
        HeroCertificate::create($data);

        // Redirect setelah sukses
        return redirect()->route('hero-certificate.index');
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

        // Proses upload gambar
        $data['image_url1'] = $this->handleImageUpload($request, 'image_url1', $heroCertificate->image_url1, 'hero_certificate');
        $data['image_url2'] = $this->handleImageUpload($request, 'image_url2', $heroCertificate->image_url2, 'hero_certificate');
        $data['image_url3'] = $this->handleImageUpload($request, 'image_url3', $heroCertificate->image_url3, 'hero_certificate');
        $data['image_url4'] = $this->handleImageUpload($request, 'image_url4', $heroCertificate->image_url4, 'hero_certificate');
        $data['image_url5'] = $this->handleImageUpload($request, 'image_url5', $heroCertificate->image_url5, 'hero_certificate');

        // Update data ke database
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
