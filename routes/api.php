<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\DashboardController;

Route::middleware('auth')->get('/user', function (Request $request) {
    return response()->json($request->user());
});

Route::get('/top-products', [DashboardController::class, 'topProducts']);
