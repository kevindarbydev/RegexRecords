<?php

namespace App\Http\Controllers;

use App\Models\ItemStatus;
use App\Models\Order;
use App\Models\Order_Item;
use App\Models\OrderStatus;
use Gloudemans\Shoppingcart\Facades\Cart;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;


class OrderController extends Controller
{
    //Show/Read orders
    public function index(): Response
    {
        return Inertia::render('Marketplace/Orders', [
            'orders' => Order::with('order_item', 'user')->where('user_id', Auth::user()->id)->latest()->get(),
            'orders2' => Order::with('order_item', 'user')->where('user_id', Auth::user()->id)->where('status', OrderStatus::Submitted)->get(),
            'orders3' => Order::with('order_item', 'user')->where('user_id', Auth::user()->id)->where('status', OrderStatus::Processed)->get(),
            'orders4' => Order::with('order_item', 'user')->where('user_id', Auth::user()->id)->where('status', OrderStatus::Completed)->get(),
            'cartCount' => Cart::count(),
            'orderStatus' => OrderStatus::cases(),
        ]);
    }

    //Create orders
    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'subtotal' => 'required|double',
            'shipping' => 'required|double',
            'tax' => 'required|double',
            'totalPrice' => 'required|double',
        ]);

        $request->user()->orders()->create($validated);

        return redirect(route('orders.index'));
    }

    //Update Orders
    public function update(Request $request, Order $order): RedirectResponse
    {
        $this->authorize('update', $order);

        $validated = $request->validate([
            'subtotal' => 'required|int',
            'shipping' => 'required|int',
            'tax' => 'required|int',
            'totalPrice' => 'required|int',
        ]);

        $order->update($validated);

        return redirect(route('orders.index'));
    }

    //Delete Orders
    public function destroy(Order $order): RedirectResponse
    {
        $this->authorize('delete', $order);

        $order->delete();

        return redirect(route('orders.index'));
    }

    public function showOrderItems(Request $request): Response
    {

        return Inertia::render('Marketplace/OrderItems', [
            //return order items
            'order_items' => Order_Item::with('order', 'album')->where('order_id', $request->order)->latest()->get(),
            'order_items2' => Order_Item::with('order', 'album')->where('order_id', $request->order)->where('status', ItemStatus::Sold)->latest()->get(),
            'order_items3' => Order_Item::with('order', 'album')->where('order_id', $request->order)->where('status', ItemStatus::Shipped)->latest()->get(),
            'order_items4' => Order_Item::with('order', 'album')->where('order_id', $request->order)->where('status', ItemStatus::Received)->latest()->get(),
            'cartCount' => Cart::count(),
            'itemStatus' => ItemStatus::cases(),
        ]);
    }

    public function showAlbumsSold()
    {
        return Inertia::render('Marketplace/AlbumsSold', [
            //return order items
            'order_items' => Order_Item::with('user', 'album')->where('user_id', Auth::user()->id)->latest()->get(),
            'order_items2' => Order_Item::with('user', 'album')->where('user_id', Auth::user()->id)->where('status', ItemStatus::Sold)->latest()->get(),
            'order_items3' => Order_Item::with('user', 'album')->where('user_id', Auth::user()->id)->where('status', ItemStatus::Shipped)->latest()->get(),
            'order_items4' => Order_Item::with('user', 'album')->where('user_id', Auth::user()->id)->where('status', ItemStatus::Received)->latest()->get(),
            'cartCount' => Cart::count(),
            'itemStatus' => ItemStatus::cases(),
        ]);
    }

    public function itemShipped(Request $request): RedirectResponse
    {
        $orderItem = Order_Item::with('user', 'order')->where('id', $request->orderItem)->first();

        $orderItem->status = ItemStatus::Shipped;

        $orderItem->update();

        $order = Order::with('user')->where('id', $orderItem->order_id)->first();

        $order->status = OrderStatus::Processed;

        $order->update();

        return redirect(route('marketplace.orders.albums.sold'));
    }

    public function itemReceived(Request $request): RedirectResponse
    {
        $orderItem = Order_Item::with('user', 'order')->where('id', $request->orderItem)->first();

        $orderItem->status = ItemStatus::Received;

        $orderItem->update();

        $orderItems = Order_Item::with('user', 'order')->where('order_id', $orderItem->order_id)->get();

        $items = [];
        $i = 0;

        foreach ($orderItems as $item) {
            $items[$i] = $item->status;
            $i++;
        }

        $count = 0;

        for ($j = 0; $j < sizeof($items); $j++) {
            if ($items[$j] == "Received") {
                $count++;
            }
            error_log($items[$j]);
        }

        if ($count == sizeof($items)) {
            $order = Order::with('user')->where('id', $orderItem->order_id)->first();
            $order->status = OrderStatus::Completed;

            $order->update();
        }
        return redirect(route('orders.index'));
    }
}
