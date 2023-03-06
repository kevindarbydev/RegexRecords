import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import Collection from "@/Pages/Dashboard/Partials/Collection";
import InputError from "@/Components/InputError";
import PrimaryButton from "@/Components/PrimaryButton";
import { useForm, Head, Link } from "@inertiajs/react";
import MarketplaceTabs from "@/Layouts/Tabs/MarketplaceTabs";
import Dropdown from "@/Components/Dropdown";

export default function Cart({ auth, cartContents, cartCount, tax, subtotal }) {
    const { data, setData, post, processing, reset, errors } = useForm({
        cart: "",
        checkout: "",
        card_No: "",
        expMonth: "",
        expYear: "",
        cvv: "",
        shipping: "",
        rowId: "",
    });

    const checkout = (e) => {
        e.preventDefault();
        post(route('stripe.pay.post'), { onSuccess: () => reset() });
    }

    const remove = (e) => {
        e.preventDefault();
        post(route('cart.remove'), { onSuccess: () => reset() });
    }

    if (subtotal < 100) {
        var shipping = subtotal / 2;
    }
    else {
        var shipping = 0
    }

    var total = subtotal + tax + shipping;

    // console.log(cartContents);
    return (
        <AuthenticatedLayout auth={auth} cartCount={cartCount}>
            <Head title="Cart" />
            <div className="flex flex-row">
                <table className=" w-1/2 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 m-6">
                    <thead>
                        <th scope="col" className="px-3 py-3 ml-5 text-left">
                            Album
                        </th>
                        <th scope="col" className="px-6 py-3 text-left">
                            Price
                        </th>
                        <th scope="col">

                        </th>
                    </thead>
                    {cartContents.map((cartItem) =>
                        <tbody>
                            <tr>
                                <th
                                    scope="row"
                                    class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white flex flex-row"
                                >
                                    <img
                                        className="rounded-t-lg md:h-full md:w-20 md:rounded-none md:rounded-l-lg mr-5"
                                        src={cartItem.options['imageURL']}
                                        alt=""
                                    />
                                    <p className="mt-4">{cartItem.name}</p>
                                </th>
                                <td className="px-6 py-4">
                                    ${cartItem.price}
                                </td>
                                <td className="px-6 py-4">
                                    <Dropdown>
                                        <Dropdown.Trigger>
                                            <button onClick={() => {
                                                setData('rowId', cartItem.rowId)
                                            }}>
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    className="h-4 w-4 text-gray-400"
                                                    viewBox="0 0 20 20"
                                                    fill="currentColor"
                                                >
                                                    <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
                                                </svg>
                                            </button>
                                        </Dropdown.Trigger>
                                        <Dropdown.Content>
                                            <button
                                                onClick={remove}
                                                className="block w-full px-4 py-2 text-left text-sm leading-5 text-gray-700 hover:bg-gray-100 focus:bg-gray-100 transition duration-150 ease-in-out"
                                            >
                                                Remove from Cart
                                            </button>
                                        </Dropdown.Content>
                                    </Dropdown>
                                </td>
                            </tr>
                        </tbody>
                    )}
                </table>
                <table className="w-1/3 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 m-6">
                    <tbody>
                        <tr>
                            <td>
                                Subtotal: ${subtotal}
                            </td>
                        </tr>
                        <tr>
                            {subtotal < 100 && subtotal > 0 ?
                                <td>
                                    Shipping: ${shipping.toFixed(2)}
                                </td>
                                :
                                <td>
                                    Shipping: $0.00
                                </td>
                            }
                        </tr>
                        <tr>
                            <td>
                                Tax: ${tax.toFixed(2)}
                            </td>
                        </tr>
                        <tr>
                            <hr />
                        </tr>
                        <tr>
                            <td>Total: ${total.toFixed(2)}</td>
                        </tr>
                        <tr>
                            <hr className="mb-3" />
                        </tr>
                        <tr className="mt-5">
                            <a
                                className="mr-2 ml-2 items-center px-2 py-2 bg-gray-800 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-gray-700 focus:bg-gray-700 active:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-150"
                                onClick={() => {
                                    setData('checkout', "regular");
                                }}
                                href="#"
                            >
                                Checkout
                            </a>
                            <a
                                className="items-center px-2 py-2 bg-gray-800 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-gray-700 focus:bg-gray-700 active:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-150"
                                href={route('paypal.make.payment')}
                            >
                                PayPal Checkout
                            </a>
                        </tr>
                    </tbody>
                </table>
            </div>
            {data.checkout == "regular" && total > 0 ?
                <div style={{ marginLeft: '-40em', marginRight: '10em' }} className="grid grid-cols-1 place-items-end">
                    <form className="text-left w-1/4 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 m-6" onSubmit={checkout}>
                        <div className="mt-3 mb-3 ml-2">
                            <label>
                                Credit Card:
                            </label>
                            <input
                                className="ml-2 mr-4"
                                placeholder="5555 5555 5555 5555"
                                size="20"
                                name="card_no"
                                type='text'
                                onChange={(e) => {
                                    setData('card_No', e.target.value);
                                }}
                            />
                        </div>
                        <div className="mt-3 mb-3 ml-2">
                            <label>
                                Expiration Date:
                            </label>
                            <input
                                className="ml-2"
                                placeholder="MM"
                                size="4"
                                type="text"
                                name="expMonth"
                                onChange={(e) => {
                                    setData('expMonth', e.target.value);
                                }}
                            />
                            <input
                                placeholder="YYYY"
                                size="4"
                                type="text"
                                name="expYear"
                                onChange={(e) => {
                                    setData('expYear', e.target.value);
                                }}
                            />
                        </div>
                        <div className="mt-3 mb-3 ml-2">
                            <label>
                                CVV:
                            </label>
                            <input
                                className="ml-2"
                                placeholder="123"
                                size="3"
                                type="text"
                                name="cvv"
                                onChange={(e) => {
                                    setData('cvv', e.target.value);
                                }}
                            />
                        </div>
                        <div>
                            <PrimaryButton processing={processing} className="ml-2 mb-3" onClick={() => {
                                setData('shipping', shipping);
                            }}>
                                Pay ${total.toFixed(2)}
                            </PrimaryButton>
                        </div>
                    </form>
                </div>
                :
                <></>
            }
        </AuthenticatedLayout >
    );
}
