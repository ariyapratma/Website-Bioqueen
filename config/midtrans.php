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

    'serverKey ' => env('MIDTRANS_SERVER_KEY'),
    'isProduction ' => env('MIDTRANS_IS_PRODUCTION'),
    'isSanitized ' => env('MIDTRANS_IS_SANITIZED'),
    'is3ds ' => env('MIDTRANS_IS_3DS'),

    /*
    |--------------------------------------------------------------------------
    | Callback URL
    |--------------------------------------------------------------------------
    |
    | This is the URL where Midtrans will send notifications about payment status.
    |
    */

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
    'is_sanitized' => env('MIDTRANS_IS_SANITIZED', true),
    'is_3ds' => env('MIDTRANS_IS_3DS', true),

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
        'threshold' => env('MIDTRANS_FRAUD_THRESHOLD', 80),
    ],

];
