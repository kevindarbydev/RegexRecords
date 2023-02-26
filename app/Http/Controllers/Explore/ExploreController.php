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

        //* limit setting for all 3 partials on explore/index:
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


        //? TOP PICKS: BY SUBGENRE
        // dynamically cycles content every day

        function process($subgenreList)
        {
            for ($i = 0; $i <  sizeof($subgenreList); $i++) {
                $subgenre = $subgenreList[$i];
            }
            return $subgenre;
        }

        $weekday = Carbon::now()->dayOfWeek;
        // days are 0-6 where sunday is 0, monday is 1, etc
        switch ($weekday) {
            case 0:
                $subgenreList = ["Melodic Hardcore", "Punk", "Hardcore"];
                $selectedSubgenre = "Punk";
                $subgenre = process($subgenreList);
                break;
            case 1:
                $subgenreList = ["Blues", "Rhythm & Blues", "Piano Blues"];
                $selectedSubgenre = "Blues";
                $subgenre = process($subgenreList);
                break;
                //! from here on will adjust subgenres the more we add/go live
            case 2:
                $subgenreList = ["Blues", "Rhythm & Blues", "Piano Blues"];
                $selectedSubgenre = "Blues";
                $subgenre = process($subgenreList);
                break;
            case 3:
                $subgenreList = ["Blues", "Rhythm & Blues", "Piano Blues"];
                $selectedSubgenre = "Blues";
                $subgenre = process($subgenreList);
                break;
            case 4:
                $subgenreList = ["Blues", "Rhythm & Blues", "Piano Blues"];
                $selectedSubgenre = "Blues";
                $subgenre = process($subgenreList);
                break;
            case 5:
                $subgenreList = ["Blues", "Rhythm & Blues", "Piano Blues"];
                $selectedSubgenre = "Blues";
                $subgenre = process($subgenreList);
                break;
            case 6:
                $subgenreList = ["Blues", "Rhythm & Blues", "Piano Blues"];
                $selectedSubgenre = "Blues";
                $subgenre = process($subgenreList);
                break;
            default:
                error_log("Error reading weekday switch in ExploreController.php");
                break;
        }


        $topPicks = Album::where(function ($query) use ($subgenre) {
            $query->where('subgenres', 'like', '%' . $subgenre . '%');
        })
            ->inRandomOrder()
            ->limit($limit)
            ->get();

        // if query fails this moves the weekday forward in an attempt to render other content instead of blank results
        if (!$topPicks) {
            $weekday++;
            if ($weekday > 6) {
                $weekday = 0;
            }
        }

        // error_log($topPicks);


        return Inertia::render(
            'Explore/Index',
            [
                'selectedSubgenre' => $selectedSubgenre,
                'topPicks' => $topPicks,
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

        return Inertia::render('Explore/ViewAllAlbums', [
            'perPage' => $perPage,
            'totalAlbums' => $totalAlbums,
            'collections' => Collection::with('user')->where('user_id', Auth::user()->id)->get(),
            'albums' => Album::all(),

        ]);
    }
}
