<?php

namespace App\Http\Controllers;

use App\Models\Cart;
use Inertia\Inertia;
use App\Models\Order;
use App\Models\HeaderOrder;
use App\Models\OrderInformation;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Auth;

class OrderController extends Controller
{

    public function __construct()
    {
        $this->middleware('auth');
    }

    public function index()
    {
        $cartItems = Cart::where('user_id', Auth::id())->with('product')->get();
        $headerOrder = HeaderOrder::first();

        return Inertia::render('Order/Index', [
            'dataHeaderOrder' => $headerOrder,
            'auth' => [
                'user' => Auth::user(),
            ],
            'cartItems' => $cartItems->map(function ($cartItem) {
                if ($cartItem->product) {
                    return [
                        'id' => $cartItem->id,
                        'product' => [
                            'name' => $cartItem->product->name,
                            'price' => $cartItem->product->price,
                            'image_url' => $cartItem->product->image_url,
                        ],
                        'quantity' => $cartItem->quantity,
                        'price' => $cartItem->price,
                    ];
                }
                return null;
            })->filter(),

            'orderInfo' => [
                'total_price' => $cartItems->sum(function ($item) {
                    return $item->price;
                }),
                'item_count' => $cartItems->count(),
            ],
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'orderItems' => 'required|array',
            'orderItems.*.product_id' => 'required|exists:products,id',
            'orderItems.*.quantity' => 'required|integer|min:1',
            'total_price' => 'required|numeric|min:0',
        ]);

        $existingOrder = Order::where('user_id', auth()->id())->first();

        if ($existingOrder) {
            $existingOrder->total_price = $validated['total_price'];
            $existingOrder->product_id = $validated['orderItems'][0]['product_id'];
            $existingOrder->status = 'Processing';
            $existingOrder->save();

            return redirect()->route('order.index')->with('success', 'Order successfully placed!');
        } else {
            do {
                $randomId = random_int(1000000000, 9999999999);
            } while (Order::where('id', $randomId)->exists());

            $order = Order::create([
                'user_id' => auth()->id(),
                'product_id' => $validated['orderItems'][0]['product_id'],
                'total_price' => $validated['total_price'],
                'status' => 'pending',
            ]);

            $order->status = 'Processing';
            $order->save();

            return redirect()->route('order.index')->with('success', 'Order successfully placed!');
        }
    }

    // public function storeInformations(Request $request)
    // {
    //     $validated = $request->validate([
    //         'recipient_name' => 'required|string',
    //         'email' => 'required|email',
    //         'notes' => 'nullable|string',
    //         'address' => 'required|string',
    //         'postal_code' => 'required|numeric',
    //     ]);

    //     try {
    //         $orderInformation = OrderInformation::create($validated);

    //         return response()->json([
    //             'message' => 'Order information submitted successfully!',
    //             'orderInformation' => $orderInformation
    //         ]);
    //     } catch (\Exception $e) {
    //         Log::error($e->getMessage());

    //         return response()->json([
    //             'message' => 'Failed to submit order information.',
    //             'error' => $e->getMessage()
    //         ], 500);
    //     }
    // }

    // public function storeInformations(Request $request)
    // {
    //     $validated = $request->validate([
    //         'recipient_name' => 'required|string',
    //         'email' => 'required|email',
    //         'notes' => 'nullable|string',
    //         'address' => 'required|string',
    //         'postal_code' => 'required|numeric',
    //     ]);

    //     try {
    //         // Ambil order yang sudah ada atau baru dibuat
    //         $existingOrder = Order::where('user_id', auth()->id())->where('status', 'Processing')->first();

    //         if (!$existingOrder) {
    //             return response()->json([
    //                 'message' => 'No active order found.',
    //             ], 400);
    //         }

    //         // Tambahkan order_id dari order yang sudah ada atau baru saja diproses
    //         $validated['order_id'] = $existingOrder->id;

    //         // Simpan data informasi order
    //         $orderInformation = OrderInformation::create($validated);

    //         return response()->json([
    //             'message' => 'Order information submitted successfully!',
    //             'orderInformation' => $orderInformation
    //         ]);
    //     } catch (\Exception $e) {
    //         Log::error($e->getMessage());

    //         return response()->json([
    //             'message' => 'Failed to submit order information.',
    //             'error' => $e->getMessage()
    //         ], 500);
    //     }
    // }

