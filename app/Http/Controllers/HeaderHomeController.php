<?php

namespace App\Http\Controllers;

use App\Models\HeaderHome;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;

class HeaderHomeController extends Controller
{
    public function index()
    {
        $headerHome = HeaderHome::all();
        return Inertia::render('Admin/ManageHeaderHome', [
            'dataHeaderHome' => $headerHome
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/CreateHeaderHome');
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

    public function edit(HeaderHome $headerHome)
    {
        return Inertia::render('Admin/EditHeaderHome', [
            'headerHome' => $headerHome
        ]);
    }

    public function update(Request $request, HeaderHome $headerHome)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'image_url' => 'nullable|image|mimes:jpg,jpeg,png|max:2048',
            'whatsapp_link' => 'nullable|string',
        ]);

        $data = $request->only(['title', 'description', 'whatsapp_link']);

        if ($request->hasFile('image_url')) {
            // Delete old image
            if ($headerHome->image_url && Storage::exists(str_replace('storage/', 'public/', $headerHome->image_url))) {
                Storage::delete(str_replace('storage/', 'public/', $headerHome->image_url));
            }

            $file = $request->file('image_url');
            $filename = time() . '.' . $file->getClientOriginalExtension();
            $file->storeAs('public/header_home', $filename);
            $data['image_url'] = 'storage/header_home/' . $filename;
        }

        $headerHome->update($data);

        return redirect()->route('header-home.index');
    }
}
