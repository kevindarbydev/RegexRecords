<?php

namespace App\Http\Controllers\Explore;

use App\Models\User;
use Inertia\Inertia;
use App\Models\Album;
use Inertia\Response;
use App\Models\Collection;
use Illuminate\Support\Carbon;
use App\Http\Controllers\Controller;
use Illuminate\Pagination\Paginator;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\RedirectResponse;
use Illuminate\Pagination\LengthAwarePaginator;

class ExploreController extends Controller
{
    public function index(): Response
    {

        //*limit setting for all 3 partials on explore/index:
        $limit = 4;


        //? SPOTLIGHT: ARTISTS BY STARTING LETTER
        $name = 'B';
        $spotlightAlbums = Album::where(function ($query) use ($name) {
            $query->where('artist', 'like',  $name . '%');
        })
            ->limit($limit)->inRandomOrder()->get();


        //? NEW RELEASES: ALBUMS THIS WEEK
        //TODO: check this next week
        $recentAlbums = Album::whereBetween('created_at', [Carbon::now()->startOfWeek(Carbon::MONDAY), Carbon::now()->endOfWeek(Carbon::SUNDAY)])->inRandomOrder()->limit($limit)->get();


        return Inertia::render(
            'Explore/Index',
            [
                'recentAlbums' => $recentAlbums,
                'spotlightAlbums' => $spotlightAlbums,
                'collections' => Collection::with('user')->where('user_id', Auth::user()->id)->get(),
            ]
        );
    }

    public function viewAllAlbums(): Response
    {
        $albums = Album::all();
        $totalAlbums = count($albums);
        $perPage = 3;
        $page = Paginator::resolveCurrentPage('viewAllAlbums');
        // $page = LengthAwarePaginator::resolveCurrentPage('viewAllAlbums');
        // $page = Paginator::$defaultView;


        //* LengthAwarePaginator arguments: (mixed $items, int $total, int $perPage, int|null $currentPage = null, array $options = [])

        $albums = new LengthAwarePaginator($albums->forPage($page, $perPage), $totalAlbums, $perPage, $page, [
            'path' => Paginator::resolveCurrentPath(),
            'pageName' => 'page',
        ]);

        //* Paginator arguments:(mixed $items, int $perPage, int|null $currentPage = null, array $options = [])

        // $albums = new Paginator($albums, $perPage, $page, [
        //     'path' => Paginator::resolveCurrentPath(),
        //     'pageName' => 'page',
        // ]);

        // $test = new LengthAwarePaginator($albums->forPage($page, $perPage), Album::all(), $perPage, $page, [
        //     'path' => Paginator::resolveCurrentPath(),
        //     'pageName' => 'page',
        // ]);

        // $albums = Album::all()->paginate(3);
        // $albums = Album::paginate(3);
        // $results = Album::paginate(3);
        // $albums = Album::all();
        // $input_array = array($albums);
        // print_r(array_chunk($input_array, 3));
        // $results = (array_chunk($input_array, 3, true));



        return Inertia::render('Explore/ViewAllAlbums', [
            'perPage' => $perPage,
            'totalAlbums' => $totalAlbums,
            'collections' => Collection::with('user')->where('user_id', Auth::user()->id)->get(),
            // 'albums' => $albums,
            'albums' => Album::all(),


            // 'albums' => Album::all(), $results,
            // 'albums' => $albums,
            // 'albums' => $results,
            // 'albums' => $test,
            // 'albums' => DB::table('albums')->paginate(3),
            // 'albums' => DB::table('albums')->simplePaginate(3),
            // 'albums' => Album::paginate(3),
            // 'albums' => Album::simplePaginate(3),
            // 'albums' => Album::all()->paginate(3),
            // 'albums' => Album::all()->simplePaginate(3),
            // 'albums' => Album::split()->simplePaginate(3),


        ]);
    }
}