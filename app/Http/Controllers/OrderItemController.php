<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\Order_Item;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use App\Models\User;
use Illuminate\Support\Facades\DB;


class OrderItemController extends Controller
{

    public function index(): Response
    {
        return Inertia::render('Order_Items/Index', [
            //return order items
            // 'order_items' => Order_Item::with('order','album')->latest()->get(),
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'subtotal' => 'required|int',
            'shipping' => 'required|int',
            'tax' => 'required|int',
            'totalPrice' => 'required|int',
        ]);
 
        $request->user()->orders()->create($validated);
 
        return redirect(route('orders.index'));
    }

    public function addAlbumToOrder(Request $request): RedirectResponse {
    
        $order = Order::with('user')->where('id', $request->id)->first();
        $orderitem = new Order_Item();
        $orderitem->quantity = 1;
        $orderitem->order_id = $request->order_id;
        $orderitem->album_id = $request->album_id;
        $orderitem->price = $request->price;

        $order2 = DB::table('order__items')->where('order_id', 1)->where('album_id', $orderitem->album_id)->first();
        if ($order2 != null) {
            return redirect()->route('marketplace.index');
        }

        $orderitem->order_item()->save($order);
        return redirect()->route('dashboard.wishlists');

    }

    
}
