<?php

namespace App\Http\Controllers;

use App\Models\Order;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;


class OrderController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): Response
    {
        return Inertia::render('Orders/Index', [
            'orders' => Order::with('user:id')->latest()->get(),

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
 
        $request->user()->orders()->create();
 
        return redirect(route('orders.index'));
    }

    /**
     * Display the specified resource.
     */
    public function show(Order $order): Response
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Order $order): Response
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
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

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Order $order): RedirectResponse
    {
        $this->authorize('delete', $order);
 
        $order->delete();
 
        return redirect(route('orders.index'));
    }
}
