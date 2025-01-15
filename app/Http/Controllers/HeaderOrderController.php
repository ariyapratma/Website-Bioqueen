<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\HeaderOrder;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class HeaderOrderController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $headerOrder = HeaderOrder::all();
        return Inertia::render('Admin/Order/ManageHeaderOrder', [
            'dataHeaderOrder' => $headerOrder
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Admin/Order/CreateHeaderOrder');
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
            $path = 'public/header_order/' . $filename;
            $counter = 1;

            while (Storage::exists($path)) {
                // Menambahkan angka untuk membedakan nama file jika sudah ada
                $filename = pathinfo($filename, PATHINFO_FILENAME) . " ($counter)." . $file->getClientOriginalExtension();
                $path = 'public/header_order/' . $filename;
                $counter++;
            }

            // Menyimpan file
            $file->storeAs('public/header_order', $filename);
            $data['image_url'] = 'storage/header_order/' . $filename;
        }

        HeaderOrder::create($data);

        return redirect()->route('header-order.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(HeaderOrder $headerOrder)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit($id)
    {
        $headerOrder = HeaderOrder::findOrFail($id);
        return Inertia::render('Admin/Order/EditHeaderOrder', [
            'dataHeaderOrder' => $headerOrder
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, HeaderOrder $headerOrder)
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
            if ($headerOrder->image_url && Storage::exists(str_replace('storage/', 'public/', $headerOrder->image_url))) {
                Storage::delete(str_replace('storage/', 'public/', $headerOrder->image_url));
            }

            $file = $request->file('image_url');

            // Menggunakan nama asli dari file
            $filename = $file->getClientOriginalName();

            // Tambahkan logika untuk menangani nama file yang sama
            $path = 'public/header_order/' . $filename;
            $counter = 1;

            while (Storage::exists($path)) {
                // Menambahkan angka untuk membedakan nama file jika sudah ada
                $filename = pathinfo($filename, PATHINFO_FILENAME) . " ($counter)." . $file->getClientOriginalExtension();
                $path = 'public/header_order/' . $filename;
                $counter++;
            }

            // Menyimpan file
            $file->storeAs('public/header_order', $filename);
            $data['image_url'] = 'storage/header_order/' . $filename;
        } else {
            // Gunakan existing image URL jika tidak ada gambar baru yang diupload
            $data['image_url'] = $headerOrder->image_url;
        }

        $headerOrder->update($data);

        return redirect()->route('header-order.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(HeaderOrder $id)
    {
        $id->delete();
        return redirect()->route('header-order.index');
    }
}
