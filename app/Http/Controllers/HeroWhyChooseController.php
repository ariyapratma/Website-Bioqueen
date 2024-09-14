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
        return Inertia::render('Admin/ManageHeroWhyChoose', [
            'dataHeroWhyChoose' => $heroWhyChoose
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Admin/CreateHeroWhyChoose');
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
    public function edit(HeroWhyChoose $id)
    {
        $heroWhyChoose = HeroWhyChoose::findOrFail($id);
        return Inertia::render('Admin/EditHeroCompany', [
            'dataHeroCompany' => $heroWhyChoose
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

        // Proses gambar pertama jika ada
        if ($request->hasFile('image_url1')) {
            // Hapus gambar lama jika ada
            if ($heroWhyChoose->image_url1 && Storage::exists(str_replace('storage/', 'public/', $heroWhyChoose->image_url1))) {
                Storage::delete(str_replace('storage/', 'public/', $heroWhyChoose->image_url1));
            }

            $file = $request->file('image_url1');
            $filename = time() . '_1.' . $file->getClientOriginalExtension();
            $file->storeAs('public/hero_why_choose', $filename);
            $data['image_url1'] = 'storage/hero_why_choose/' . $filename;
        } else {
            // Gunakan gambar yang ada jika tidak ada gambar baru
            $data['image_url1'] = $heroWhyChoose->image_url1;
        }

        // Proses gambar kedua jika ada
        if ($request->hasFile('image_url2')) {
            // Hapus gambar lama jika ada
            if ($heroWhyChoose->image_url2 && Storage::exists(str_replace('storage/', 'public/', $heroWhyChoose->image_url2))) {
                Storage::delete(str_replace('storage/', 'public/', $heroWhyChoose->image_url2));
            }

            $file = $request->file('image_url2');
            $filename = time() . '_2.' . $file->getClientOriginalExtension();
            $file->storeAs('public/hero_why_choose', $filename);
            $data['image_url2'] = 'storage/hero_why_choose/' . $filename;
        } else {
            // Gunakan gambar yang ada jika tidak ada gambar baru
            $data['image_url2'] = $heroWhyChoose->image_url2;
        }

        // Update data ke database
        $heroWhyChoose->update($data);

        // Redirect setelah sukses
        return redirect()->route('hero-why-choose.index');
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
