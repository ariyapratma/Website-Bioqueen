<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\HeroService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class HeroServiceController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $heroService = HeroService::all();
        return Inertia::render('Admin/Home/ManageHeroService', [
            'dataHeroService' => $heroService
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Admin/Home/CreateHeroService');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'image_url' => 'nullable|image|mimes:jpg,jpeg,png|max:2048',
            'heading1' => 'required|string|max:255',
            'content1' => 'nullable|string',
            'heading2' => 'required|string|max:255',
            'content2' => 'nullable|string',
            'heading3' => 'required|string|max:255',
            'content3' => 'nullable|string',
        ]);

        $data = $request->only(['title', 'heading1', 'content1', 'heading2', 'content2', 'heading3', 'content3']);

        if ($request->hasFile('image_url')) {
            $file = $request->file('image_url');

            // Menggunakan nama asli dari file
            $filename = $file->getClientOriginalName();

            // Tambahkan logika untuk menangani nama file yang sama
            $path = 'public/hero_service/' . $filename;
            $counter = 1;

            while (Storage::exists($path)) {
                // Menambahkan angka untuk membedakan nama file jika sudah ada
                $filename = pathinfo($filename, PATHINFO_FILENAME) . " ($counter)." . $file->getClientOriginalExtension();
                $path = 'public/hero_service/' . $filename;
                $counter++;
            }

            // Menyimpan file
            $file->storeAs('public/hero_service', $filename);
            $data['image_url'] = 'storage/hero_service/' . $filename;
        }

        HeroService::create($data);

        return redirect()->route('hero-service.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(HeroService $heroService)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit($id)
    {
        $heroService = HeroService::findOrFail($id);
        return Inertia::render('Admin/Home/EditHeroService', [
            'dataHeroService' => $heroService
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, HeroService $heroService)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'image_url' => 'nullable|image|mimes:jpg,jpeg,png|max:2048',
            'heading1' => 'required|string|max:255',
            'content1' => 'nullable|string',
            'heading2' => 'required|string|max:255',
            'content2' => 'nullable|string',
            'heading3' => 'required|string|max:255',
            'content3' => 'nullable|string',
        ]);

        $data = $request->only(['title', 'heading1', 'content1', 'heading2', 'content2', 'heading3', 'content3']);

        // Handle image upload
        if ($request->hasFile('image_url')) {
            // Delete old image
            if ($heroService->image_url && Storage::exists(str_replace('storage/', 'public/', $heroService->image_url))) {
                Storage::delete(str_replace('storage/', 'public/', $heroService->image_url));
            }

            $file = $request->file('image_url');

            // Menggunakan nama asli dari file
            $filename = $file->getClientOriginalName();

            // Tambahkan logika untuk menangani nama file yang sama
            $path = 'public/hero_service/' . $filename;
            $counter = 1;

            while (Storage::exists($path)) {
                // Menambahkan angka untuk membedakan nama file jika sudah ada
                $filename = pathinfo($filename, PATHINFO_FILENAME) . " ($counter)." . $file->getClientOriginalExtension();
                $path = 'public/hero_service/' . $filename;
                $counter++;
            }

            // Menyimpan file
            $file->storeAs('public/hero_service', $filename);
            $data['image_url'] = 'storage/hero_service/' . $filename;
        } else {
            // Gunakan existing image URL jika tidak ada gambar baru yang diupload
            $data['image_url'] = $heroService->image_url;
        }

        // Update model
        $heroService->update($data);

        return redirect()->route('hero-service.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(HeroService $id)
    {
        $id->delete();
        return redirect()->route('hero-service.index');
    }
}
