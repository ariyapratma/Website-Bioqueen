<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\HeroReview;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Laravolt\Avatar\Facade as Avatar;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Spatie\Permission\Traits\HasRoles;

class HeroReviewController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $heroReview = HeroReview::all();

        if (Auth::check()) {
            $user = Auth::user();

            if (!$user->hasRole('user')) {
                $user->assignRole('user');
            }
            if ($user->email === 'adminbioqueen@indonesia.com' && !$user->hasRole('admin')) {
                $user->assignRole('admin');
            }
            if ($user->hasRole('admin')) {
                return Inertia::render('Admin/Home/ManageHeroReview', [
                    'dataHeroReview' => $heroReview,
                ]);
            }
        }

        return Inertia::render('Home/Index', [
            'dataHeroReview' => $heroReview,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'rating' => 'required|integer|min:1|max:5',
            'comment' => 'required|string|max:255',
        ]);

        $avatarPath = 'avatars/' . Auth::user()->id . '.png';
        $avatarUrl = asset('storage/' . $avatarPath);

        HeroReview::create([
            'name' => Auth::user()->name,
            'avatar' => $avatarUrl,
            'rating' => $request->rating,
            'comment' => $request->comment,
            'user_id' => Auth::id(),
        ]);

        return redirect()->route('index');
    }

    /**
     * Display the specified resource.
     */
    public function show(HeroReview $heroReview)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(HeroReview $heroReview)
    {
        return Inertia::render('Admin/Home/EditHeroReview', [
            'dataHeroReview' => $heroReview
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, HeroReview $heroReview)
    {
        $request->validate([
            'rating' => 'required|integer|min:1|max:5',
            'comment' => 'required|string|max:255',
        ]);

        $heroReview->update([
            'rating' => $request->rating,
            'comment' => $request->comment,
        ]);
        return redirect()->route('hero-review.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(HeroReview $id)
    {
        $id->delete();
        return redirect()->route('hero-review.index');
    }
}