    // public function storeInformations(Request $request)
    // {
    //     $validated = $request->validate([
    //         'recipient_name' => 'required|string',
    //         'email' => 'required|email',
    //         'notes' => 'nullable|string',
    //         'address' => 'required|string',
    //         'postal_code' => 'required|numeric',
    //     ]);

    //     try {
    //         // Retrieve the currently "Processing" order
    //         $existingOrder = Order::where('user_id', auth()->id())
    //             ->where('status', 'Processing')
    //             ->first();

    //         if (!$existingOrder) {
    //             return response()->json([
    //                 'message' => 'No active order found.',
    //             ], 400);  // Return 400 if no active order is found
    //         }

    //         // Generate a custom ID, could be UUID or any other custom logic
    //         // Example: Using UUID (you could also use something like random_int)
    //         $customId = (string) \Str::uuid();  // Laravel's UUID helper

    //         // Add the order_id from the existing order
    //         $validated['order_id'] = $existingOrder->id;
    //         $validated['id'] = $customId;  // Set the custom id

    //         // Create the OrderInformation, using custom ID
    //         $orderInformation = OrderInformation::create($validated);

    //         return response()->json([
    //             'message' => 'Order information submitted successfully!',
    //             'orderInformation' => $orderInformation
    //         ]);
    //     } catch (\Exception $e) {
    //         // Log any errors that occur during the process
    //         Log::error($e->getMessage());

    //         return response()->json([
    //             'message' => 'Failed to submit order information.',
    //             'error' => $e->getMessage()
    //         ], 500);  // Return 500 if there is a server error
    //     }
    // }

    public function storeInformations(Request $request)
    {
        $validated = $request->validate([
            'recipient_name' => 'required|string',
            'email' => 'required|email',
            'notes' => 'nullable|string',
            'address' => 'required|string',
            'postal_code' => 'required|numeric',
        ]);

        try {
            // Retrieve the currently "Processing" order
            $existingOrder = Order::where('user_id', auth()->id())
                ->where('status', 'Processing')
                ->first();

            if (!$existingOrder) {
                return response()->json([
                    'message' => 'No active order found.',
                ], 400);  // Return 400 if no active order is found
            }

            // Assign the order's id directly, since 'order_id' is actually 'id' in the `orders` table
            $validated['order_id'] = $existingOrder->id; // Use the `id` from the `orders` table

            // Create the OrderInformation, using the order_id to link to the order
            $orderInformation = OrderInformation::create($validated);

            return response()->json([
                'message' => 'Order information submitted successfully!',
                'orderInformation' => $orderInformation
            ]);
        } catch (\Exception $e) {
            // Log any errors that occur during the process
            Log::error($e->getMessage());

            return response()->json([
                'message' => 'Failed to submit order information.',
                'error' => $e->getMessage()
            ], 500);  // Return 500 if there is a server error
        }
    }

    public function myOrder()
    {
        $orders = Order::with('product')->where('user_id', auth()->id())->get();
        $orderInformations = OrderInformation::where('id', $orders->pluck('id'))->get();

        $orders = $orders->map(function ($order) use ($orderInformations) {
            $information = $orderInformations->firstWhere('order_id', $order->id);

            return [
                'id' => $order->id,
                'recipient_name' => $information->recipient_name ?? '',
                'email' => $information->email ?? '',
                'address' => $information->address ?? '',
                'postal_code' => $information->postal_code ?? '',
                'notes' => $information->notes ?? '',
                'created_at' => $order->created_at->format('Y-m-d H:i:s'),
                'status' => $order->status,
            ];
        });

        return Inertia::render('User/Order/MyOrder', [
            'orders' => $orders,
            'cartItems' => $orders->flatMap->items,
        ]);
    }

    public function manageOrders()
    {
        $orders = Order::all();
        $orderInformations = OrderInformation::all();

        return Inertia::render('Admin/Order/ManageOrderProducts', [
            'orders' => $orders->map(function ($order) use ($orderInformations) {
                $informations = $orderInformations->filter(function ($information) use ($order) {
                    return $information->order_id === $order->id;
                });

                return [
                    'id' => $order->id,
                    'recipient_name' => $informations->first()->recipient_name ?? '',
                    'email' => $informations->first()->email ?? '',
                    'address' => $informations->first()->address ?? '',
                    'postal_code' => $informations->first()->postal_code ?? '',
                    'notes' => $informations->first()->notes ?? '',
                    'total_price' => $order->total_price,
                    'created_at' => $order->created_at->format('Y-m-d H:i:s'),
                    'status' => $order->status,
                ];
            }),
        ]);
    }
}
