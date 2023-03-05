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
                            Wishlists
                        </span>
                    </NavLink>
                </Tab>
                <Tab>
                    <NavLink
                    href={route("marketplace.purchases")}
                    active={route().current("marketplace.purchases")}
                    >
                        <span className=" dark:text-white dark:hover:bg-gray-700">
                            Purchases
                        </span>
                    </NavLink>
                </Tab>
            </Tab.List>
        </Tab.Group>
    );
}
