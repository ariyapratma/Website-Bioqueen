<?php

use Inertia\Inertia;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\HeroFlyerController;
use App\Http\Controllers\HeaderHomeController;
use App\Http\Controllers\HeroCompanyController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

// Route yang bisa diakses oleh semua pengguna (Guest, User, Admin)
Route::get('/', [HomeController::class, 'index'])->name('index');
Route::get('/about', function () {
    return Inertia::render('About');
})->name('about');
Route::get('/contact', function () {
    return Inertia::render('Contact');
})->name('contact');
Route::get('/product', function () {
    return Inertia::render('Product');
})->name('product');
Route::get('/maklon', function () {
    return Inertia::render('Maklon');
})->name('maklon');

// Route khusus untuk pengguna yang terautentikasi (auth) dan terverifikasi
Route::middleware(['auth', 'verified'])->group(function () {
    // Hanya Admin dan User yang bisa melakukan Order
    Route::get('/order', function () {
        return Inertia::render('Order');
    })->middleware('permission:order product')->name('order');

    // Hanya Admin yang bisa mengakses dashboard dan mengelola konten
    Route::get('/dashboard', function () {
        return Inertia::render('Dashboard');
    })->middleware('role:admin')->name('dashboard');

    Route::middleware(['auth', 'role:admin'])->group(function () {
        // Route HeaderHome
        Route::get('/header-home', [HeaderHomeController::class, 'index'])->name('header-home.index');
        Route::get('/header-home/create', [HeaderHomeController::class, 'create'])->name('header-home.create');
        Route::post('/header-home', [HeaderHomeController::class, 'store'])->name('header-home.store');
        Route::get('/header-home/{headerHome}/edit', [HeaderHomeController::class, 'edit'])->name('header-home.edit');
        Route::put('/header-home/{headerHome}', [HeaderHomeController::class, 'update'])->name('header-home.update');
        Route::delete('/header-home/{headerHome}', [HeaderHomeController::class, 'destroy'])->name('header-home.destroy');

        // Route HeroFlyer
        Route::get('/hero-flyer', [HeroFlyerController::class, 'index'])->name('hero-flyer.index');
        Route::get('/hero-flyer/create', [HeroFlyerController::class, 'create'])->name('hero-flyer.create');
        Route::post('/hero-flyer', [HeroFlyerController::class, 'store'])->name('hero-flyer.store');
        Route::get('/hero-flyer/{heroFlyer}/edit', [HeroFlyerController::class, 'edit'])->name('hero-flyer.edit');
        Route::put('/hero-flyer/{heroFlyer}', [HeroFlyerController::class, 'update'])->name('hero-flyer.update');
        Route::delete('/hero-flyer/{heroFlyer}', [HeroFlyerController::class, 'destroy'])->name('hero-flyer.destroy');

         // Route HeroCompany
         Route::get('/hero-company', [HeroCompanyController::class, 'index'])->name('hero-company.index');
         Route::get('/hero-company/create', [HeroCompanyController::class, 'create'])->name('hero-company.create');
         Route::post('/hero-company', [HeroCompanyController::class, 'store'])->name('hero-company.store');
         Route::get('/hero-company/{heroCompany}/edit', [HeroCompanyController::class, 'edit'])->name('hero-company.edit');
         Route::put('/hero-company/{heroCompany}', [HeroCompanyController::class, 'update'])->name('hero-company.update');
         Route::delete('/hero-company/{heroCompany}', [HeroCompanyController::class, 'destroy'])->name('hero-company.destroy');
    });

    // Profil pengguna, hanya untuk pengguna yang sudah login
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

// Route untuk autentikasi (Login, Register)
require __DIR__ . '/auth.php';
