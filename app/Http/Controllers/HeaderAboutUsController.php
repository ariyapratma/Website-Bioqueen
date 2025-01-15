<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\HeaderAboutUs;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class HeaderAboutUsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $headerAboutUs = HeaderAboutUs::all();
        return Inertia::render('Admin/AboutUs/ManageHeaderAboutUs', [
            'dataHeaderAboutUs' => $headerAboutUs
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Admin/AboutUs/CreateHeaderAboutUs');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string|max:255',
            'image_url' => 'nullable|image|mimes:jpg,jpeg,png|max:3072',
        ]);

        $data = $request->only(['title', 'description']);

        if ($request->hasFile('image_url')) {
            $file = $request->file('image_url');

            // Menggunakan nama asli dari file
            $filename = $file->getClientOriginalName();

            // Tambahkan logika untuk menangani nama file yang sama
            $path = 'public/header_about_us/' . $filename;
            $counter = 1;

            while (Storage::exists($path)) {
                // Menambahkan angka untuk membedakan nama file jika sudah ada
                $filename = pathinfo($filename, PATHINFO_FILENAME) . " ($counter)." . $file->getClientOriginalExtension();
                $path = 'public/header_about_us/' . $filename;
                $counter++;
            }

            // Menyimpan file
            $file->storeAs('public/header_about_us', $filename);
            $data['image_url'] = 'storage/header_about_us/' . $filename;
        }

        HeaderAboutUs::create($data);

        return redirect()->route('header-about-us.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(HeaderAboutUs $headerAboutUs)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit($id)
    {
        $headerAboutUs = HeaderAboutUs::findOrFail($id);
        return Inertia::render('Admin/AboutUs/EditHeaderAboutUs', [
            'dataHeaderAboutUs' => $headerAboutUs
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, HeaderAboutUs $headerAboutUs)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string||max:255',
            'image_url' => 'nullable|image|mimes:jpg,jpeg,png|max:3072',
        ]);

        $data = $request->only(['title', 'description']);

        // Handle image upload
        if ($request->hasFile('image_url')) {
            // Delete old image
            if ($headerAboutUs->image_url && Storage::exists(str_replace('storage/', 'public/', $headerAboutUs->image_url))) {
                Storage::delete(str_replace('storage/', 'public/', $headerAboutUs->image_url));
            }

            $file = $request->file('image_url');

            // Menggunakan nama asli dari file
            $filename = $file->getClientOriginalName();

            // Tambahkan logika untuk menangani nama file yang sama
            $path = 'public/header_about_us/' . $filename;
            $counter = 1;

            while (Storage::exists($path)) {
                // Menambahkan angka untuk membedakan nama file jika sudah ada
                $filename = pathinfo($filename, PATHINFO_FILENAME) . " ($counter)." . $file->getClientOriginalExtension();
                $path = 'public/header_about_us/' . $filename;
                $counter++;
            }

            // Menyimpan file
            $file->storeAs('public/header_about_us', $filename);
            $data['image_url'] = 'storage/header_about_us/' . $filename;
        } else {
            // Gunakan existing image URL jika tidak ada gambar baru yang diupload
            $data['image_url'] = $headerAboutUs->image_url;
        }

        // Update model
        $headerAboutUs->update($data);

        return redirect()->route('header-about-us.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(HeaderAboutUs $id)
    {
        $id->delete();
        return redirect()->route('header-about-us.index');
    }
}
