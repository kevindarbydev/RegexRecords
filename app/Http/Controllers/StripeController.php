<?php

namespace App\Http\Controllers;

use App\Models\Album;
use App\Models\Collection;
use App\Models\Collection_Album;
use App\Models\Order;
use App\Models\Order_Item;
use Gloudemans\Shoppingcart\Facades\Cart;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Stripe;

class StripeController extends Controller
{
    //

    public function stripePost(Request $request): RedirectResponse
    {
        // CREATE ARRAY FOR CART ITEMS
        $items = [];
        $i = 0;

        foreach (Cart::content() as $item) {
            $items[$i] = $item;
            $i++;
        }

        $user = Auth::user();

        // GET ALL CASH VALUES
        $subtotal = (float)Cart::subtotal();
        $tax = (float)Cart::tax();
        $shipping = (float)$request->shipping;

        $total = $subtotal + $tax + $shipping;

        $validator = $request->validate([
            'card_No' => 'required',
            'expMonth' => 'required',
            'expYear' => 'required',
            'cvv' => 'required',
        ]);

        // CREATE STRIPE TRANSACTION
        Stripe\Stripe::setApiKey(env('STRIPE_SECRET'));

        $token = Stripe\Token::create([
            'card' => [
                'number' => $request->card_No,
                'exp_month' => $request->expMonth,
                'exp_year' => $request->expYear,
                'cvc' => $request->cvv
            ],
        ]);

        Stripe\Charge::create([
            'card' => $token['id'],
            'currency' => 'CAD',
            'amount' => round($total * 100),
            'description' => 'wallet'
        ]);

        // CREATE ORDER 
        $order = new Order();
        $order->subtotal = $subtotal;
        $order->tax = $tax;
        $order->shipping = $shipping;
        $order->totalPrice = $total;
        $order->user_id = $user->id;

        $newOrder = $request->user()->orders()->save($order);

        // CREATE ORDER ITEM FOR EVERY ITEM IN CART
        for ($j = 0; $j < sizeof($items); $j++) {
            $album = Album::with('user')->where('album_name', $items[$j]->name)->first();
            $collection_album = Collection_Album::where('album_id', $album->id)->where('for_sale', true)->get();

            foreach ($collection_album as $c) {
                $collection = Collection::with('user:id')->where('id', $c->collection_id)->where('user_id', $items[$j]->options['seller'])->first();

                if ($collection == null) {
                    continue;
                } else {
                    $orderItem = new Order_Item();
                    $orderItem->order_id = $newOrder->id;
                    $orderItem->quantity = 1;
                    $orderItem->album_id = $album->id;
                    $orderItem->price = $items[$j]->price;
                    $orderItem->user_id = $collection->user_id;

                    $newOrder->order_item()->save($orderItem);

                    Cart::remove($items[$j]->rowId);

                    $c->delete($c);

                    break;
                }
            }
        }

        return redirect(route('orders.index'));
    }
}
