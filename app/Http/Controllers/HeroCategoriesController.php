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
            'slug' => 'nullable|string|unique:hero_categories,slug',
            'image_url' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048', // Izinkan nullable
            'name' => 'required|string|max:255',
            'description_categories' => 'nullable|string',
        ]);

        // Buat slug dari name jika slug tidak diberikan
        $slug = $request->slug ?? Str::slug($request->name, '-');

        // Proses gambar hanya jika ada gambar yang diunggah
        if ($request->hasFile('image_url')) {
            $file = $request->file('image_url');
            $filename = pathinfo($file->getClientOriginalName(), PATHINFO_FILENAME);
            $extension = $file->getClientOriginalExtension();
            $path = 'public/hero_categories/' . $filename . '.' . $extension;

            $counter = 1;
            while (Storage::exists($path)) {
                $filename = pathinfo($file->getClientOriginalName(), PATHINFO_FILENAME) . " ($counter)";
                $path = 'public/hero_categories/' . $filename . '.' . $extension;
                $counter++;
            }

            // Simpan gambar
            $imagePath = $file->storeAs('hero_categories', $filename . '.' . $extension, 'public');
            $imageUrl = Storage::url($imagePath);
        } else {
            // Jika tidak ada gambar, berikan nilai default
            $imageUrl = '/default-image-url.jpg'; // Ubah sesuai gambar default Anda
        }

        // Simpan data kategori baru ke database
        HeroCategories::create([
            'slug' => $slug,
            'image_url' => $imageUrl, // Pastikan image_url terisi
            'name' => $request->name,
            'description_categories' => $request->description_categories,
        ]);

        return redirect()->route('hero-categories.index')->with('success', 'Hero Category created successfully.');
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
        // Validasi data
        $request->validate([
            'image_url' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'name' => 'string|max:255',
            'description_categories' => 'nullable|string',
            'slug' => 'nullable|string|unique:hero_categories,slug,' . $heroCategories->id,
        ]);

        // Buat slug jika tidak diberikan
        $slug = $request->slug ? Str::slug($request->slug) : $heroCategories->slug;

        // Proses gambar jika ada
        if ($request->hasFile('image_url')) {
            // Hapus gambar lama jika ada
            if ($heroCategories->image_url) {
                $oldImagePath = str_replace('/storage/', 'public/', $heroCategories->image_url);
                if (Storage::exists($oldImagePath)) {
                    Storage::delete($oldImagePath);
                }
            }

            $file = $request->file('image_url');
            $filename = pathinfo($file->getClientOriginalName(), PATHINFO_FILENAME);
            $extension = $file->getClientOriginalExtension();
            $path = 'public/hero_categories/' . $filename . '.' . $extension;

            $counter = 1;
            while (Storage::exists($path)) {
                $filename = pathinfo($file->getClientOriginalName(), PATHINFO_FILENAME) . " ($counter)";
                $path = 'public/hero_categories/' . $filename . '.' . $extension;
                $counter++;
            }

            // Simpan gambar baru
            $imagePath = $file->storeAs('hero_categories', $filename . '.' . $extension, 'public');
            $heroCategories->image_url = Storage::url($imagePath);
        }

        // Update data heroCategories
        $heroCategories->update([
            'slug' => $slug,
            'image_url' => $heroCategories->image_url ?? '/default-image-url.jpg', // Pastikan image_url terisi
            'name' => $request->name,
            'description_categories' => $request->description_categories,
        ]);

        return redirect()->route('hero-categories.index')->with('success', 'Hero Category updated successfully.');
    }


    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $heroCategories = HeroCategories::findOrFail($id);

        // Hapus gambar jika ada
        if ($heroCategories->image_url) {
            $oldImagePath = str_replace('/storage/', 'public/', $heroCategories->image_url);
            if (Storage::exists($oldImagePath)) {
                Storage::delete($oldImagePath);
            }
        }

        $heroCategories->delete();

        return redirect()->route('hero-categories.index')->with('success', 'Hero Category deleted successfully.');
    }
}
