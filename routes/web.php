<?php

use Inertia\Inertia;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\Dashboard\CollectionController;
use App\Http\Controllers\Marketplace\MarketplaceController;
use App\Http\Controllers\Dashboard\AlbumController;
use App\Http\Controllers\Community\FriendController;
use App\Http\Controllers\Community\CommunityController;
use App\Http\Controllers\Explore\ExploreController;
use App\Http\Controllers\MessagesController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\Dashboard\WishlistController;


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

// LANDING PAGE
Route::get('/', function () {
    return Inertia::render('LandingPage');
})->middleware(['auth', 'verified'])->name('landing.page');

//CSRF token
Route::get('/csrf-token', function () {
    return response()->json(['csrfToken' => csrf_token()]);
})->name('csrf.token');

// DASHBOARD
Route::group(['middleware' => 'auth', 'prefix' => 'dashboard'], function () {
    Route::get('/albums', [AlbumController::class, 'index'])->name('dashboard.index');
    Route::get('/albums/store', [AlbumController::class, 'store'])->name('dashboard.albums.store');
    Route::get('/albums/{album}', [AlbumController::class, 'show'])->name('dashboard.albums.show');
    Route::post('/albums', [AlbumController::class, 'addAlbumToCollection'])->name('dashboard.album.to.collection');
    // -------------------------
    Route::get('/collections', [CollectionController::class, 'index'])->name('dashboard.collections');
    Route::get('/collections/{collection}/albums', [CollectionController::class, 'showAlbums'])->name('dashboard.collections.albums');
    Route::post('/collections/store', [CollectionController::class, 'store'])->name('dashboard.collections.store');
    Route::patch('/collections/album/update', [CollectionController::class, 'updateForSale'])->name('dashboard.collections.album.sell');
    Route::patch('/collections/{collection}', [CollectionController::class, 'update'])->name('dashboard.collections.update');
    Route::delete('/collections/{collection}', [CollectionController::class, 'destroy'])->name('dashboard.collections.destroy');
    // -------------------------
    Route::get('/wishlists', [WishlistController::class, 'index'])->name('dashboard.wishlists');
    Route::get('/wishlists/wishlist_albums', [WishlistController::class, 'showWishlistAlbums'])->name('dashboard.wishlists.albums');
    Route::post('/wishlists/store', [WishlistController::class, 'store'])->name('dashboard.wishlists.store');
    Route::patch('/wishlists/{wishlist}', [WishlistController::class, 'update'])->name('dashboard.wishlists.update');
    Route::delete('/wishlists/{wishlist}', [WishlistController::class, 'destroy'])->name('dashboard.wishlists.destroy');
});

// EXPLORE
Route::group(['middleware' => 'auth', 'prefix' => 'explore'], function () {
    Route::get('/', [ExploreController::class, 'index'])->name('explore.index');
    Route::get('/viewAllAlbums', [ExploreController::class, 'viewAllAlbums'])->name('explore.viewAllAlbums');
});

// COMMUNITY
Route::group(['middleware' => 'auth', 'prefix' => 'community'], function () {
    Route::get('/', [CommunityController::class, 'index'])->name('community.index');
    Route::get('/search', [CommunityController::class, 'search'])->name('community.search');
    Route::post('/search', [CommunityController::class, 'searchPost'])->name('community.search.post');
    Route::patch('/search/{user}', [CommunityController::class, 'addFriend'])->name('community.search.add.friend');
    // -----------------------------
    Route::get('/friends', [FriendController::class, 'index'])->name('friends.index');
    Route::patch('/friends/update/{friendship}', [FriendController::class, 'acceptRequest'])->name('friends.update');
    Route::patch('/friends/deny/{friendship}', [FriendController::class, 'denyRequest'])->name('friends.deny');
    Route::delete('/friends/delete/{friendship}', [FriendController::class, 'unfriend'])->name('friends.unfriend');
});


// MARKETPLACE
Route::group(['middleware' => 'auth', 'prefix' => 'marketplace'], function () {
    Route::get('/', [MarketplaceController::class, 'index'])->name('marketplace.index');
    Route::get('/orders', [OrderController::class, 'index'])->name('orders.index');;
    Route::post('/marketplace/orders', [OrderController::class, 'store'])->name('order.store');
});

// TODO: 
// add this to the marketplace controller eventually
Route::resource('orders', OrderController::class)
    ->only(['index', 'store', 'update', 'destroy'])
    ->middleware(['auth', 'verified']);

// PROFILE
Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

// ADMIN
Route::middleware(['auth', 'admin'])->group(function () {
    //get tables
    Route::get('/admin', [AdminController::class, 'index'])->name('admin.index');
    Route::get('/admin/albums', [AdminController::class, 'albums'])->name('admin.albums.index');

    //delete
    Route::delete('/admin/albums/{id}', [AdminController::class, 'deleteAlbum'])->name('admin.albums.delete');
});

// MESSAGES
Route::group(['middleware' => ['web', 'auth'], 'prefix' => 'messages'], function () {
    Route::get('/', [MessagesController::class, 'index'])->name('messages.index');
    Route::get('/create', [MessagesController::class, 'create'])->name('messages.create');
    Route::get('/store/{userId}', [MessagesController::class, 'store'])->name('messages.store');
});
require __DIR__ . '/auth.php';
