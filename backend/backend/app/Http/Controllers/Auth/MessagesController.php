<?php
namespace App\Http\Controllers;


use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class MessagesController extends Controller
{
    // Ensure no middleware enforcing auth in the constructor
    // public function __construct()
    // {
    //     $this->middleware('auth');
    // }

    public function index(Request $request)
    {
        // Your logic here, without authentication checks
    }

    public function send(Request $request)
    {
        // Your logic here, without authentication checks
    }

    // Other methods as required
}
