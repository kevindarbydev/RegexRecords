import { Tab } from "@headlessui/react";
import NavLink from "@/Components/NavLink";

export default function ExploreTabs() {
    return (
        <Tab.Group defaultIndex={1}>
            <Tab.List className="flex space-x-8 bg-blue-300/20 p-2">
                <Tab disabled className="ml-2">
                    Explore
                </Tab>
                <Tab>
                    <NavLink
                        // href={route("collections.index")}
                        // active={route().current("collections.index")}
                    >
                        <span className=" dark:text-white dark:hover:bg-gray-700">
                            View All Albums
                        </span>
                    </NavLink>
                </Tab>
                <Tab>
                    <NavLink
                        // href={route("wishlists.index")}
                        // active={route().current("wishlists.index")}
                    >
                        <span className=" dark:text-white dark:hover:bg-gray-700">
                            New Releases
                        </span>
                    </NavLink>
                </Tab>
                <Tab>
                    <NavLink
                    // href={route("submissions.index")}
                    // active={route().current("submissions.index")}
                    >
                        <span className=" dark:text-white dark:hover:bg-gray-700">
                            Advanced Search
                        </span>
                    </NavLink>
                </Tab>
            </Tab.List>
        </Tab.Group>
    );
}
