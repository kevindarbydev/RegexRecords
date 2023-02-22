<?php

use Inertia\Inertia;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\AlbumController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\WishlistController;
use App\Http\Controllers\CollectionController;
use App\Http\Controllers\MarketplaceController;
use App\Http\Controllers\WishlistAlbumController;
use App\Http\Controllers\CollectionAlbumController;
use App\Http\Controllers\Community\FriendController;
use App\Http\Controllers\Community\SearchController;
use App\Http\Controllers\Community\CommunityController;
use App\Http\Controllers\Explore\ExploreController;
use App\Http\Controllers\Explore\ViewAllAlbumsController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');


//disabled default laravel page
// Route::get('/dashboard', function () {
//     return Inertia::render('Dashboard');
// })->middleware(['auth', 'verified'])->name('dashboard');

Route::resource('albums', AlbumController::class)
    ->only(['index', 'store', 'show'])
    ->middleware(['auth', 'verified']);

Route::resource('collections', CollectionController::class)
    ->only(['index', 'store', 'update', 'destroy'])
    ->middleware(['auth', 'verified']);

Route::resource('wishlists', WishlistController::class)
    ->only(['index', 'store', 'update', 'destroy'])
    ->middleware(['auth', 'verified']);

Route::resource('collection_albums', CollectionAlbumController::class)
    ->only(['index', 'store', 'update', 'destroy'])
    ->middleware(['auth', 'verified']);

Route::resource('wishlist_albums', WishlistAlbumController::class)
    ->only(['index', 'store'])
    ->middleware(['auth', 'verified']);

Route::resource('marketplace', MarketplaceController::class)
    ->only(['index'])
    ->middleware(['auth', 'verified']);

Route::resource('explore', ExploreController::class)
    ->only(['index', 'store', 'update', 'destroy'])
    ->middleware(['auth', 'verified']);

Route::resource('viewAllAlbums', ViewAllAlbumsController::class)
    ->only(['index', 'store', 'update', 'destroy'])
    ->middleware(['auth', 'verified']);

Route::resource('reviews', CollectionAlbumController::class)
    ->only(['index', 'store', 'update', 'destroy'])
    ->middleware(['auth', 'verified']);


Route::group(['middleware' => 'auth', 'prefix' => 'community'], function () {
    Route::get('/', [CommunityController::class, 'index'])->name('community.index');
    Route::get('/search', [CommunityController::class, 'search'])->name('community.search');
    Route::post('/search', [CommunityController::class, 'searchPost'])->name('community.search.post');
    Route::patch('/search/{user}', [CommunityController::class, 'addFriend'])->name('community.search.add.friend');
    // -----------------------------
    Route::get('/friends', [FriendController::class, 'index'])->name('friends.index');
    Route::patch('/friends/update/{friendship}', [FriendController::class, 'acceptRequest'])->name('friends.update');
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::middleware(['auth', 'admin'])->group(function () {

    Route::get('/admin', [AdminController::class, 'index'])->name('admin.index');
    Route::get('/admin/albums', [AdminController::class, 'albums'])->name('admin.albums.index');
});

require __DIR__ . '/auth.php';
