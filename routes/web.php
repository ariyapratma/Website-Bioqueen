<?php

use Inertia\Inertia;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\HeroFlyerController;
use App\Http\Controllers\HeaderHomeController;
use App\Http\Controllers\HeroCertificateController;
use App\Http\Controllers\HeroCompanyController;
use App\Http\Controllers\HeroFacilitiesValueController;
use App\Http\Controllers\HeroMaklonValueController;
use App\Http\Controllers\HeroTeamValueController;
use App\Http\Controllers\HeroWhyChooseController;

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
        Route::get('/header-home/{id}/edit', [HeaderHomeController::class, 'edit'])->name('header-home.edit');
        Route::put('/header-home/{id}', [HeaderHomeController::class, 'update'])->name('header-home.update');
        Route::delete('/header-home/{id}', [HeaderHomeController::class, 'destroy'])->name('header-home.destroy');

        // Route HeroFlyer
        Route::get('/hero-flyer', [HeroFlyerController::class, 'index'])->name('hero-flyer.index');
        Route::get('/hero-flyer/create', [HeroFlyerController::class, 'create'])->name('hero-flyer.create');
        Route::post('/hero-flyer', [HeroFlyerController::class, 'store'])->name('hero-flyer.store');
        Route::get('/hero-flyer/{id}/edit', [HeroFlyerController::class, 'edit'])->name('hero-flyer.edit');
        Route::put('/hero-flyer/{id}', [HeroFlyerController::class, 'update'])->name('hero-flyer.update');
        Route::delete('/hero-flyer/{id}', [HeroFlyerController::class, 'destroy'])->name('hero-flyer.destroy');

        // Route HeroCompany
        Route::get('/hero-company', [HeroCompanyController::class, 'index'])->name('hero-company.index');
        Route::get('/hero-company/create', [HeroCompanyController::class, 'create'])->name('hero-company.create');
        Route::post('/hero-company', [HeroCompanyController::class, 'store'])->name('hero-company.store');
        Route::get('/hero-company/{id}/edit', [HeroCompanyController::class, 'edit'])->name('hero-company.edit');
        Route::put('/hero-company/{id}', [HeroCompanyController::class, 'update'])->name('hero-company.update');
        Route::delete('/hero-company/{id}', [HeroCompanyController::class, 'destroy'])->name('hero-company.destroy');

        // Route HeroWhyChoose
        Route::get('/hero-why-choose', [HeroWhyChooseController::class, 'index'])->name('hero-why-choose.index');
        Route::get('/hero-why-choose/create', [HeroWhyChooseController::class, 'create'])->name('hero-why-choose.create');
        Route::post('/hero-why-choose', [HeroWhyChooseController::class, 'store'])->name('hero-why-choose.store');
        Route::get('/hero-why-choose/{id}/edit', [HeroWhyChooseController::class, 'edit'])->name('hero-why-choose.edit');
        Route::put('/hero-why-choose/{id}', [HeroWhyChooseController::class, 'update'])->name('hero-why-choose.update');
        Route::delete('/hero-why-choose/{id}', [HeroWhyChooseController::class, 'destroy'])->name('hero-why-choose.destroy');

        // Route HeroMaklonValue
        Route::get('/hero-maklon-value', [HeroMaklonValueController::class, 'index'])->name('hero-maklon-value.index');
        Route::get('/hero-maklon-value/create', [HeroMaklonValueController::class, 'create'])->name('hero-maklon-value.create');
        Route::post('/hero-maklon-value', [HeroMaklonValueController::class, 'store'])->name('hero-maklon-value.store');
        Route::get('/hero-maklon-value/{id}/edit', [HeroMaklonValueController::class, 'edit'])->name('hero-maklon-value.edit');
        Route::put('/hero-maklon-value/{id}', [HeroMaklonValueController::class, 'update'])->name('hero-maklon-value.update');
        Route::delete('/hero-maklon-value/{id}', [HeroMaklonValueController::class, 'destroy'])->name('hero-maklon-value.destroy');

        // Route HeroTeamValue
        Route::get('/hero-team-value', [HeroTeamValueController::class, 'index'])->name('hero-team-value.index');
        Route::get('/hero-team-value/create', [HeroTeamValueController::class, 'create'])->name('hero-team-value.create');
        Route::post('/hero-team-value', [HeroTeamValueController::class, 'store'])->name('hero-team-value.store');
        Route::get('/hero-team-value/{id}/edit', [HeroTeamValueController::class, 'edit'])->name('hero-team-value.edit');
        Route::put('/hero-team-value/{id}', [HeroTeamValueController::class, 'update'])->name('hero-team-value.update');
        Route::delete('/hero-team-value/{id}', [HeroTeamValueController::class, 'destroy'])->name('hero-team-value.destroy');

        // Route HeroFacilitiesValue
        Route::get('/hero-facilities-value', [HeroFacilitiesValueController::class, 'index'])->name('hero-facilities-value.index');
        Route::get('/hero-facilities-value/create', [HeroFacilitiesValueController::class, 'create'])->name('hero-facilities-value.create');
        Route::post('/hero-facilities-value', [HeroFacilitiesValueController::class, 'store'])->name('hero-facilities-value.store');
        Route::get('/hero-facilities-value/{id}/edit', [HeroFacilitiesValueController::class, 'edit'])->name('hero-facilities-value.edit');
        Route::put('/hero-facilities-value/{id}', [HeroFacilitiesValueController::class, 'update'])->name('hero-facilities-value.update');
        Route::delete('/hero-facilities-value/{id}', [HeroFacilitiesValueController::class, 'destroy'])->name('hero-facilities-value.destroy');

        // Route HeroCertificate
        Route::get('/hero-certificate', [HeroCertificateController::class, 'index'])->name('hero-certificate.index');
        Route::get('/hero-certificate/create', [HeroCertificateController::class, 'create'])->name('hero-certificate.create');
        Route::post('/hero-certificate', [HeroCertificateController::class, 'store'])->name('hero-certificate.store');
        Route::get('/hero-certificate/{id}/edit', [HeroCertificateController::class, 'edit'])->name('hero-certificate.edit');
        Route::put('/hero-certificate/{id}', [HeroCertificateController::class, 'update'])->name('hero-certificate.update');
        Route::delete('/hero-certificate/{id}', [HeroCertificateController::class, 'destroy'])->name('hero-certificate.destroy');
    });

    // Profil pengguna, hanya untuk pengguna yang sudah login
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

// Route untuk autentikasi (Login, Register)
require __DIR__ . '/auth.php';
