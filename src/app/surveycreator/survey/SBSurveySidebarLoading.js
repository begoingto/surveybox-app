import React from 'react';
import {Sidebar} from "flowbite-react";

function SBSurveySidebarLoading() {
    return (
        <>
            <Sidebar
                aria-label="Default sidebar example"
                sb-custom={"creator-nav"}
                className={"z-40 bg-gray-50 dark:bg-gray-900 dark:border-gray-700 sticky top-[110px] left-0 bg-opacity-75 dark:bg-opacity-75 w-full lg:w-64 animate-pulse"}
            >
                <Sidebar.Items>
                    <Sidebar.ItemGroup>
                        <Sidebar.Item
                            href="#"
                        >
                            <div className="h-9 bg-gray-200 w-full rounded dark:bg-gray-700"></div>
                        </Sidebar.Item>
                        <Sidebar.Item
                            href="#"
                        >
                            <div className="h-9 bg-gray-200 w-full rounded dark:bg-gray-700"></div>
                        </Sidebar.Item>
                        <Sidebar.Item
                            href="#"
                        >
                            <div className="h-9 bg-gray-200 w-full rounded dark:bg-gray-700"></div>
                        </Sidebar.Item>
                        <Sidebar.Item
                            href="#"
                        >
                            <div className="h-9 bg-gray-200 w-full rounded dark:bg-gray-700"></div>
                        </Sidebar.Item>
                        <Sidebar.Item
                            href="#"
                        >
                            <div className="h-9 bg-gray-200 w-full rounded dark:bg-gray-700"></div>
                        </Sidebar.Item>
                    </Sidebar.ItemGroup>
                </Sidebar.Items>
            </Sidebar>
        </>
    );
}

export default SBSurveySidebarLoading;