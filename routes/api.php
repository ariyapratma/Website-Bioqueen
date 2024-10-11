<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CartController;

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


// Rute untuk mengambil informasi pengguna yang terautentikasi
Route::middleware('auth')->get('/user', function (Request $request) {
    return $request->user();
});

// Rute untuk cart
// Rute cart di web.php
Route::middleware('auth')->group(function () {
    Route::get('/cart/items', [CartController::class, 'getCartItems']);
    Route::post('/cart/add', [CartController::class, 'addToCart']);
    Route::put('/cart/update/{id}', [CartController::class, 'update']);
    Route::delete('/cart/remove/{id}', [CartController::class, 'removeFromCart']);
});
