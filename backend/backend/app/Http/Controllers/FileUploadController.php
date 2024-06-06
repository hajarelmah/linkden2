<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use App\Models\Resumes;

class FileUploadController extends Controller
{
    public function e(){
        return "yes ";
    }
    public function upload(Request $request)
    {
        // Validate the uploaded file
      
        // Check if the request contains a file
        if ($request->hasFile('resume')) {
            // Get the uploaded file
            $file = $request->file('resume');

            // Store the file in the storage directory
            $path = $file->store('resumes');

            // Optionally, you can save file details to the database
            // For example:
            $resume = new Resumes();
            $resume->filename = $file->getClientOriginalName();
            $resume->filepath = $path;
            // Add any other attributes you want to save
            $resume->save();

            return response()->json(['message' => 'File uploaded successfully', 'path' => $path,200]);
        } else {
            return response()->json(['error' => 'No file uploaded'], 400);
        }
    }
}
