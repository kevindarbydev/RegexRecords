import { Tab } from "@headlessui/react";
import NavLink from "@/Components/NavLink";

export default function MarketplaceTabs() {
    return (
        <Tab.Group defaultIndex={1}>
            <Tab.List className="flex space-x-8 bg-blue-300/20 p-2">
                <Tab disabled className="ml-2">
                    Marketplace
                </Tab>
                <Tab>
                    <NavLink
                    //? collections as placeholder for now
                    // href={route("collections.index")}
                    // active={route().current("collections.index")}
                    >
                        <span className=" dark:text-white dark:hover:bg-gray-700">
                            All Items
                        </span>
                    </NavLink>
                </Tab>
                <Tab>
                    <NavLink
                    // href={route("wishlists.index")}
                    // active={route().current("wishlists.index")}
                    >
                        <span className=" dark:text-white dark:hover:bg-gray-700">
                            Wishlists
                        </span>
                    </NavLink>
                </Tab>
                <Tab>
                    <NavLink
                    // href={route("purchases.index")}
                    // active={route().current("purchases.index")}
                    >
                        <span className=" dark:text-white dark:hover:bg-gray-700">
                            Purchases
                        </span>
                    </NavLink>
                </Tab>
                <Tab>
                    {" "}
                    <NavLink
                    // href={route("cart.index")}
                    // active={route().current("cart.index")}
                    >
                        <span className=" dark:text-white dark:hover:bg-gray-700">
                            Cart
                        </span>
                    </NavLink>
                </Tab>
            </Tab.List>
        </Tab.Group>
    );
}
