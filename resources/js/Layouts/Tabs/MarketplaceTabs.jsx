import { Tab } from "@headlessui/react";
import NavLink from "@/Components/NavLink";

export default function MarketplaceTabs() {
    return (
        <Tab.Group defaultIndex={1}>
            <Tab.List className="flex justify-evenly bg-blue-300/20 p-2">
                <Tab disabled className="ml-2">
                    Marketplace
                </Tab>
                <Tab>
                    <NavLink
                        href={route("marketplace.index")}
                        active={route().current("marketplace.index")}
                    >
                        <span className=" dark:text-white dark:hover:bg-gray-700">
                            All Items
                        </span>
                    </NavLink>
                </Tab>
                <Tab>
                    <NavLink
                        href={route("marketplace.wishlists")}
                        active={route().current("marketplace.wishlists")}
                    >
                        <span className=" dark:text-white dark:hover:bg-gray-700">
                            Wishlist
                        </span>
                    </NavLink>
                </Tab>
                <Tab>
                    <NavLink
                        href={route("orders.index")}
                        active={route().current("orders.index")}
                    >
                        <span className=" dark:text-white dark:hover:bg-gray-700">
                            Order History
                        </span>
                    </NavLink>
                </Tab>
                <Tab>
                    <NavLink
                        href={route("marketplace.orders.albums.sold")}
                        active={route().current(
                            "marketplace.orders.albums.sold"
                        )}
                    >
                        <span className=" dark:text-white dark:hover:bg-gray-700">
                            My Sold Albums
                        </span>
                    </NavLink>
                </Tab>
            </Tab.List>
        </Tab.Group>
    );
}
