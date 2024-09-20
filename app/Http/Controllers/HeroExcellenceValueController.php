<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Models\HeroExcellenceValue;

class HeroExcellenceValueController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $heroExcellenceValue = HeroExcellenceValue::all();
        return Inertia::render('Admin/Home/ManageHeroExcellenceValue', [
            'dataHeroExcellenceValue' => $heroExcellenceValue
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Admin/Home/CreateHeroExcellenceValue');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'subtitle' => 'required|string|max:255',
            'heading1' => 'required|string|max:255',
            'content1' => 'required|string|max:255',
            'heading2' => 'required|string|max:255',
            'content2' => 'required|string|max:255',
            'heading3' => 'required|string|max:255',
            'content3' => 'required|string|max:255',
            'heading4' => 'required|string|max:255',
            'content4' => 'required|string|max:255',

        ]);

        $data = $request->only(['title', 'subtitle', 'heading1', 'content1', 'heading2', 'content2', 'heading3', 'content3', 'heading4', 'content4']);

        HeroExcellenceValue::create($data);

        return redirect()->route('hero-excellence-value.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(HeroExcellenceValue $heroExcellenceValue)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit($id)
    {
        $heroExcellenceValue = HeroExcellenceValue::findOrFail($id);
        return Inertia::render('Admin/Home/EditHeroExcellenceValue', [
            'dataHeroExcellenceValue' => $heroExcellenceValue
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, HeroExcellenceValue $heroExcellenceValue)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'subtitle' => 'required|string|max:255',
            'heading1' => 'required|string|max:255',
            'content1' => 'required|string|max:255',
            'heading2' => 'required|string|max:255',
            'content2' => 'required|string|max:255',
            'heading3' => 'required|string|max:255',
            'content3' => 'required|string|max:255',
            'heading4' => 'required|string|max:255',
            'content4' => 'required|string|max:255',

        ]);

        $data = $request->only(['title', 'subtitle', 'heading1', 'content1', 'heading2', 'content2', 'heading3', 'content3', 'heading4', 'content4']);

        $heroExcellenceValue->update($data);

        return redirect()->route('hero-excellence-value.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(HeroExcellenceValue $id)
    {
        $id->delete();
        return redirect()->route('hero-excellence-value.index');
    }
}
