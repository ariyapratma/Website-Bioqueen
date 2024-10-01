<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use App\Models\HeroCategories;
use Illuminate\Support\Facades\Storage;

class HeroCategoriesController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $heroCategories = HeroCategories::all();
        return Inertia::render('Admin/Product/ManageHeroCategories', [
            'dataHeroCategories' => $heroCategories
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Admin/Product/CreateHeroCategories');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // Validasi data yang diterima
        $request->validate([
            'slug' => 'string',
            'image_url' => 'image|mimes:jpeg,png,jpg,gif|max:2048',
            'name' => 'nullable|string|max:255',
            'description_categories' => 'nullable|string',
        ]);

        // // Buat slug dari nama
        // $slug = Str::slug($request->name, '-');

        // Simpan gambar ke folder hero_categories
        $file = $request->file('image_url');
        $filename = $file->getClientOriginalName();
        $path = 'public/hero_categories/' . $filename;

        $counter = 1;
        // Tangani jika nama file sama
        while (Storage::exists($path)) {
            $filename = pathinfo($filename, PATHINFO_FILENAME) . " ($counter)." . $file->getClientOriginalExtension();
            $path = 'public/hero_categories/' . $filename;
            $counter++;
        }

        // Simpan file ke storage
        $imagePath = $file->storeAs('hero_categories', $filename, 'public');

        // Simpan data kategori baru ke database
        HeroCategories::create([
            // 'slug' => $slug,
            'image_url' => Storage::url($imagePath),
            'name' => $request->name,
            'description_categories' => $request->description_categories,
        ]);

        return redirect()->route('hero-categories.index')->with('success', 'Hero Category created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(HeroCategories $heroCategories)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit($id)
    {
        $heroCategories = HeroCategories::findOrFail($id);
        return Inertia::render('Admin/Product/EditHeroCategories', [
            'dataHeroCategories' => $heroCategories
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, HeroCategories $heroCategories)
    {
        // Validasi data, tidak perlu mensyaratkan slug secara wajib
    $request->validate([
        'name' => 'string|max:255',
        'description_categories' => 'nullable|string',
        'slug' => 'string|unique:hero_categories,slug,' . $heroCategories->id, // Unique hanya untuk id yang berbeda
        'image_url' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
    ]);

    // Jika ada file gambar yang di-upload, proses simpan gambar
    if ($request->hasFile('image_url')) {
        $file = $request->file('image_url');
        $filename = $file->getClientOriginalName();
        $path = 'public/hero_categories/' . $filename;

        $counter = 1;
        while (Storage::exists($path)) {
            $filename = pathinfo($filename, PATHINFO_FILENAME) . " ($counter)." . $file->getClientOriginalExtension();
            $path = 'public/hero_categories/' . $filename;
            $counter++;
        }

        // Simpan gambar baru
        $imagePath = $file->storeAs('hero_categories', $filename, 'public');
        $heroCategories->image_url = Storage::url($imagePath);
    }

    // Update data heroCategories
    $heroCategories->update([
        'slug' => Str::slug($request->slug), // Generate slug dari input yang diberikan
        'name' => $request->name,
        'description_categories' => $request->description_categories,
    ]);

        return redirect()->route('hero-categories.index')->with('success', 'Hero Category updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(HeroCategories $id)
    {
        $id->delete();
        return redirect()->route('hero-categories.index');
    }
}
