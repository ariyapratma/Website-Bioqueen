<?php

use Inertia\Inertia;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CartController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\AboutUsController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\HeroFlyerController;
use App\Http\Controllers\HeroVideoController;
use App\Http\Controllers\HeaderHomeController;
use App\Http\Controllers\HeroReviewController;
use App\Http\Controllers\HeaderOrderController;
use App\Http\Controllers\HeroAboutUsController;
use App\Http\Controllers\HeroCompanyController;
use App\Http\Controllers\HeroServiceController;
use App\Http\Controllers\ProductListController;
use App\Http\Controllers\HeaderMaklonController;
use App\Http\Controllers\HeaderAboutUsController;
use App\Http\Controllers\HeaderContactController;
use App\Http\Controllers\HeaderProductController;
use App\Http\Controllers\HeroTeamValueController;
use App\Http\Controllers\HeroWhyChooseController;
use App\Http\Controllers\HeroCategoriesController;
use App\Http\Controllers\HeroOurGalleryController;
use App\Http\Controllers\HeroCertificateController;
use App\Http\Controllers\HeroMaklonValueController;
use App\Http\Controllers\HeroVisionMisionController;
use App\Http\Controllers\HeroExcellenceValueController;
use App\Http\Controllers\HeroFacilitiesValueController;
use App\Http\Controllers\PaymentController;

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
// Route::get('/contact', [ContactController::class, 'index'])->name('contact');
Route::get('/product', [ProductController::class, 'index'])->name('product');
// Route::get('/maklon', [MaklonController::class, 'index'])->name('maklon');

// Route ProductCategory User
Route::get('/product/{slug}', [ProductController::class, 'showCategory'])->name('products.category');
// Route ProductDetail User
Route::get('/product/{category}/{product}', [ProductController::class, 'showProduct'])->name('product.detail');

// Cart Page : 
Route::middleware(['auth', 'verified', 'role:admin|user'])->group(function () {
    Route::get('/cart', [CartController::class, 'index'])->name('cart.index');
    Route::get('/cart/items', [CartController::class, 'getCartItems'])->name('cart.items');
    Route::post('/cart/add', [CartController::class, 'store'])->name('cart.add');
    Route::put('/cart/update/{id}', [CartController::class, 'update'])->name('cart.update');
    Route::delete('/cart/remove/{id}', [CartController::class, 'removeFromCart'])->name('cart.remove');
});

// Order Page : 
Route::middleware(['auth', 'verified', 'role:admin|user'])->group(function () {
    Route::get('/order', [OrderController::class, 'index'])->name('order.index');
    Route::post('/order', [OrderController::class, 'store'])->name('order.store');
    Route::post('/order-informations', [OrderController::class, 'storeInformations'])->name('order.storeInformations');

    Route::get('/my-order', [OrderController::class, 'myOrder'])->name('order.myorder');
    Route::patch('/my-order/cancel', [OrderController::class, 'cancel'])->name('order.cancel');
});


