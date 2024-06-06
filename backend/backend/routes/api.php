<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\usersController;
use App\Http\Controllers\FileUploadController;
use App\Http\Controllers\PostsController;

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

Route::post("/modify",[usersController::class,"modifyUser"]);
Route::post("/signup",[usersController::class,"signup"]);
Route::post("/login",[usersController::class,"login"]);
Route::post('/UpdateProfile', [ProfileController::class, 'updateProfile']);
Route::post("/upload",[FileUploadController::class,"upload"]);
Route::get("/getUsers",[usersController::class,"getUsers"]);
Route::get("/getuserById/{id}", [usersController::class, "getuserById"]);
Route::post('/post', [PostsController::class, 'post']);
Route::get('/get-posts', [PostsController::class, 'getposts']);

Route::post("/likeUpdate/{id}", [PostsController::class, "likeUpdate"]);
Route::get("/likeCount/{id}", [PostsController::class, "likeCount"]);

Route::post("/post-comment/{id}", [PostsController::class, "comments"]);
Route::get("/get-comments/{post_id}", [PostsController::class, "getPostComments"]);

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
