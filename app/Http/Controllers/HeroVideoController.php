<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\HeroVideo;
use Illuminate\Http\Request;

class HeroVideoController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $heroVideo = HeroVideo::all();
        return Inertia::render('Admin/Home/ManageHeroVideo', [
            'dataHeroVideo' => $heroVideo
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Admin/Home/CreateHeroVideo');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'subtitle' => 'required|nullable|string',
            'youtube_link' => 'required|nullable|string',
        ]);

        $data = $request->only(['title', 'subtitle', 'youtube_link']);

        HeroVideo::create($data);

        return redirect()->route('hero-video.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(HeroVideo $heroVideo)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit($id)
    {
        $heroVideo = HeroVideo::findOrFail($id);
        return Inertia::render('Admin/Home/EditHeroVideo', [
            'dataHeroVideo' => $heroVideo
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, HeroVideo $heroVideo)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'subtitle' => 'required|nullable|string',
            'youtube_link' => 'required|nullable|string',
        ]);

        $data = $request->only(['title', 'subtitle', 'youtube_link']);

        $heroVideo->update($data);

        return redirect()->route('hero-video.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(HeroVideo $id)
    {
        $id->delete();
        return redirect()->route('hero-video.index');
    }
}
