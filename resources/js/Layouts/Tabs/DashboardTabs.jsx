import { Tab } from "@headlessui/react";
import NavLink from "@/Components/NavLink";

export default function DashboardTabs() {
    return (
        <Tab.Group defaultIndex={1}>
            <Tab.List className="flex space-x-8 bg-blue-300/20 p-2">
                <Tab disabled className="ml-2">
                    Dashboard
                </Tab>
                <Tab>
                    <NavLink
                        href={route("dashboard.index")}
                        active={route().current("dashboard.index")}
                    >
                        <span className=" dark:text-white dark:hover:bg-gray-700">
                            My Albums
                        </span>
                    </NavLink>
                </Tab>

                <Tab>
                    <NavLink
                        href={route("dashboard.collections")}
                        active={route().current("dashboard.collections")}
                    >
                        <span className=" dark:text-white dark:hover:bg-gray-700">
                            Collections
                        </span>
                    </NavLink>
                </Tab>
                <Tab>
                    <NavLink
                        href={route("dashboard.wishlists")}
                        active={route().current("dashboard.wishlists")}
                    >
                        <span className=" dark:text-white dark:hover:bg-gray-700">
                            Wishlist
                        </span>
                    </NavLink>
                </Tab>
                <Tab>
                    <NavLink
                        href={route("dashboard.export")}
                        active={route().current("dashboard.export")}
                    >
                        <span className=" dark:text-white dark:hover:bg-gray-700">
                            Export
                        </span>
                    </NavLink>
                </Tab>
            </Tab.List>
        </Tab.Group>
    );
}
