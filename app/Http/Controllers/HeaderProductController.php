<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Models\HeaderProduct;
use Illuminate\Support\Facades\Storage;

class HeaderProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $headerProduct = HeaderProduct::all();
        return Inertia::render('Admin/Product/ManageHeaderProduct', [
            'dataHeaderProduct' => $headerProduct
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Admin/Product/CreateHeaderProduct');
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
            $file->storeAs('public/header_product', $filename);
            $data['image_url'] = 'storage/header_product/' . $filename;
        }

        HeaderProduct::create($data);

        return redirect()->route('header-product.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(HeaderProduct $headerProduct)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit($id)
    {
        $headerProduct = HeaderProduct::findOrFail($id);
        return Inertia::render('Admin/Product/EditHeaderProduct', [
            'dataHeaderProduct' => $headerProduct
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, HeaderProduct $headerProduct)
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
            if ($headerProduct->image_url && Storage::exists(str_replace('storage/', 'public/', $headerProduct->image_url))) {
                Storage::delete(str_replace('storage/', 'public/', $headerProduct->image_url));
            }

            $file = $request->file('image_url');
            $filename = time() . '.' . $file->getClientOriginalExtension();
            $file->storeAs('public/header_product', $filename);
            $data['image_url'] = 'storage/header_product/' . $filename;
        } else {
            // Use existing image URL if no new image is uploaded
            $data['image_url'] = $request->input('existing_image_url', $headerProduct->image_url);
        }

        $headerProduct->update($data);

        return redirect()->route('header-product.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(HeaderProduct $id)
    {
        $id->delete();
        return redirect()->route('header-product.index');
    }
}
