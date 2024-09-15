<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Models\HeroFacilitiesValue;

class HeroFacilitiesValueController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $heroFacilitiesValue = HeroFacilitiesValue::all();
        return Inertia::render('Admin/ManageHeroFacilitiesValue', [
            'dataHeroFacilitiesValue' => $heroFacilitiesValue
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Admin/CreateHeroFacilitiesValue');
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
            $file = $request->file('image_url1');
            $filename = time() . '_1.' . $file->getClientOriginalExtension();
            $file->storeAs('public/hero_facilities_value', $filename);
            $data['image_url1'] = 'storage/hero_facilities_value/' . $filename;
        }

        // Proses gambar kedua jika ada
        if ($request->hasFile('image_url2')) {
            $file = $request->file('image_url2');
            $filename = time() . '_2.' . $file->getClientOriginalExtension();
            $file->storeAs('public/hero_facilities_value', $filename);
            $data['image_url2'] = 'storage/hero_facilities_value/' . $filename;
        }

        // Simpan data ke database
        HeroFacilitiesValue::create($data);

        // Redirect setelah sukses
        return redirect()->route('hero-facilities-value.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(HeroFacilitiesValue $heroFacilitiesValue)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(HeroFacilitiesValue $heroFacilitiesValue)
    {
        return Inertia::render('Admin/EditHeroFacilitiesValue', [
            'dataHeroFacilitiesValue' => $heroFacilitiesValue
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, HeroFacilitiesValue $heroFacilitiesValue)
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

        // Proses upload gambar
        $data['image_url1'] = $this->handleImageUpload($request, 'image_url1', $heroFacilitiesValue->image_url1, 'hero_facilities_value');
        $data['image_url2'] = $this->handleImageUpload($request, 'image_url2', $heroFacilitiesValue->image_url2, 'hero_facilities_value');

        // Update data ke database
        $heroFacilitiesValue->update($data);

        // Redirect setelah sukses
        return redirect()->route('hero-facilities-value.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(HeroFacilitiesValue $id)
    {
        $id->delete();
        return redirect()->route('hero-facilities-value.index');
    }
}
