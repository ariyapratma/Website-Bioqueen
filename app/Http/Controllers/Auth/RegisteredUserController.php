<?php

namespace App\Http\Controllers\Auth;

use App\Models\User;
use Inertia\Inertia;
use Inertia\Response;
use Laravolt\Avatar\Avatar;
use Illuminate\Http\Request;
use Illuminate\Validation\Rules;
use Spatie\Permission\Models\Role;
use Illuminate\Support\Facades\Log;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Http\RedirectResponse;
use Illuminate\Auth\Events\Registered;
use App\Providers\RouteServiceProvider;

class RegisteredUserController extends Controller
{
    /**
     * Display the registration view.
     */
    public function create(): Response
    {
        return Inertia::render('Auth/Register');
    }

    /**
     * Handle an incoming registration request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */

    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|lowercase|email|max:255|unique:' . User::class,
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
        ]);

        // Create roles 'user' and 'admin' if not already present
        Role::firstOrCreate(['name' => 'user']);
        Role::firstOrCreate(['name' => 'admin']);

        // Create the user
        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        // Generate avatar and save it to the storage
        $avatar = new Avatar();
        $avatar->create($request->name)
            ->save(storage_path('app/public/avatars/' . $user->id . '.png'));

        // Assign default 'user' role
        $user->assignRole('user');

        // Assign 'admin' role for specific email address
        if ($request->email === 'adminbioqueen@indonesia.com') {
            $user->syncRoles(['admin']);
        }

        app()->make(\Spatie\Permission\PermissionRegistrar::class)->forgetCachedPermissions();

        // Log the roles assigned (for debugging)
        Log::info('Roles assigned: ' . json_encode($user->getRoleNames()));

        // Trigger the registered event
        event(new Registered($user));

        // Log in the user
        Auth::login($user);

        return redirect(RouteServiceProvider::HOME);
    }
}
