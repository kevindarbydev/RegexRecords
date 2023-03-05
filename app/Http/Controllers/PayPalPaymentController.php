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
use Srmklive\PayPal\Services\ExpressCheckout;

class PayPalPaymentController extends Controller
{
    public function handlePayment()
    {
        $items = [];
        $i = 0;
        $subtotal = (float)Cart::subtotal();

        $product = [];
        $product['items'] = [

            // [
            //     'name' => $items[0]->name,
            //     'price' => $items[0]->price, // adding $items[0]->price doesn't work
            //     'desc'  => 'Running shoes for Men',
            //     'qty' => 1
            // ],
            // [
            //     'name' => $items[1]->name,
            //     'price' => $items[1]->price, // adding $items[0]->price doesn't work
            //     'desc'  => 'Running shoes for Men',
            //     'qty' => 1
            // ]
        ];
        foreach (Cart::content() as $item) {
            $items[$i] = $item;
            $product['items'][] = array(
                'name' => $items[$i]->name,
                'price' => $items[$i]->price,
            );
            $i++;
        }
        $product['invoice_id'] = 1;
        $product['invoice_description'] = "Order #{$product['invoice_id']} Bill";
        $product['return_url'] = route('paypal.success.payment');
        $product['cancel_url'] = route('paypal.cancel.payment');
        $product['total'] = $subtotal;

        $paypalModule = new ExpressCheckout();

        // $res = $paypalModule->setExpressCheckout($product);
        $res = $paypalModule->setExpressCheckout($product, true);

        return redirect($res['paypal_link']);
    }

    public function paymentCancel()
    {
        dd('Your payment has been declined. The payment cancellation page goes here!');
    }

    public function paymentSuccess(Request $request): RedirectResponse
    {
        $paypalModule = new ExpressCheckout();
        $response = $paypalModule->getExpressCheckoutDetails($request->token);

        $items = [];
        $i = 0;

        $user = Auth::user();

        foreach (Cart::content() as $item) {
            $items[$i] = $item;
            $i++;
        }

        $subtotal = (float)Cart::subtotal();
        $tax = (float)Cart::tax();

        if ($subtotal < 100) {
            $shipping = $subtotal / 2;
        } else {
            $shipping = 0;
        }

        $order = new Order();
        $order->subtotal = $subtotal;
        $order->tax = $tax;
        $order->shipping = $shipping;
        $order->totalPrice = $subtotal + $tax + $shipping;
        $order->user_id = $user->id;

        $newOrder = $request->user()->orders()->save($order);

        error_log($newOrder);

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
        // Cart::clear();

        if (in_array(strtoupper($response['ACK']), ['SUCCESS', 'SUCCESSWITHWARNING'])) {
            return redirect(route('orders.index'));
        }


        return redirect(route('orders.index'));
    }
}
