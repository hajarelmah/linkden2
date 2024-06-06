<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Providers\RouteServiceProvider;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Inertia\Inertia;

class RegisteredUserController extends Controller
{
    /**
     * Display the registration view.
     */
    public function create()
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
            'full_name' => 'required|string|max:100',
            'user_name' => 'required|string|max:100|unique:users', // Ensure 'users' matches your table name
            'email' => 'required|string|email|max:255|unique:users', // Ensure 'users' matches your table name
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
            'gender' => 'nullable|string|max:100',
            'bio' => 'nullable|string|max:100',
            'date_of_birth' => 'nullable|date',
            'pfp' => 'nullable|string|max:255',
            'role' => 'nullable|string|max:255',
        ]);

        $user = User::create([
            'full_name' => $request->full_name,
            'user_name' => $request->user_name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'gender' => $request->gender,
            'bio' => $request->bio,
            'date_of_birth' => $request->date_of_birth,
            'pfp' => $request->pfp,
            'role' => $request->role ?? 'user',
        ]);

        event(new Registered($user));

        Auth::login($user);

        return redirect(RouteServiceProvider::HOME);
    }
}
