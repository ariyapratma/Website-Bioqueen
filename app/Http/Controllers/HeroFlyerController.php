<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\HeroFlyer;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class HeroFlyerController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $heroFlyer = HeroFlyer::all();
        return Inertia::render('Admin/Home/ManageHeroFlyer', [
            'dataHeroFlyer' => $heroFlyer
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Admin/Home/CreateHeroFlyer');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'image_url' => 'nullable|image|mimes:jpg,jpeg,png|max:2048',
        ]);

        if ($request->hasFile('image_url')) {
            $file = $request->file('image_url');
            $filename = time() . '.' . $file->getClientOriginalExtension();
            $file->storeAs('public/hero_flyer', $filename);
            $data['image_url'] = 'storage/hero_flyer/' . $filename;
        }

        HeroFlyer::create($data);

        return redirect()->route('hero-flyer.index');
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit($id)
    {
        $heroFlyer = HeroFlyer::findOrFail($id);
        return Inertia::render('Admin/Home/EditHeroFlyer', [
            'dataHeroFlyer' => $heroFlyer
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, HeroFlyer $heroFlyer)
    {
        $request->validate([
            'image_url' => 'nullable|image|mimes:jpg,jpeg,png|max:2048',
        ]);

        if ($request->hasFile('image_url')) {
            if ($heroFlyer->image_url && Storage::exists(str_replace('storage/', 'public/', $heroFlyer->image_url))) {
                Storage::delete(str_replace('storage/', 'public/', $heroFlyer->image_url));
            }

            $file = $request->file('image_url');
            $filename = time() . '.' . $file->getClientOriginalExtension();
            $file->storeAs('public/hero_flyer', $filename);
            $data['image_url'] = 'storage/hero_flyer/' . $filename;
        } else {
            $data['image_url'] = $request->input('existing_image_url', $heroFlyer->image_url);
        }

        $heroFlyer->update($data);

        return redirect()->route('hero-flyer.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(HeroFlyer $id)
    {
        $id->delete();
        return redirect()->route('hero-flyer.index');
    }
}
