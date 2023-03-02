<?php

namespace App\Http\Controllers\Explore;

use App\Http\Controllers\Controller;
use App\Models\Album;
use App\Models\Collection;
use Gloudemans\Shoppingcart\Facades\Cart;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;

class ExploreController extends Controller
{
    public function index(): Response
    {

        //* limit setting for all 3 partials on explore/index:
        $limit = 6;


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
            for ($i = 0; $i <= sizeof($subgenreList); $i++) {
                $subgenre = $subgenreList[$i];
                return $subgenre;
            }
        }
        $weekday = Carbon::now()->dayOfWeek;
        // error_log($weekday);

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
            case 2:
                $subgenreList = ["Hardcore Hip-Hop", "Thug Rap", "Pop Rap", "Boom Bap", "Gangsta"];
                $selectedSubgenre = "Hip Hop";
                $subgenre = process($subgenreList);
                break;
            case 3:
                $subgenreList = ["Classic Rock", "Guitar Rock"];
                $selectedSubgenre = "Rock";
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

        // error handler for if no results gotten via switch - uses broader "genre" search instead of "subgenre"

        //* FIXME: still bugs, may actually just need more records
        if ($topPicks->isEmpty()) {
            $topPicks = Album::where(function ($query) use ($selectedSubgenre) {
                $query->where('genre', 'like', '%' . $selectedSubgenre . '%');
            })
                ->inRandomOrder()
                ->limit($limit)
                ->get();
        }
        // enable below else, try again once more records

        // else {
        //     // completes the section header phrase if error, logs
        //     $selectedSubgenre = "general are subjective to the listener";
        //     error_log("ExploreController.php has failed in 'TopPicks' section");
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
                'cartCount' => Cart::count(),
            ]
        );
    }

    public function viewAllAlbums(): Response
    {
        $albums = Album::all();

        return Inertia::render('Explore/ViewAllAlbums', [
            'totalAlbums' => count($albums),
            'collections' => Collection::with('user')->where('user_id', Auth::user()->id)->get(),
            'albums' => Album::paginate(4),
            'cartCount' => Cart::count(),

        ]);
    }
}
