<?php

use Inertia\Inertia;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\AdminController;
use App\Http\Controllers\Community\CommunityController;
use App\Http\Controllers\Community\FriendController;
use App\Http\Controllers\Dashboard\AlbumController;
use App\Http\Controllers\Dashboard\CollectionController;
use App\Http\Controllers\Dashboard\ExportController;
use App\Http\Controllers\Dashboard\WishlistController;
use App\Http\Controllers\Explore\AdvSearchController;
use App\Http\Controllers\Explore\ExploreController;
use App\Http\Controllers\Marketplace\MarketplaceController;
use App\Http\Controllers\MessagesController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\OrderItemController;
use App\Http\Controllers\ProfileController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;


header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token, Authorization, X-Requested-With');



//live search
Route::get('/proxy', function (Request $request) {
    $url = $request->query('url');
    //$searchQuery = $request->query('q');
    $searchQuery = $request->query('q');
    error_log("decoded " . $searchQuery);
    $accessToken = env('DISCOGS_ACCESS_TOKEN');

    $url .= '?' . $searchQuery . '&token=' . urlencode($accessToken)
        . '&per_page=10&page=1'; // dont really need to always be loading 50 albums (default), this does 10 instead
    error_log("Found value for url: " . $url);
    $response = Http::withHeaders([
        'User-Agent' => 'StudentProjectDiscogsClone/1.0',
    ])->get($url);

    return $response;
});

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
    Route::post('/albums/store', [AlbumController::class, 'store'])->name('dashboard.albums.store');
    Route::get('/albums/{album}', [AlbumController::class, 'show'])->name('dashboard.albums.show');
    Route::patch('/albums/rate/{album}', [AlbumController::class, 'rate'])->name('dashboard.albums.rate');
    Route::post('/albums', [AlbumController::class, 'addAlbumToCollection'])->name('dashboard.album.to.collection');
    // -------------------------
    Route::get('/collections', [CollectionController::class, 'index'])->name('dashboard.collections');
    Route::post('/collections/store', [CollectionController::class, 'store'])->name('dashboard.collections.store');
    Route::patch('/collections/album/update', [CollectionController::class, 'updateForSale'])->name('dashboard.collections.album.sell');
    Route::patch('/collections/{collection}', [CollectionController::class, 'update'])->name('dashboard.collections.update');
    Route::patch('/collections/remove/album}', [CollectionController::class, 'removeFromCollection'])->name('dashboard.collections.remove.album');
    Route::delete('/collections/{collection}', [CollectionController::class, 'destroy'])->name('dashboard.collections.destroy');
    // -------------------------
    Route::get('/wishlists', [WishlistController::class, 'index'])->name('dashboard.wishlists');
    Route::post('/wishlists', [WishlistController::class, 'addAlbumToWishlist'])->name('dashboard.album.to.wishlist');
    Route::patch('/wishlists/remove/album', [WishlistController::class, 'removeFromWishlist'])->name('dashboard.wishlists.remove.album');
    // -------------------------
    Route::get('/export', [ExportController::class, 'index'])->name('dashboard.export');
    Route::post('/exportTo', [ExportController::class, 'exportToCSV'])->name('dashboard.export.post');
});

// EXPLORE
Route::group(['middleware' => 'auth', 'prefix' => 'explore'], function () {
    Route::get('/', [ExploreController::class, 'index'])->name('explore.index');
    Route::get('/viewAllAlbums', [ExploreController::class, 'viewAllAlbums'])->name('explore.viewAllAlbums');
    Route::get('/advSearch', [AdvSearchController::class, 'advSearch'])->name('explore.advSearch');
    Route::post('/advSearch', [AdvSearchController::class, 'advSearch'])->name('explore.advSearch.post');
});

// COMMUNITY
Route::group(['middleware' => 'auth', 'prefix' => 'community'], function () {
    Route::get('/search', [CommunityController::class, 'search'])->name('community.search');
    Route::post('/search', [CommunityController::class, 'searchPost'])->name('community.search.post');
    Route::patch('/search/{user}', [CommunityController::class, 'addFriend'])->name('community.search.add.friend');
    // -----------------------------
    Route::get('/friends', [FriendController::class, 'index'])->name('friends.index');
    Route::patch('/friends/update/{friendship}', [FriendController::class, 'acceptRequest'])->name('friends.update');
    Route::patch('/friends/deny/{friendship}', [FriendController::class, 'denyRequest'])->name('friends.deny');
    Route::delete('/friends/delete/{friendship}', [FriendController::class, 'unfriend'])->name('friends.unfriend');
    Route::get('/friends/{friend}', [FriendController::class, 'viewFriend'])->name('friends.view.friend');
    Route::patch('/friends/like/{collection}', [FriendController::class, 'likeCollection'])->name('friends.like.collection');
});


