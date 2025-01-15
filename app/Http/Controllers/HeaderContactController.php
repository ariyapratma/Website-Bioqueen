<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Models\HeaderContact;
use Illuminate\Support\Facades\Storage;

class HeaderContactController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $headerContact = HeaderContact::all();
        return Inertia::render('Admin/Contact/ManageHeaderContact', [
            'dataHeaderContact' => $headerContact
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Admin/Contact/CreateHeaderContact');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string||max:255',
            'image_url' => 'nullable|image|mimes:jpg,jpeg,png|max:3072',
        ]);

        $data = $request->only(['title', 'description']);

        if ($request->hasFile('image_url')) {
            $file = $request->file('image_url');

            // Menggunakan nama asli dari file
            $filename = $file->getClientOriginalName();

            // Tambahkan logika untuk menangani nama file yang sama
            $path = 'public/header_contact/' . $filename;
            $counter = 1;

            while (Storage::exists($path)) {
                // Menambahkan angka untuk membedakan nama file jika sudah ada
                $filename = pathinfo($filename, PATHINFO_FILENAME) . " ($counter)." . $file->getClientOriginalExtension();
                $path = 'public/header_contact/' . $filename;
                $counter++;
            }

            // Menyimpan file
            $file->storeAs('public/header_contact', $filename);
            $data['image_url'] = 'storage/header_contact/' . $filename;
        }

        HeaderContact::create($data);

        return redirect()->route('header-contact.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(HeaderContact $headerContact)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit($id)
    {
        $headerContact = HeaderContact::findOrFail($id);
        return Inertia::render('Admin/Contact/EditHeaderContact', [
            'dataHeaderContact' => $headerContact
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, HeaderContact $headerContact)
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
            if ($headerContact->image_url && Storage::exists(str_replace('storage/', 'public/', $headerContact->image_url))) {
                Storage::delete(str_replace('storage/', 'public/', $headerContact->image_url));
            }

            $file = $request->file('image_url');

            // Menggunakan nama asli dari file
            $filename = $file->getClientOriginalName();

            // Tambahkan logika untuk menangani nama file yang sama
            $path = 'public/header_contact/' . $filename;
            $counter = 1;

            while (Storage::exists($path)) {
                // Menambahkan angka untuk membedakan nama file jika sudah ada
                $filename = pathinfo($filename, PATHINFO_FILENAME) . " ($counter)." . $file->getClientOriginalExtension();
                $path = 'public/header_contact/' . $filename;
                $counter++;
            }

            // Menyimpan file
            $file->storeAs('public/header_contact', $filename);
            $data['image_url'] = 'storage/header_contact/' . $filename;
        } else {
            // Gunakan existing image URL jika tidak ada gambar baru yang diupload
            $data['image_url'] = $headerContact->image_url;
        }

        $headerContact->update($data);

        return redirect()->route('header-contact.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(HeaderContact $id)
    {
        $id->delete();
        return redirect()->route('header-contact.index');
    }
}
