<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\usersController;
/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/
Route::post("/signup",[usersController::class,"signup"]);
Route::post("/login",[usersController::class,"login"]);
Route::post('/UpdateProfile', [ProfileController::class, 'updateProfile']);

Route::get("/getuserById/{id}", [usersController::class, "getuserById"]);


Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

