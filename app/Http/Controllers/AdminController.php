<?php

namespace App\Http\Controllers;


use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Http;

class AdminController extends Controller
{
    public function index()
    {
        return Inertia::render('Admin/AdminPage');
    }
}