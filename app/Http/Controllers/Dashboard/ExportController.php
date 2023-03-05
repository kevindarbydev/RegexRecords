<?php

namespace App\Http\Controllers\Dashboard;

use App\Models\Album;
use App\Http\Controllers\Controller;
use App\Models\Collection;
use App\Models\Collection_Album;
use Error;
use Gloudemans\Shoppingcart\Facades\Cart;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class ExportController extends Controller
{

    public function index(): Response
    {
        return Inertia::render('Dashboard/Export', [
            'cartCount' => Cart::count(),
        ]);
    }

    public function exportToCSV(): Response
    {

        $table = Album::all();
        $output = '';
        foreach ($table as $row) {
            error_log("row: " . $row);
            $output .=  implode(",", $row->toArray());
            error_log("row2: " . $row);
        }
        $headers = array(
            'Content-Type' => 'text/csv',
            'Content-Disposition' => 'attachment; filename="aaa.csv"',
        );

        return Response::make(rtrim($output, "\n"), 200, $headers);
        // Request $request
        error_log("YES BUTTON WORKS");

        // return redirect()->route('dashboard.export');
    }
}
