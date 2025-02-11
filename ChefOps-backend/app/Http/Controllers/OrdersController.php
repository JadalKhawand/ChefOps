<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Order;
use Illuminate\Support\Facades\Log;


class OrdersController extends Controller
{
    public function index()
{
    $orders = Order::with('menus') 
        ->get()
        ->map(function ($order) {
            $orderTotal = $order->menus->map(function ($menu) {
                return [
                    'menuName' => $menu->name,
                    'quantity' => $menu->pivot->quantity, 
                    'price' => $menu->price,
                    'totalPrice' => $menu->pivot->quantity * $menu->price, 
                ];
            });

            $totalPrice = $orderTotal->sum('totalPrice'); 

            return [
                'orderID' => $order->orderID,
                'menu' => $orderTotal,
                'totalPrice' => $totalPrice,
            ];
        });

    $grandTotalPrice = $orders->sum('totalPrice'); 

    return response()->json([
        'orders' => $orders,
        'totalMoney' => $grandTotalPrice,
    ]);
}

    

    public function add(Request $request)
{
    try {
       
        $request->validate([
            'menu_items' => 'required|array',
            'menu_items.*.menuID' => 'required|exists:menus,menuID',
            'menu_items.*.quantity' => 'required|integer|min:1',
        ]);

        $order = Order::create();  

        foreach ($request->menu_items as $item) {
            $order->menus()->attach($item['menuID'], ['quantity' => $item['quantity']]);
        }

        $order->load('menus');

        return response()->json([
            'message' => 'Order created successfully',
            'order' => $order,
        ], 201);
    } catch (\Exception $e) {
        Log::error('Error creating order: ' . $e->getMessage());

        return response()->json([
            'message' => 'An error occurred while creating the order',
            'error' => $e->getMessage(),
        ], 500);
    }
}

public function update(Request $request, $id)
    {
        try {
            $request->validate([
                'menu_items' => 'required|array',
                'menu_items.*.menuID' => 'required|exists:menus,menuID',
                'menu_items.*.quantity' => 'required|integer|min:1',
            ]);

            $order = Order::findOrFail($id);

            $menuItems = [];
            foreach ($request->menu_items as $item) {
                $menuItems[$item['menuID']] = ['quantity' => $item['quantity']];
            }
            $order->menus()->sync($menuItems); 

            $order->load('menus');

            return response()->json([
                'message' => 'Order updated successfully',
                'order' => $order,
            ]);
        } catch (\Exception $e) {
            Log::error('Error updating order: ' . $e->getMessage());

            return response()->json([
                'message' => 'An error occurred while updating the order',
                'error' => $e->getMessage(),
            ], 500);
        }
    }



public function destroy($id)
{
    $order = Order::findOrFail($id); 
    $order->menus()->detach(); 
    $order->delete(); 

    return response()->json(['message' => 'Order deleted successfully']);
}

}
