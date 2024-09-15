<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Models\HeroTeamValue;
use Illuminate\Support\Facades\Storage;

class HeroTeamValueController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $heroTeamValue = HeroTeamValue::all();
        return Inertia::render('Admin/ManageHeroTeamValue', [
            'dataHeroTeamValue' => $heroTeamValue
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Admin/CreateHeroTeamValue');
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
            $file->storeAs('public/hero_team_value', $filename);
            $data['image_url1'] = 'storage/hero_team_value/' . $filename;
        }

        // Proses gambar kedua jika ada
        if ($request->hasFile('image_url2')) {
            $file = $request->file('image_url2');
            $filename = time() . '_2.' . $file->getClientOriginalExtension();
            $file->storeAs('public/hero_team_value', $filename);
            $data['image_url2'] = 'storage/hero_team_value/' . $filename;
        }

        // Simpan data ke database
        HeroTeamValue::create($data);

        // Redirect setelah sukses
        return redirect()->route('hero-team-value.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(HeroTeamValue $heroTeamValue)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(HeroTeamValue $heroTeamValue)
    {
        return Inertia::render('Admin/EditHeroTeamValue', [
            'dataHeroTeamValue' => $heroTeamValue
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, HeroTeamValue $heroTeamValue)
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
        $data['image_url1'] = $this->handleImageUpload($request, 'image_url1', $heroTeamValue->image_url1, 'hero_team_value');
        $data['image_url2'] = $this->handleImageUpload($request, 'image_url2', $heroTeamValue->image_url2, 'hero_team_value');

        // Update data ke database
        $heroTeamValue->update($data);

        // Redirect setelah sukses
        return redirect()->route('hero-team-value.index');
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
    public function destroy(HeroTeamValue $id)
    {
        $id->delete();
        return redirect()->route('hero-team-value.index');
    }
}
