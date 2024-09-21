<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\HeaderMaklon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class HeaderMaklonController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $headerMaklon = HeaderMaklon::all();
        return Inertia::render('Admin/Maklon/ManageHeaderMaklon', [
            'dataHeaderMaklon' => $headerMaklon
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Admin/Maklon/CreateHeaderMaklon');
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
            $filename = time() . '.' . $file->getClientOriginalExtension();
            $file->storeAs('public/header_maklon', $filename);
            $data['image_url'] = 'storage/header_maklon/' . $filename;
        }

        HeaderMaklon::create($data);

        return redirect()->route('header-maklon.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(HeaderMaklon $headerMaklon)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(HeaderMaklon $id)
    {
        $headerMaklon = HeaderMaklon::findOrFail($id);
        return Inertia::render('Admin/Maklon/EditHeaderMaklon', [
            'dataHeaderMaklon' => $headerMaklon
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, HeaderMaklon $headerMaklon)
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
            if ($headerMaklon->image_url && Storage::exists(str_replace('storage/', 'public/', $headerMaklon->image_url))) {
                Storage::delete(str_replace('storage/', 'public/', $headerMaklon->image_url));
            }

            $file = $request->file('image_url');
            $filename = time() . '.' . $file->getClientOriginalExtension();
            $file->storeAs('public/header_maklon', $filename);
            $data['image_url'] = 'storage/header_maklon/' . $filename;
        } else {
            // Use existing image URL if no new image is uploaded
            $data['image_url'] = $request->input('existing_image_url', $headerMaklon->image_url);
        }

        $headerMaklon->update($data);

        return redirect()->route('header-maklon.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(HeaderMaklon $id)
    {
        $id->delete();
        return redirect()->route('header-maklon.index');
    }
}
