<?php

namespace App\Http\Controllers;

use DB;
use App\Models\Order;

class DashboardController extends Controller
{
    public function topProducts()
    {
        $topProducts = Order::select(
            'products.name as product_name',
            'products.image_url',
            DB::raw('SUM(orders.quantity) as total_sold')
        )
            ->join('products', 'orders.product_id', '=', 'products.id')
            ->groupBy('products.id', 'products.name', 'products.image_url')
            ->orderByDesc('total_sold')
            ->limit(5)
            ->get();

        return response()->json($topProducts);
    }
}
