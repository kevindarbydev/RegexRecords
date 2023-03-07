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

class CollectionController extends Controller
{
    // display index with everything
    public function index(): Response
    {
        $myCollections =  Collection::with('user')->where('user_id', Auth::user()->id)->get();
        $likesInfo = [];
        $i = 0;
        foreach ($myCollections as $collection) {
            $likesInfo[$i] = [$collection->id, $collection->likersCount(), $collection->likers()->get()];
            $i++;
        }
        return Inertia::render('Dashboard/Collections', [
            'collections' => $myCollections,
            // 'collection_albums' => Collection_Album::with('user:id')->latest()->get(),
            'collection_albums' => Collection_Album::with('collection', 'album')->latest()->get(),
            'albums' => Album::with('user')->latest()->get(),
            'cartCount' => Cart::count(),
            'likesInfo' => $likesInfo,
        ]);
    }

    // add collection 
    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'collection_name' => 'required|string|max:255',
        ]);

        $request->user()->collections()->create($validated);


        return redirect()->route('dashboard.collections');
    }

    // edit collection name
    public function update(Request $request, Collection $collection): RedirectResponse
    {
        error_log("$collection");
        $this->authorize('update', $collection);

        $validated = $request->validate([
            'collection_name' => 'required|string|max:255',
        ]);

        $collection->update($validated);

        return redirect(route('dashboard.collections'));
    }

    public function updateForSale(Request $request): RedirectResponse
    {
        try {
            $cAlbum = Collection_Album::where('id', $request->cAlbum)->first();
            $cAlbum2 = Collection_Album::where('for_sale',1)->all();

            error_log("test $cAlbum");

            if ($cAlbum->for_sale == false) {
                $cAlbum->for_sale = true;
                $cAlbum2->for_sale = true;
            } else {
                $cAlbum->for_sale = false;
                $cAlbum2->for_sale = false;
            }

            $cAlbum->update();

            error_log("test $cAlbum");

            return redirect(route('dashboard.collections'));
        } catch (\Exception) {
            return redirect(route('dashboard.collections'))->with('failure', 'Something went wrong!');
        }
    }

    public function removeFromCollection(Request $request)
    {
        // error_log($request->cAlbum);

        $cAlbum = Collection_Album::where('id', $request->cAlbum)->first();

        // error_log($cAlbum);

        $cAlbum->delete();

        return redirect(route('dashboard.collections'));
    }

    // delete collection
    public function destroy(Collection $collection): RedirectResponse
    {
        $this->authorize('delete', $collection);

        $collection->delete();

        return redirect(route('dashboard.collections'));
    }
}
