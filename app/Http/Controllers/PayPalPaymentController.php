<?php

namespace App\Http\Controllers;

use Gloudemans\Shoppingcart\Facades\Cart;
use Illuminate\Http\Request;
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
        dd('Your payment has been declend. The payment cancelation page goes here!');
    }

    public function paymentSuccess(Request $request)
    {
        $paypalModule = new ExpressCheckout();
        $response = $paypalModule->getExpressCheckoutDetails($request->token);

        if (in_array(strtoupper($response['ACK']), ['SUCCESS', 'SUCCESSWITHWARNING'])) {
            dd('Payment was successfull. The payment success page goes here!');
        }

        dd('Error occured!');
    }
}
