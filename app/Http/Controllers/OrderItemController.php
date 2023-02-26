<?php

namespace App\Http\Controllers;

use App\Models\Order_Item;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use App\Models\User;

class OrderItemController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): Response
    {
        return Inertia::render('Order_Items/Index', [
            //return order items
            // 'order_items' => Order_Item::with('order','album')->latest()->get(),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(): Response
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
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

    /**
     * Display the specified resource.
     */
    public function show(Order_Item $order_Item): Response
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Order_Item $order_Item): Response
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Order_Item $order_Item): RedirectResponse
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $user,Order_Item $order_Item): RedirectResponse
    {
        // return $this->update($user, $order_Item);
    }
}