// MARKETPLACE
Route::group(['middleware' => 'auth', 'prefix' => 'marketplace'], function () {
    Route::get('/', [MarketplaceController::class, 'index'])->name('marketplace.index');

    //CRUD Orders-----------------------
    Route::get('/orders', [OrderController::class, 'index'])->name('orders.index');
    Route::get('/orders/order_items', [OrderController::class, 'showOrderItems'])->name('marketplace.orders.order_items');
    Route::post('/orders', [MarketplaceController::class, 'addAlbumToOrder'])->name('marketplace.album.to.order');

    //Order History-----------------------
    Route::post('/orders/store', [OrderItemController::class, 'store'])->name('order_item.store');
    Route::patch('/orders/{order}', [OrderController::class, 'update'])->name('marketplace.orders.update');
    Route::patch('/orders/{order}', [OrderController::class, 'destroy'])->name('marketplace.orders.destroy');

    // Wishlist-------------------------
    Route::get('/wishlists', [WishlistController::class, 'index'])->name('marketplace.wishlists');
    Route::post('/wishlists', [WishlistController::class, 'addAlbumToWishlist'])->name('marketplace.album.to.wishlist');
    Route::get('/wishlists/remove/{id}', [WishlistController::class, 'removeFromWishlist'])->name('marketplace.wishlists.remove.album');

    //Purchases----------------------------
    Route::get('/purchases', [OrderController::class, 'showPurchases'])->name('marketplace.purchases');
    
    // Contact Seller-------------------------
    Route::post('/seller', [MessagesController::class, 'contactSeller'])->name('marketplace.contact.seller');


    // ============== TESTING CART PACKAGE ================
    Route::get('/cart', [MarketplaceController::class, 'viewCart'])->name('marketplace.cart');
    Route::post('/testing/package', [MarketplaceController::class, 'addToCart'])->name('marketplace.add.to.cart');
    Route::post('/cart/remove', [MarketplaceController::class, 'removeFromCart'])->name('cart.remove');
});

// PROFILE
Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    //Change Profile Pic
    Route::post('/profile/pic', [ProfileController::class, 'addProfilePic'])->name('profile.add.pic');

});

// ADMIN
Route::group(['middleware' => ['web', 'auth', 'admin'], 'prefix' => 'admin'], function () {
    //get tables
    Route::get('/', [AdminController::class, 'index'])->name('admin.index');
    Route::get('/albums', [AdminController::class, 'albums'])->name('admin.albums.index'); //not sure im using this one?

    //delete
    Route::delete('/albums/{id}', [AdminController::class, 'deleteAlbum'])->name('admin.albums.delete');
    Route::delete('/users/{id}', [AdminController::class, 'deleteUser'])->name('admin.users.delete');
    Route::delete('/messages/{id}', [AdminController::class, 'deleteMessage'])->name('admin.messages.delete');
});



// MESSAGES
Route::group(['middleware' => ['web', 'auth'], 'prefix' => 'messages'], function () {
    Route::get('/', [MessagesController::class, 'index'])->name('messages.index');
    Route::get('/create', [MessagesController::class, 'create'])->name('messages.create');
    Route::post('/store/{userId}', [MessagesController::class, 'store'])->name('messages.store');
    Route::get('/{userId}', [MessagesController::class, 'show'])->name('messages.show');
    Route::post('/{userId}', [MessagesController::class, 'update'])->name('messages.update');

    Route::delete('/{threadId}', [MessagesController::class, 'delete'])->name('messages.delete');
});

// STRIPE
Route::get('stripe', [StripeController::class, 'stripe'])->name('stripe.pay.get');
Route::post('stripe', ['App\Http\Controllers\StripeController', 'stripePost'])->name('stripe.pay.post');

// PAYPAL
Route::get('paypal/make-payment', 'App\Http\Controllers\PayPalPaymentController@handlePayment')->name('paypal.make.payment');
Route::get('paypal/cancel-payment', 'App\Http\Controllers\PayPalPaymentController@paymentCancel')->name('paypal.cancel.payment');
Route::get('paypal/payment-success', 'App\Http\Controllers\PayPalPaymentController@paymentSuccess')->name('paypal.success.payment');

require __DIR__ . '/auth.php';
