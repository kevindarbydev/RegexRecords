import { Tab } from "@headlessui/react";

export default function DashTabs() {
    return (
        <Tab.Group>
            <Tab.List>
                <Tab>Dashboard</Tab>
                <Tab>Collections</Tab>
                <Tab>Wishlists</Tab>
            </Tab.List>
            <Tab.Panels>
                <Tab.Panel>Content 1</Tab.Panel>
                <Tab.Panel>Content 2</Tab.Panel>
                <Tab.Panel>Content 3</Tab.Panel>
            </Tab.Panels>
        </Tab.Group>
    );
}
