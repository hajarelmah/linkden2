<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Auth;

class AutoLoginController extends Controller
{
    public function autoLogin($userId)
    {
        // Fetch the user from the database
        $user = User::find($userId);

        if ($user) {
            // Log the user in
            Auth::login($user);

            // Redirect to chatify with userId
            return redirect('/chatify/getuserbyid/' . $userId);
        } else {
            // User not found, redirect to login page
            return redirect('/login')->withErrors(['User not found']);
        }
    }
}