<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class SellerController extends Controller
{
    public function index(): Response 
    {
        return Inertia::render('Seller/Index', [
            //
            'user' => User::with('user')->latest()->get(),
        ]);
    }
}