// Route khusus untuk pengguna yang terautentikasi (auth) dan terverifikasi
Route::middleware(['auth', 'verified'])->group(function () {

    // Hanya Admin yang bisa mengakses dashboard dan mengelola konten
    Route::get('/dashboard', function () {
        return Inertia::render('Dashboard');
    })->middleware('role:admin|user')->name('dashboard');

    Route::middleware(['auth', 'role:user|admin'])->group(function () {
        Route::post('/hero-review', [HeroReviewController::class, 'store'])->name('hero-review.store');
    });

    // Rute untuk mengelola review, hanya admin yang bisa mengakses
    Route::middleware(['auth', 'role:admin'])->group(function () {
        // Route HeroReview Admin 
        Route::get('/hero-review', [HeroReviewController::class, 'index'])->name('hero-review.index');
        Route::get('/hero-review/{heroReview}/edit', [HeroReviewController::class, 'edit'])->name('hero-review.edit');
        Route::put('/hero-review/{heroReview}', [HeroReviewController::class, 'update'])->name('hero-review.update');
        Route::delete('/hero-review/{id}', [HeroReviewController::class, 'destroy'])->name('hero-review.destroy');
    });

    // Rute untuk mengelola isi konten web, hanya admin yang bisa mengakses
    Route::middleware(['auth', 'role:admin'])->group(function () {

        // Home Page :
        Route::get('/search', [HomeController::class, 'search'])->name('home.search');

        // Route HeaderHome
        Route::get('/header-home', [HeaderHomeController::class, 'index'])->name('header-home.index');
        Route::get('/header-home/create', [HeaderHomeController::class, 'create'])->name('header-home.create');
        Route::post('/header-home', [HeaderHomeController::class, 'store'])->name('header-home.store');
        Route::get('/header-home/{headerHome}/edit', [HeaderHomeController::class, 'edit'])->name('header-home.edit');
        Route::put('/header-home/{headerHome}', [HeaderHomeController::class, 'update'])->name('header-home.update');
        Route::delete('/header-home/{id}', [HeaderHomeController::class, 'destroy'])->name('header-home.destroy');

        // Route HeroFlyer
        Route::get('/hero-flyer', [HeroFlyerController::class, 'index'])->name('hero-flyer.index');
        Route::get('/hero-flyer/create', [HeroFlyerController::class, 'create'])->name('hero-flyer.create');
        Route::post('/hero-flyer', [HeroFlyerController::class, 'store'])->name('hero-flyer.store');
        Route::get('/hero-flyer/{heroFlyer}/edit', [HeroFlyerController::class, 'edit'])->name('hero-flyer.edit');
        Route::put('/hero-flyer/{heroFlyer}', [HeroFlyerController::class, 'update'])->name('hero-flyer.update');
        Route::delete('/hero-flyer/{id}', [HeroFlyerController::class, 'destroy'])->name('hero-flyer.destroy');

        // Route HeroCompany
        Route::get('/hero-company', [HeroCompanyController::class, 'index'])->name('hero-company.index');
        Route::get('/hero-company/create', [HeroCompanyController::class, 'create'])->name('hero-company.create');
        Route::post('/hero-company', [HeroCompanyController::class, 'store'])->name('hero-company.store');
        Route::get('/hero-company/{heroCompany}/edit', [HeroCompanyController::class, 'edit'])->name('hero-company.edit');
        Route::put('/hero-company/{heroCompany}', [HeroCompanyController::class, 'update'])->name('hero-company.update');
        Route::delete('/hero-company/{id}', [HeroCompanyController::class, 'destroy'])->name('hero-company.destroy');

        // Route HeroWhyChoose
        Route::get('/hero-why-choose', [HeroWhyChooseController::class, 'index'])->name('hero-why-choose.index');
        Route::get('/hero-why-choose/create', [HeroWhyChooseController::class, 'create'])->name('hero-why-choose.create');
        Route::post('/hero-why-choose', [HeroWhyChooseController::class, 'store'])->name('hero-why-choose.store');
        Route::get('/hero-why-choose/{heroWhyChoose}/edit', [HeroWhyChooseController::class, 'edit'])->name('hero-why-choose.edit');
        Route::put('/hero-why-choose/{heroWhyChoose}', [HeroWhyChooseController::class, 'update'])->name('hero-why-choose.update');
        Route::delete('/hero-why-choose/{id}', [HeroWhyChooseController::class, 'destroy'])->name('hero-why-choose.destroy');

        // Route HeroMaklonValue
        Route::get('/hero-maklon-value', [HeroMaklonValueController::class, 'index'])->name('hero-maklon-value.index');
        Route::get('/hero-maklon-value/create', [HeroMaklonValueController::class, 'create'])->name('hero-maklon-value.create');
        Route::post('/hero-maklon-value', [HeroMaklonValueController::class, 'store'])->name('hero-maklon-value.store');
        Route::get('/hero-maklon-value/{heroMaklonValue}/edit', [HeroMaklonValueController::class, 'edit'])->name('hero-maklon-value.edit');
        Route::put('/hero-maklon-value/{heroMaklonValue}', [HeroMaklonValueController::class, 'update'])->name('hero-maklon-value.update');
        Route::delete('/hero-maklon-value/{id}', [HeroMaklonValueController::class, 'destroy'])->name('hero-maklon-value.destroy');

        // Route HeroTeamValue
        Route::get('/hero-team-value', [HeroTeamValueController::class, 'index'])->name('hero-team-value.index');
        Route::get('/hero-team-value/create', [HeroTeamValueController::class, 'create'])->name('hero-team-value.create');
        Route::post('/hero-team-value', [HeroTeamValueController::class, 'store'])->name('hero-team-value.store');
        Route::get('/hero-team-value/{heroTeamValue}/edit', [HeroTeamValueController::class, 'edit'])->name('hero-team-value.edit');
        Route::put('/hero-team-value/{heroTeamValue}', [HeroTeamValueController::class, 'update'])->name('hero-team-value.update');
        Route::delete('/hero-team-value/{id}', [HeroTeamValueController::class, 'destroy'])->name('hero-team-value.destroy');

        // Route HeroFacilitiesValue
        Route::get('/hero-facilities-value', [HeroFacilitiesValueController::class, 'index'])->name('hero-facilities-value.index');
        Route::get('/hero-facilities-value/create', [HeroFacilitiesValueController::class, 'create'])->name('hero-facilities-value.create');
        Route::post('/hero-facilities-value', [HeroFacilitiesValueController::class, 'store'])->name('hero-facilities-value.store');
        Route::get('/hero-facilities-value/{heroFacilitiesValue}/edit', [HeroFacilitiesValueController::class, 'edit'])->name('hero-facilities-value.edit');
        Route::put('/hero-facilities-value/{heroFacilitiesValue}', [HeroFacilitiesValueController::class, 'update'])->name('hero-facilities-value.update');
        Route::delete('/hero-facilities-value/{id}', [HeroFacilitiesValueController::class, 'destroy'])->name('hero-facilities-value.destroy');

        // Route HeroCertificate
        Route::get('/hero-certificate', [HeroCertificateController::class, 'index'])->name('hero-certificate.index');
        Route::get('/hero-certificate/create', [HeroCertificateController::class, 'create'])->name('hero-certificate.create');
        Route::post('/hero-certificate', [HeroCertificateController::class, 'store'])->name('hero-certificate.store');
        Route::get('/hero-certificate/{heroCertificate}/edit', [HeroCertificateController::class, 'edit'])->name('hero-certificate.edit');
        Route::put('/hero-certificate/{heroCertificate}', [HeroCertificateController::class, 'update'])->name('hero-certificate.update');
        Route::delete('/hero-certificate/{id}', [HeroCertificateController::class, 'destroy'])->name('hero-certificate.destroy');

        // Route HeroService
        Route::get('/hero-service', [HeroServiceController::class, 'index'])->name('hero-service.index');
        Route::get('/hero-service/create', [HeroServiceController::class, 'create'])->name('hero-service.create');
        Route::post('/hero-service', [HeroServiceController::class, 'store'])->name('hero-service.store');
        Route::get('/hero-service/{heroService}/edit', [HeroServiceController::class, 'edit'])->name('hero-service.edit');
        Route::put('/hero-service/{heroService}', [HeroServiceController::class, 'update'])->name('hero-service.update');
        Route::delete('/hero-service/{id}', [HeroServiceController::class, 'destroy'])->name('hero-service.destroy');

        // Route HeroVideo
        Route::get('/hero-video', [HeroVideoController::class, 'index'])->name('hero-video.index');
        Route::get('/hero-video/create', [HeroVideoController::class, 'create'])->name('hero-video.create');
        Route::post('/hero-video', [HeroVideoController::class, 'store'])->name('hero-video.store');
        Route::get('/hero-video/{heroVideo}/edit', [HeroVideoController::class, 'edit'])->name('hero-video.edit');
        Route::put('/hero-video/{heroVideo}', [HeroVideoController::class, 'update'])->name('hero-video.update');
        Route::delete('/hero-video/{id}', [HeroVideoController::class, 'destroy'])->name('hero-video.destroy');

        // Route HeroExcellenceValue
        Route::get('/hero-excellence-value', [HeroExcellenceValueController::class, 'index'])->name('hero-excellence-value.index');
        Route::get('/hero-excellence-value/create', [HeroExcellenceValueController::class, 'create'])->name('hero-excellence-value.create');
        Route::post('/hero-excellence-value', [HeroExcellenceValueController::class, 'store'])->name('hero-excellence-value.store');
        Route::get('/hero-excellence-value/{heroExcellenceValue}/edit', [HeroExcellenceValueController::class, 'edit'])->name('hero-excellence-value.edit');
        Route::put('/hero-excellence-value/{heroExcellenceValue}', [HeroExcellenceValueController::class, 'update'])->name('hero-excellence-value.update');
        Route::delete('/hero-excellence-value/{id}', [HeroExcellenceValueController::class, 'destroy'])->name('hero-excellence-value.destroy');

        // AboutUs Page :

        // Route HeaderAboutUs
        Route::get('/header-about-us', [HeaderAboutUsController::class, 'index'])->name('header-about-us.index');
        Route::get('/header-about-us/create', [HeaderAboutUsController::class, 'create'])->name('header-about-us.create');
        Route::post('/header-about-us', [HeaderAboutUsController::class, 'store'])->name('header-about-us.store');
        Route::get('/header-about-us/{headerAboutUs}/edit', [HeaderAboutUsController::class, 'edit'])->name('header-about-us.edit');
        Route::put('/header-about-us/{headerAboutUs}', [HeaderAboutUsController::class, 'update'])->name('header-about-us.update');
        Route::delete('/header-about-us/{id}', [HeaderAboutUsController::class, 'destroy'])->name('header-about-us.destroy');

        // Route HeroAboutUs
        Route::get('/hero-about-us', [HeroAboutUsController::class, 'index'])->name('hero-about-us.index');
        Route::get('/hero-about-us/create', [HeroAboutUsController::class, 'create'])->name('hero-about-us.create');
        Route::post('/hero-about-us', [HeroAboutUsController::class, 'store'])->name('hero-about-us.store');
        Route::get('/hero-about-us/{heroAboutUs}/edit', [HeroAboutUsController::class, 'edit'])->name('hero-about-us.edit');
        Route::put('/hero-about-us/{heroAboutUs}', [HeroAboutUsController::class, 'update'])->name('hero-about-us.update');
        Route::delete('/hero-about-us/{id}', [HeroAboutUsController::class, 'destroy'])->name('hero-about-us.destroy');

        // Route HeroVisionMision
        Route::get('/hero-vision-mision', [HeroVisionMisionController::class, 'index'])->name('hero-vision-mision.index');
        Route::get('/hero-vision-mision/create', [HeroVisionMisionController::class, 'create'])->name('hero-vision-mision.create');
        Route::post('/hero-vision-mision', [HeroVisionMisionController::class, 'store'])->name('hero-vision-mision.store');
        Route::get('/hero-vision-mision/{heroVisionMision}/edit', [HeroVisionMisionController::class, 'edit'])->name('hero-vision-mision.edit');
        Route::put('/hero-vision-mision/{heroVisionMision}', [HeroVisionMisionController::class, 'update'])->name('hero-vision-mision.update');
        Route::delete('/hero-vision-mision/{id}', [HeroVisionMisionController::class, 'destroy'])->name('hero-vision-mision.destroy');

        // Route HeroOurGallery
        Route::get('/hero-our-gallery', [HeroOurGalleryController::class, 'index'])->name('hero-our-gallery.index');
        Route::get('/hero-our-gallery/create', [HeroOurGalleryController::class, 'create'])->name('hero-our-gallery.create');
        Route::post('/hero-our-gallery', [HeroOurGalleryController::class, 'store'])->name('hero-our-gallery.store');
        Route::get('/hero-our-gallery/{heroOurGallery}/edit', [HeroOurGalleryController::class, 'edit'])->name('hero-our-gallery.edit');
        Route::put('/hero-our-gallery/{heroOurGallery}', [HeroOurGalleryController::class, 'update'])->name('hero-our-gallery.update');
        Route::delete('/hero-our-gallery/{id}', [HeroOurGalleryController::class, 'destroy'])->name('hero-our-gallery.destroy');

        // Contact Page :

        // Route HeaderContact
        Route::get('/header-contact', [HeaderContactController::class, 'index'])->name('header-contact.index');
        Route::get('/header-contact/create', [HeaderContactController::class, 'create'])->name('header-contact.create');
        Route::post('/header-contact', [HeaderContactController::class, 'store'])->name('header-contact.store');
        Route::get('/header-contact/{headerContact}/edit', [HeaderContactController::class, 'edit'])->name('header-contact.edit');
        Route::put('/header-contact/{headerContact}', [HeaderContactController::class, 'update'])->name('header-contact.update');
        Route::delete('/header-contact/{id}', [HeaderContactController::class, 'destroy'])->name('header-contact.destroy');

        // Maklon Page :

        // Route HeaderMaklon
        Route::get('/header-maklon', [HeaderMaklonController::class, 'index'])->name('header-maklon.index');
        Route::get('/header-maklon/create', [HeaderMaklonController::class, 'create'])->name('header-maklon.create');
        Route::post('/header-maklon', [HeaderMaklonController::class, 'store'])->name('header-maklon.store');
        Route::get('/header-maklon/{headerMaklon}/edit', [HeaderMaklonController::class, 'edit'])->name('header-maklon.edit');
        Route::put('/header-maklon/{headerMaklon}', [HeaderMaklonController::class, 'update'])->name('header-maklon.update');
        Route::delete('/header-maklon/{id}', [HeaderMaklonController::class, 'destroy'])->name('header-maklon.destroy');

        // Product Page :

        // Route HeaderProduct
        Route::get('/header-product', [HeaderProductController::class, 'index'])->name('header-product.index');
        Route::get('/header-product/create', [HeaderProductController::class, 'create'])->name('header-product.create');
        Route::post('/header-product', [HeaderProductController::class, 'store'])->name('header-product.store');
        Route::get('/header-product/{headerProduct}/edit', [HeaderProductController::class, 'edit'])->name('header-product.edit');
        Route::put('/header-product/{headerProduct}', [HeaderProductController::class, 'update'])->name('header-product.update');
        Route::delete('/header-product/{id}', [HeaderProductController::class, 'destroy'])->name('header-product.destroy');

        // Route HeroCategories
        Route::get('/hero-categories', [HeroCategoriesController::class, 'index'])->name('hero-categories.index');
        Route::get('/hero-categories/create', [HeroCategoriesController::class, 'create'])->name('hero-categories.create');
        Route::post('/hero-categories', [HeroCategoriesController::class, 'store'])->name('hero-categories.store');
        Route::get('/hero-categories/{id}/edit', [HeroCategoriesController::class, 'edit'])->name('hero-categories.edit');
        Route::put('/hero-categories/{id}', [HeroCategoriesController::class, 'update'])->name('hero-categories.update');
        Route::delete('/hero-categories/{id}', [HeroCategoriesController::class, 'destroy'])->name('hero-categories.destroy');

        // Route ProductList
        Route::get('/product-list', [ProductListController::class, 'index'])->name('product-list.index');
        Route::get('/product-list/create', [ProductListController::class, 'create'])->name('product-list.create');
        Route::post('/product-list', [ProductListController::class, 'store'])->name('product-list.store');
        Route::get('/product-list/{products}/edit', [ProductListController::class, 'edit'])->name('product-list.edit');
        Route::put('/product-list/{product}', [ProductListController::class, 'update'])->name('product-list.update');
        Route::delete('/product-list/{id}', [ProductListController::class, 'destroy'])->name('product-list.destroy');

        // Order Page :

        // Route HeaderOrder
        Route::get('/header-order', [HeaderOrderController::class, 'index'])->name('header-order.index');
        Route::get('/header-order/create', [HeaderOrderController::class, 'create'])->name('header-order.create');
        Route::post('/header-order', [HeaderOrderController::class, 'store'])->name('header-order.store');
        Route::get('/header-order/{headerOrder}/edit', [HeaderOrderController::class, 'edit'])->name('header-order.edit');
        Route::put('/header-order/{headerOrder}', [HeaderOrderController::class, 'update'])->name('header-order.update');
        Route::delete('/header-order/{id}', [HeaderOrderController::class, 'destroy'])->name('header-order.destroy');

        // Route Manage Orders Page
        Route::get('/manage-order-products', [OrderController::class, 'manageOrders'])
            ->name('admin.manage.orders');
    });

    // Route Payment
    Route::middleware(['auth', 'verified', 'role:user'])->group(function () {
        Route::get('/payment/{orderId}', [PaymentController::class, 'index'])->name('payment.index');
        Route::post('/payment/{orderId}', [PaymentController::class, 'store'])->name('payment.store');
    });

    // Profil pengguna, hanya untuk pengguna yang sudah login
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

// Route untuk autentikasi (Login, Register)
require __DIR__ . '/auth.php';
