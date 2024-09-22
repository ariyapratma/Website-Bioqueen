<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\HeroCompany;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class HeroCompanyController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $heroCompany = HeroCompany::all();
        return Inertia::render('Admin/Home/ManageHeroCompany', [
            'dataHeroCompany' => $heroCompany
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Admin/Home/CreateHeroCompany');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'image_url' => 'image|mimes:jpg,jpeg,png|max:2048',
            'youtube_link' => 'nullable|string',
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
        ]);

        $data = $request->only(['youtube_link', 'title', 'description']);

        if ($request->hasFile('image_url')) {
            $file = $request->file('image_url');
            $filename = time() . '.' . $file->getClientOriginalExtension();
            $file->storeAs('public/hero_company', $filename);
            $data['image_url'] = 'storage/hero_company/' . $filename;
        }

        HeroCompany::create($data);

        return redirect()->route('hero-company.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(HeroCompany $heroCompany)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit($id)
    {
        $heroCompany = HeroCompany::findOrFail($id);
        return Inertia::render('Admin/Home/EditHeroCompany', [
            'dataHeroCompany' => $heroCompany
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, HeroCompany $heroCompany)
    {
        $request->validate([
            'image_url' => 'nullable|image|mimes:jpg,jpeg,png|max:2048',
            'youtube_link' => 'nullable|string',
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
        ]);

        $data = $request->only(['youtube_link', 'title', 'description']);

        // Handle image upload
        if ($request->hasFile('image_url')) {
            // Delete old image
            if ($heroCompany->image_url && Storage::exists(str_replace('storage/', 'public/', $heroCompany->image_url))) {
                Storage::delete(str_replace('storage/', 'public/', $heroCompany->image_url));
            }

            $file = $request->file('image_url');
            $filename = time() . '.' . $file->getClientOriginalExtension();
            $file->storeAs('public/hero_company', $filename);
            $data['image_url'] = 'storage/hero_company/' . $filename;
        } else {
            // Use existing image URL if no new image is uploaded
            $data['image_url'] = $request->input('existing_image_url', $heroCompany->image_url);
        }

        $heroCompany->update($data);

        return redirect()->route('hero-company.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(HeroCompany $id)
    {
        $id->delete();
        return redirect()->route('hero-company.index');
    }
}
