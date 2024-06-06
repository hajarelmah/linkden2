<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\users;
use Illuminate\Support\Facades\Auth;

class UsersController extends Controller
{
    public function signup(Request $request)
    {
        // Validate incoming request
        $validatedData = $request->validate([
            'email' => 'required|email|unique:users',
            'pfp' => 'image|mimes:jpeg,png,jpg,gif|max:10000', // Validate image upload
            'password' => 'required|min:6',
            'full_name' => 'required|string|max:255',
            'user_name' => 'required|string|max:255|unique:users',
            'gender' => 'required|in:male,female,other',
            'bio' => 'nullable|string',
            'date_of_birth' => 'required|date'
        ]);
    
        // Handle file upload
        if ($request->hasFile('pfp')) {
            $image = $request->file('pfp');
            $imageName = time().'.'.$image->getClientOriginalExtension();
            $image->move(public_path('images'), $imageName);
            $imagePath = 'images/'.$imageName;
        }
    
        // Create user
        $user = users::create([
            'email' => $validatedData['email'],
            'pfp' => $imagePath ?? null, // Store image path if uploaded
            'password' => bcrypt($validatedData['password']),
            'full_name' => $validatedData['full_name'],
            'name' => $validatedData['user_name'],
            'user_name' => $validatedData['user_name'],
            'gender' => $validatedData['gender'],
            'bio' => $validatedData['bio'],
            'date_of_birth' => $validatedData['date_of_birth']
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
   
        public function modifyUser(Request $request, $id)
        {
            $user = users::find($id);
        
            if (!$user) {
                return response()->json(['message' => 'User not found'], 404);
            }
        
            // Check if the request contains a file
            if ($request->hasFile('pfp')) {
                // Get the file from the request
                $profilePicture = $request->file('pfp');
        
                // Store the file in a public directory (you can customize the storage location)
                $profilePicturePath = $profilePicture->store('pfp', 'public');
        
                // Update the user's profile picture path in the database
                $user->pfp = $profilePicturePath;
            }
        
            // Save the changes to the user
            $user->save();
        
            return response()->json(['message' => 'User profile updated successfully', 200]);
        
        
    }
    public function getUsers()
    {
        $users = users::all();

        return response()->json($users);
    }
    
}
