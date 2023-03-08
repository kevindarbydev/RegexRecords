import { Tab } from "@headlessui/react";
import NavLink from "@/Components/NavLink";

export default function ExploreTabs() {
    return (
        <Tab.Group defaultIndex={1}>
            <Tab.List className="flex justify-evenly bg-blue-300/20 p-2">
                <Tab disabled className="ml-2">
                    Explore
                </Tab>
                <Tab>
                    <NavLink
                        href={route("explore.index")}
                        active={route().current("explore.index")}
                    >
                        <span className=" dark:text-white dark:hover:bg-gray-700">
                            Discover
                        </span>
                    </NavLink>
                </Tab>
                <Tab>
                    <NavLink
                        href={route("explore.viewAllAlbums")}
                        active={route().current("explore.viewAllAlbums")}
                    >
                        <span className=" dark:text-white dark:hover:bg-gray-700">
                            View All Albums
                        </span>
                    </NavLink>
                </Tab>
                <Tab>
                    <NavLink
                        href={route("explore.advSearch")}
                        active={route().current("explore.advSearch")}
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
