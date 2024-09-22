<?php

use Inertia\Inertia;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\MaklonController;
use App\Http\Controllers\AboutUsController;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\HeaderAboutUsController;
use App\Http\Controllers\HeaderContactController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\HeroFlyerController;
use App\Http\Controllers\HeroVideoController;
use App\Http\Controllers\HeaderHomeController;
use App\Http\Controllers\HeaderMaklonController;
use App\Http\Controllers\HeaderOrderController;
use App\Http\Controllers\HeaderProductController;
use App\Http\Controllers\HeroAddReviewController;
use App\Http\Controllers\HeroCompanyController;
use App\Http\Controllers\HeroServiceController;
use App\Http\Controllers\HeroTeamValueController;
use App\Http\Controllers\HeroWhyChooseController;
use App\Http\Controllers\HeroCertificateController;
use App\Http\Controllers\HeroMaklonValueController;
use App\Http\Controllers\HeroExcellenceValueController;
use App\Http\Controllers\HeroFacilitiesValueController;
use App\Http\Controllers\HeroReviewController;
use App\Http\Controllers\OrderController;

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
Route::get('/about', [AboutUsController::class, 'index'])->name('about');
Route::get('/contact1', [ContactController::class, 'index'])->name('contact1');
Route::get('/product', [ProductController::class, 'index'])->name('product');
Route::get('/order', [OrderController::class, 'index'])->name('order');
Route::get('/maklon1', [MaklonController::class, 'index'])->name('maklon1');

