<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\users;
use Illuminate\Support\Facades\Auth;

class UsersController extends Controller
{
    public function signup(Request $request)
    {
        $user = users::create([
            'email' => $request->input('email'),
            'password' => bcrypt($request->input('password')), // Hash the password for security
            'full_name' => $request->input('fullname'),
            'user_name' => $request->input('username'),
            'gender' => $request->input('gender'),
            'bio' => $request->input('bio'),
            'date_of_birth' => $request->input('bdate')
        ]);

        return response()->json(['message' => 'User created successfully', 'user' => $user], 201);
    }

    public function login(Request $request)
    {
        $credentials = $request->only('email', 'password');

        if (!Auth::attempt($credentials)) {
            return response()->json([
                'status' => 'error',
                'message' => 'Unauthorized',
            ], 401);
        }

        $user = Auth::user();
        $token = $user->createToken('authToken')->plainTextToken;

        return response()->json([
            'status' => 'success',
            'user' => $user,
            'authorization' => [
                'token' => $token,
                'type' => 'bearer',
            ]
        ]);
    }
    
    public function getUserById($id)
    {
        $user = users::find($id);

        if (!$user) {
            return response()->json(['message' => 'User not found'], 404);
        }

        return response()->json($user);
    }
    
}
