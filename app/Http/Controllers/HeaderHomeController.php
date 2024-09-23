<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\HeaderHome;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;

class HeaderHomeController extends Controller
{
    public function index()
    {
        $headerHome = HeaderHome::all();
        return Inertia::render('Admin/Home/ManageHeaderHome', [
            'dataHeaderHome' => $headerHome
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/Home/CreateHeaderHome');
    }

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
            $filename = time() . '.' . $file->getClientOriginalExtension();
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

    public function edit($id)
    {
        $headerHome = HeaderHome::findOrFail($id);
        return Inertia::render('Admin/Home/EditHeaderHome', [
            'dataHeaderHome' => $headerHome
        ]);
    }

    public function update(Request $request, HeaderHome $headerHome)
    {
        $request->validate([
            'title' => 'nullable|string|max:255',
            'description' => 'nullable|string',
            'image_url' => 'nullable|image|mimes:jpg,jpeg,png|max:2048',
            'existing_image_url' => 'nullable|string',
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
            $filename = time() . '.' . $file->getClientOriginalExtension();
            $file->storeAs('public/header_home', $filename);
            $data['image_url'] = 'storage/header_home/' . $filename;
        } else {
            // Use existing image URL if no new image is uploaded
            $data['image_url'] = $request->input('existing_image_url', $headerHome->image_url);
        }

        // Debugging: Log data before updating
        Log::info('Updating HeaderHome:', ['data' => $data]);

        // Update model
        $updated = $headerHome->update($data);

        if ($updated) {
            return redirect()->route('header-home.index')->with('success', 'Header Home updated successfully.');
        } else {
            return redirect()->route('header-home.index')->with('error', 'Failed to update Header Home.');
        }
    }

    public function destroy(HeaderHome $id)
    {
        $id->delete();
        return redirect()->route('header-home.index');
    }
}
