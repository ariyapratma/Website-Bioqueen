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
            $file = $request->file('image_url1');
            $filename = time() . '_1.' . $file->getClientOriginalExtension();
            $file->storeAs('public/hero_why_choose', $filename);
            $data['image_url1'] = 'storage/hero_why_choose/' . $filename;
        }

        // Proses gambar kedua jika ada
        if ($request->hasFile('image_url2')) {
            $file = $request->file('image_url2');
            $filename = time() . '_2.' . $file->getClientOriginalExtension();
            $file->storeAs('public/hero_why_choose', $filename);
            $data['image_url2'] = 'storage/hero_why_choose/' . $filename;
        }

        // Simpan data ke database
        HeroWhyChoose::create($data);

        // Redirect setelah sukses
        return redirect()->route('hero-why-choose.index');
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

        // Proses upload gambar
        $data['image_url1'] = $this->handleImageUpload($request, 'image_url1', $heroWhyChoose->image_url1, 'hero_why_choose');
        $data['image_url2'] = $this->handleImageUpload($request, 'image_url2', $heroWhyChoose->image_url2, 'hero_why_choose');

        // Update data ke database
        $heroWhyChoose->update($data);

        // Redirect setelah sukses
        return redirect()->route('hero-why-choose.index');
    }

    private function handleImageUpload($request, $fieldName, $existingImagePath, $directory)
    {
        if ($request->hasFile($fieldName)) {
            // Hapus gambar lama jika ada
            if ($existingImagePath && Storage::exists(str_replace('storage/', 'public/', $existingImagePath))) {
                Storage::delete(str_replace('storage/', 'public/', $existingImagePath));
            }

            // Simpan gambar baru
            $file = $request->file($fieldName);
            $filename = time() . '_' . $fieldName . '.' . $file->getClientOriginalExtension();
            $file->storeAs('public/' . $directory, $filename);
            return 'storage/' . $directory . '/' . $filename;
        }

        // Kembalikan gambar lama jika tidak ada upload baru
        return $existingImagePath;
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
