<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\HeaderHome;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class HeaderHomeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $headerHome = HeaderHome::all();
        return Inertia::render('Admin/Home/ManageHeaderHome', [
            'dataHeaderHome' => $headerHome
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Admin/Home/CreateHeaderHome');
    }


    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'image_url' => 'nullable|image|mimes:jpg,jpeg,png|max:2048',
            'whatsapp_link' => 'nullable|string',
        ]);

        $data = $request->only(['title', 'description', 'whatsapp_link']);

        if ($request->hasFile('image_url')) {
            $file = $request->file('image_url');

            // Menggunakan nama asli dari file
            $filename = $file->getClientOriginalName();

            // Tambahkan logika untuk menangani nama file yang sama
            $path = 'public/header_home/' . $filename;
            $counter = 1;

            while (Storage::exists($path)) {
                // Menambahkan angka untuk membedakan nama file jika sudah ada
                $filename = pathinfo($filename, PATHINFO_FILENAME) . " ($counter)." . $file->getClientOriginalExtension();
                $path = 'public/header_home/' . $filename;
                $counter++;
            }

            // Menyimpan file
            $file->storeAs('public/header_home', $filename);
            $data['image_url'] = 'storage/header_home/' . $filename;
        }

        HeaderHome::create($data);

        return redirect()->route('header-home.index');
    }


    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit($id)
    {
        $headerHome = HeaderHome::findOrFail($id);
        return Inertia::render('Admin/Home/EditHeaderHome', [
            'dataHeaderHome' => $headerHome
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, HeaderHome $headerHome)
    {
        $request->validate([
            'title' => 'nullable|string|max:255',
            'description' => 'nullable|string',
            'image_url' => 'nullable|image|mimes:jpg,jpeg,png|max:2048',
            'whatsapp_link' => 'nullable|string',
        ]);

        $data = $request->only(['title', 'description', 'whatsapp_link']);

        // Handle image upload
        if ($request->hasFile('image_url')) {
            // Delete old image
            if ($headerHome->image_url && Storage::exists(str_replace('storage/', 'public/', $headerHome->image_url))) {
                Storage::delete(str_replace('storage/', 'public/', $headerHome->image_url));
            }

            $file = $request->file('image_url');

            // Menggunakan nama asli dari file
            $filename = $file->getClientOriginalName();

            // Tambahkan logika untuk menangani nama file yang sama
            $path = 'public/header_home/' . $filename;
            $counter = 1;

            while (Storage::exists($path)) {
                // Menambahkan angka untuk membedakan nama file jika sudah ada
                $filename = pathinfo($filename, PATHINFO_FILENAME) . " ($counter)." . $file->getClientOriginalExtension();
                $path = 'public/header_home/' . $filename;
                $counter++;
            }

            // Menyimpan file
            $file->storeAs('public/header_home', $filename);
            $data['image_url'] = 'storage/header_home/' . $filename;
        } else {
            // Gunakan existing image URL jika tidak ada gambar baru yang diupload
            $data['image_url'] = $headerHome->image_url;
        }

        // Update model
        $headerHome->update($data);

        return redirect()->route('header-home.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(HeaderHome $id)
    {
        $id->delete();
        return redirect()->route('header-home.index');
    }
}
