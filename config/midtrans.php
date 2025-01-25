<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Midtrans Configuration
    |--------------------------------------------------------------------------
    |
    | Konfigurasi kredensial untuk Midtrans.
    | "serverKey" dan "clientKey" harus diambil dari akun Midtrans Anda.
    | Set "isProduction" ke true ketika sudah siap menggunakan environment produksi.
    | Pastikan variabel environment sudah diatur dengan benar di .env file.
    |
    */

    'server_key' => env('MIDTRANS_SERVER_KEY', ''), // Tambahkan default kosong untuk mencegah error
    'client_key' => env('MIDTRANS_CLIENT_KEY', ''), // Tambahkan default kosong untuk mencegah error
    'is_production' => env('MIDTRANS_IS_PRODUCTION', false),
    'is_sanitized' => env('MIDTRANS_IS_SANITIZED', true),
    'is_3ds' => env('MIDTRANS_IS_3DS', true),

];
