<?php

namespace App\Http\Controllers\Dashboard;

use App\Models\Album;
use App\Http\Controllers\Controller;
use App\Models\Collection;
use App\Models\Collection_Album;
use App\Models\Order;
use App\Models\Order_Item;
use App\Models\User;
use Illuminate\Support\Facades\Storage;
use Error;
use Symfony\Component\HttpFoundation\BinaryFileResponse;
use Gloudemans\Shoppingcart\Facades\Cart;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Response as FacadesResponse;

class ExportController extends Controller
{

    public function index(): Response
    {
        return Inertia::render('Dashboard/Export', [
            'cartCount' => Cart::count(),
        ]);
    }

    public function exportCollectionsToCSV()
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
            $filename = $collection->collection_name . '.csv';
            if (Storage::exists("app/downloads/{$filename}")) {
                Storage::delete("app/downloads/{$filename}");
            }
            $handle = fopen('php://temp', 'w');
            fputcsv($handle, ['Album ID', 'Album Name', 'Value', 'For Sale?']);
            collect($albums)->each(fn ($row) => fputcsv($handle, $row));
            rewind($handle);
            $csvData = stream_get_contents($handle);
            fclose($handle);
            $path = storage_path("app/downloads/{$filename}");
            $url = Storage::url($path);
            if (Storage::put("app/downloads/{$filename}", $csvData)) {
                error_log("Stored file at " . $path);
                return response()->download($path, $filename, [
                    'Content-Type' => 'text/csv',
                    'Content-Disposition' => 'attachment; filename="' . $filename . '"',
                ]);
            } else {
                error_log("Something went wrong");
            }
        }
        return redirect()->route('dashboard.export')->with($url);

    }

    public function exportAlbumsToCSV()
    {

        $userAlbums = Album::with('user')->where('user_id', Auth::user()->id)->get();

        $albums = [];
        $i = 0;

        foreach ($userAlbums as $album) {
            $albums[$i] = array($album->id, $album->album_name);
            $i++;
        }

        $handle = fopen('C:\Users\Public\Downloads\My_Albums.csv', 'w');

        fputcsv($handle, array('Album ID', 'Album Name'));

        collect($albums)->each(fn ($row) => fputcsv($handle, $row));

        return redirect(route('dashboard.export'));
    }

    public function exportOrdersToCSV()
    {
        $orders = Order::with('user')->where('user_id', Auth::user()->id)->get();

        $orderArray = [];
        $i = 0;
        $orderItemsArray = [];
        $j = 0;

        foreach ($orders as $order) {
            $orderArray[$i] = array($order->id, $order->created_at, $order->subtotal, $order->shipping, $order->tax, $order->totalPrice);
            $i++;

            $orderItems = Order_Item::with('user')->where('order_id', $order->id)->get();

            foreach ($orderItems as $orderItem) {
                $album = Album::with('user')->where('id', $orderItem->album_id)->first();
                $user = User::where('id', $orderItem->user_id)->first();

                $orderItemsArray[$j] = array($orderItem->order_id, $album->album_name, $orderItem->price, $user->name);

                $j++;
            }
        }

        // File for all orders
        $handle = fopen('C:\Users\Public\Downloads\My_Orders.csv', 'w');

        fputcsv($handle, array('Order ID', 'Ordered Date', 'Subtotal', 'Tax', 'Shipping', 'Total'));

        collect($orderArray)->each(fn ($row) => fputcsv($handle, $row));

        fclose($handle);

        // File for Items in each Order
        $handle2 = fopen('C:\Users\Public\Downloads\Albums_Purchased.csv', 'w');

        fputcsv($handle2, array('Order ID', 'Album Purchased', 'Price', 'Bought From'));

        collect($orderItemsArray)->each(fn ($row2) => fputcsv($handle2, $row2));

        fclose($handle2);

        return redirect(route('dashboard.export'));
    }
}
