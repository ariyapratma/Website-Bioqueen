<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Midtrans Configuration
    |--------------------------------------------------------------------------
    |
    | Here you can set the credentials for Midtrans. 
    | The "server_key" and "client_key" are obtained from your Midtrans account.
    | Set the "is_production" to true when you are ready to use the production environment.
    |
    */

    'server_key' => env('MIDTRANS_SERVER_KEY', 'SB-Mid-server-v_CWiXT88eK2aWCna2pmraKe'),
    'client_key' => env('MIDTRANS_CLIENT_KEY', 'SB-Mid-client-rt_DUdvnps2sazPn'),
    'is_production' => env('MIDTRANS_IS_PRODUCTION', false), // false = sandbox mode, true = production mode
    'payment_type' => env('MIDTRANS_PAYMENT_TYPE', 'bank_transfer'), // or 'bank_transfer', 'gopay', etc.

    /*
    |--------------------------------------------------------------------------
    | Callback URL
    |--------------------------------------------------------------------------
    |
    | This is the URL where Midtrans will send notifications about payment status.
    |
    */
    'callback_url' => env('MIDTRANS_CALLBACK_URL', 'http://yourdomain.com/payment/callback'),

    /*
    |--------------------------------------------------------------------------
    | Timeout Configuration
    |--------------------------------------------------------------------------
    |
    | Set the timeout for the payment gateway request.
    |
    */
    'timeout' => 60, // in seconds

    /*
    |--------------------------------------------------------------------------
    | Custom Settings (Optional)
    |--------------------------------------------------------------------------
    |
    | Set any other custom settings for Midtrans.
    |
    */
    'is_sanitized' => env('MIDTRANS_IS_SANITIZED', true), // Whether the transaction input should be sanitized
    'is_3ds' => env('MIDTRANS_IS_3DS', true), // Enable 3D Secure payment

    /*
    |--------------------------------------------------------------------------
    | Fraud Detection
    |--------------------------------------------------------------------------
    |
    | Set fraud detection settings. For more info, visit: https://midtrans.com/docs/fraud-detection
    |
    */
    'fraud_detection' => [
        'enabled' => env('MIDTRANS_FRAUD_DETECTION_ENABLED', false),
        'threshold' => env('MIDTRANS_FRAUD_THRESHOLD', 80), // Percentage of fraud detection threshold
    ],

];