// Route khusus untuk pengguna yang terautentikasi (auth) dan terverifikasi
Route::middleware(['auth', 'verified'])->group(function () {
    // Hanya Admin dan User yang bisa melakukan Order
    // Route::get('/order', function () {
    //     return Inertia::render('Order');
    // })->middleware('permission:order product')->name('order');

    // Hanya Admin yang bisa mengakses dashboard dan mengelola konten
    Route::get('/dashboard', function () {
        return Inertia::render('Dashboard');
    })->middleware('role:admin|user')->name('dashboard');

    // Rute untuk menambahkan review, hanya user yang bisa mengakses
    Route::middleware(['auth', 'role:user'])->group(function () {

         // Home Page :

         // Route HeroReview
        Route::get('/hero-review', [HeroReviewController::class, 'index'])->name('hero-review.index');
        Route::post('/hero-review', [HeroReviewController::class, 'store'])->name('hero-review.store');
        // Route::get('/hero-review/{id}/edit', [HeroReviewController::class, 'edit'])->name('hero-review.edit');
        // Route::put('/hero-review/{id}', [HeroReviewController::class, 'update'])->name('hero-review.update');
        // Route::delete('/hero-review/{id}', [HeroReviewController::class, 'destroy'])->name('hero-review.destroy');
    });

    // Rute untuk mengelola isi konten web, hanya admin yang bisa mengakses
    Route::middleware(['auth', 'role:admin'])->group(function () {

        // Home Page :

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

        // Route HeroService
        Route::get('/hero-service', [HeroServiceController::class, 'index'])->name('hero-service.index');
        Route::get('/hero-service/create', [HeroServiceController::class, 'create'])->name('hero-service.create');
        Route::post('/hero-service', [HeroServiceController::class, 'store'])->name('hero-service.store');
        Route::get('/hero-service/{id}/edit', [HeroServiceController::class, 'edit'])->name('hero-service.edit');
        Route::put('/hero-service/{id}', [HeroServiceController::class, 'update'])->name('hero-service.update');
        Route::delete('/hero-service/{id}', [HeroServiceController::class, 'destroy'])->name('hero-service.destroy');

        // Route HeroVideo
        Route::get('/hero-video', [HeroVideoController::class, 'index'])->name('hero-video.index');
        Route::get('/hero-video/create', [HeroVideoController::class, 'create'])->name('hero-video.create');
        Route::post('/hero-video', [HeroVideoController::class, 'store'])->name('hero-video.store');
        Route::get('/hero-video/{id}/edit', [HeroVideoController::class, 'edit'])->name('hero-video.edit');
        Route::put('/hero-video/{id}', [HeroVideoController::class, 'update'])->name('hero-video.update');
        Route::delete('/hero-video/{id}', [HeroVideoController::class, 'destroy'])->name('hero-video.destroy');

        // Route HeroExcellenceValue
        Route::get('/hero-excellence-value', [HeroExcellenceValueController::class, 'index'])->name('hero-excellence-value.index');
        Route::get('/hero-excellence-value/create', [HeroExcellenceValueController::class, 'create'])->name('hero-excellence-value.create');
        Route::post('/hero-excellence-value', [HeroExcellenceValueController::class, 'store'])->name('hero-excellence-value.store');
        Route::get('/hero-excellence-value/{id}/edit', [HeroExcellenceValueController::class, 'edit'])->name('hero-excellence-value.edit');
        Route::put('/hero-excellence-value/{id}', [HeroExcellenceValueController::class, 'update'])->name('hero-excellence-value.update');
        Route::delete('/hero-excellence-value/{id}', [HeroExcellenceValueController::class, 'destroy'])->name('hero-excellence-value.destroy');

        // AboutUs Page :

        // Route HeaderAboutUs
        Route::get('/header-about-us', [HeaderAboutUsController::class, 'index'])->name('header-about-us.index');
        Route::get('/header-about-us/create', [HeaderAboutUsController::class, 'create'])->name('header-about-us.create');
        Route::post('/header-about-us', [HeaderAboutUsController::class, 'store'])->name('header-about-us.store');
        Route::get('/header-about-us/{id}/edit', [HeaderAboutUsController::class, 'edit'])->name('header-about-us.edit');
        Route::put('/header-about-us/{id}', [HeaderAboutUsController::class, 'update'])->name('header-about-us.update');
        Route::delete('/header-about-us/{id}', [HeaderAboutUsController::class, 'destroy'])->name('header-about-us.destroy');

        // Contact Page :

        // Route HeaderContact
        Route::get('/header-contact', [HeaderContactController::class, 'index'])->name('header-contact.index');
        Route::get('/header-contact/create', [HeaderContactController::class, 'create'])->name('header-contact.create');
        Route::post('/header-contact', [HeaderContactController::class, 'store'])->name('header-contact.store');
        Route::get('/header-contact/{id}/edit', [HeaderContactController::class, 'edit'])->name('header-contact.edit');
        Route::put('/header-contact/{id}', [HeaderContactController::class, 'update'])->name('header-contact.update');
        Route::delete('/header-contact/{id}', [HeaderContactController::class, 'destroy'])->name('header-contact.destroy');

        // Product Page :

        // Route HeaderProduct
        Route::get('/header-product', [HeaderProductController::class, 'index'])->name('header-product.index');
        Route::get('/header-product/create', [HeaderProductController::class, 'create'])->name('header-product.create');
        Route::post('/header-product', [HeaderProductController::class, 'store'])->name('header-product.store');
        Route::get('/header-product/{id}/edit', [HeaderProductController::class, 'edit'])->name('header-product.edit');
        Route::put('/header-product/{id}', [HeaderProductController::class, 'update'])->name('header-product.update');
        Route::delete('/header-product/{id}', [HeaderProductController::class, 'destroy'])->name('header-product.destroy');

        // Order Page :

        // Route HeaderOrder
        Route::get('/header-order', [HeaderOrderController::class, 'index'])->name('header-order.index');
        Route::get('/header-order/create', [HeaderOrderController::class, 'create'])->name('header-order.create');
        Route::post('/header-order', [HeaderOrderController::class, 'store'])->name('header-order.store');
        Route::get('/header-order/{id}/edit', [HeaderOrderController::class, 'edit'])->name('header-order.edit');
        Route::put('/header-order/{id}', [HeaderOrderController::class, 'update'])->name('header-order.update');
        Route::delete('/header-order/{id}', [HeaderOrderController::class, 'destroy'])->name('header-order.destroy');

        // Order Page :

        // Route HeaderMaklon
        Route::get('/header-maklon', [HeaderMaklonController::class, 'index'])->name('header-maklon.index');
        Route::get('/header-maklon/create', [HeaderMaklonController::class, 'create'])->name('header-maklon.create');
        Route::post('/header-maklon', [HeaderMaklonController::class, 'store'])->name('header-maklon.store');
        Route::get('/header-maklon/{id}/edit', [HeaderMaklonController::class, 'edit'])->name('header-maklon.edit');
        Route::put('/header-maklon{id}', [HeaderMaklonController::class, 'update'])->name('header-maklon.update');
        Route::delete('/header-maklon/{id}', [HeaderMaklonController::class, 'destroy'])->name('header-maklon.destroy');
    });

    // Profil pengguna, hanya untuk pengguna yang sudah login
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

// Route untuk autentikasi (Login, Register)
require __DIR__ . '/auth.php';
