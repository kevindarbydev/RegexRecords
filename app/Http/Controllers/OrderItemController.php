<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\Order_Item;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Gloudemans\Shoppingcart\Facades\Cart;



class OrderItemController extends Controller
{

    public function showOrderItems(): Response
    {
        return Inertia::render('Orders/order_items', [
            //return order items
            'order_items' => Order_Item::with('order','album')->latest()->get(),
            'cartCount' => Cart::count(),
        ]);
    }

}
