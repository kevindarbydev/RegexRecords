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

    public function exportToCSV(): RedirectResponse
    {
        $collections = Collection::with('user')->where('user_id', Auth::user()->id)->get();

        foreach ($collections as $collection) {
            $albums = [];
            $i = 0;
            $cAlbums = Collection_Album::where('collection_id', $collection->id)->get();

            foreach ($cAlbums as $cAlbum) {
                $album = Album::with('user')->where('id', $cAlbum->album_id)->first();

                if ($cAlbum->for_sale == 0) {
                    $for_sale = 'Not Selling';
                } else {
                    $for_sale = 'Selling';
                }
                $albums[$i] = array($album->id, $album->album_name, (float)$album->value, $for_sale);
                $i++;
            }
            $handle = fopen($collection->collection_name . '.csv', 'w');

            collect($albums)->each(fn ($row) => fputcsv($handle, $row));

            fclose($handle);
        }

        return redirect(route('dashboard.export'));
    }
}
