<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CartController;
use App\Http\Controllers\RegencyController;
use App\Http\Controllers\VillageController;
use App\Http\Controllers\DistrictController;
use App\Http\Controllers\ProvinceController;

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return response()->json($request->user());
});

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/cart/items', [CartController::class, 'getCartItems']);
    Route::post('/cart/add', [CartController::class, 'addToCart']);
});

// Rute API untuk data provinsi
Route::get('/provinces', [ProvinceController::class, 'index']);
Route::get('/regencies/{provinceId}', [RegencyController::class, 'getRegenciesByProvince']);
Route::get('/districts', [DistrictController::class, 'index']);
Route::get('/villages', [VillageController::class, 'index']);
