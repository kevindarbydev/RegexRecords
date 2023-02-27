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


        //? ----- SPOTLIGHT: ARTISTS BY STARTING LETTER -----
        // this section cycles through a random letter and if records are found, will display them. If records not found, it rerolls letters until it finds records

        function randomLetter()
        {
            $int = rand(0, 25);
            $letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
            $letter = $letters[$int];
            return $letter;
        }

        $letter = randomLetter();
        // error_log("the first letter searched " . $letter);


        $spotlightAlbums = Album::where(function ($query) use ($letter) {
            $query->where('artist', 'like',  $letter . '%');
        })
            ->limit($limit)->inRandomOrder()->get();
        $featureLetter = $letter;

        while ($spotlightAlbums->isEmpty()) {

            $letter = randomLetter();
            // error_log("rerolled, new letter is " . $letter);
            $spotlightAlbums = Album::where(function ($query) use ($letter) {
                $query->where('artist', 'like',  $letter . '%');
            })
                ->limit($limit)->inRandomOrder()->get();
            $featureLetter = $letter;
        }


        //? ----- NEW RELEASES: ALBUMS THIS WEEK -----

        $recentAlbums = Album::whereBetween('created_at', [Carbon::now()->startOfWeek(Carbon::MONDAY), Carbon::now()->endOfWeek(Carbon::SUNDAY)])->inRandomOrder()->limit($limit)->get();


        //? -----  TOP PICKS: BY SUBGENRE -----
        // dynamically cycles content by subgenre, different every day

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
                $subgenreList = ["Blues", "Rhythm & Blues", "Piano Blues"];
                $selectedSubgenre = "Blues";
                $subgenre = process($subgenreList);
                break;
            case 1:
                $subgenreList = ["Punk", "Melodic Hardcore", "Hardcore"];
                $selectedSubgenre = "Punk";
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
        // TODO: needs work, leaving it for now
        // while ($topPicks->isEmpty()) {
        //     $weekday++;
        // }

        // error_log($topPicks);


        return Inertia::render(
            'Explore/Index',
            [
                'featureLetter' => $featureLetter,
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
        // $perPage = 3;

        return Inertia::render('Explore/ViewAllAlbums', [
            // 'perPage' => $perPage,
            'totalAlbums' => $totalAlbums,
            'collections' => Collection::with('user')->where('user_id', Auth::user()->id)->get(),
            'albums' => Album::all(),

        ]);
    }
}
