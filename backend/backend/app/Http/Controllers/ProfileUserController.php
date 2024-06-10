<?php

//app/Http/Controllers/ProfileUserController.php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\ProfileUser; // Assuming you have a ProfileUser model

class ProfileUserController extends Controller
{
    public function store(Request $request)
    {
        // Validate incoming request data
        $validatedData = $request->validate([
            'usrId' => 'required', // Add validation rules for other fields
            'city' => 'required',
            // Add validation rules for other fields
        ]);

        // Create or update profile user data
        $profileUser = ProfileUser::updateOrCreate(['usrId' => $request->usrId], $validatedData);

        // Return a response indicating success
        return response()->json(['message' => 'Profile user created/updated successfully', 'data' => $profileUser]);
    }
}
