<?php

namespace App\Http\Controllers;

use Gloudemans\Shoppingcart\Facades\Cart;
use Illuminate\Http\Request;
use Inertia\Inertia;

class InertiaController extends Controller
{
    public function index()
    {
        return Inertia::render('Dashboard', [
            'cartCount' => Cart::count(),
        ]);
    }
}
