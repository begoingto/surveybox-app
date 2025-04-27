'use client'
import React from 'react';
import {Navbar} from "flowbite-react";

function PublicNavbarLoading() {
    return (
        <>
            <Navbar
                className={"cus-navbar dark:bg-gray-900 sticky top-0 left-0 z-50 animate-pulse"}
            >
                <Navbar.Brand href="#">
                    <div className="w-9 h-9 bg-gray-200 rounded dark:bg-gray-700 mr-3"></div>
                    <span className="self-center font-extrabold whitespace-nowrap text-md sm:text-xl uppercase text-blue-800 dark:text-blue-600">
                        <div className="w-32 h-6 bg-gray-200 rounded dark:bg-gray-700 mr-3"></div>
                    </span>
                </Navbar.Brand>
                <div className="flex md:order-2 gap-2">
                    <div className={"flex items-center gap-2"}>
                        <div className="w-6 h-6 bg-gray-200 rounded dark:bg-gray-700"></div>
                        <div className="w-32 h-6 bg-gray-200 rounded dark:bg-gray-700"></div>
                        <div className="w-32 h-6 bg-gray-200 rounded dark:bg-gray-700"></div>
                    </div>
                </div>
                <Navbar.Collapse>
                    <Navbar.Link
                        href="#"
                    >
                        <div className="w-24 h-6 bg-gray-200 rounded dark:bg-gray-700"></div>
                    </Navbar.Link>
                    <Navbar.Link
                        href="#">
                        <div className="w-24 h-6 bg-gray-200 rounded dark:bg-gray-700"></div>
                    </Navbar.Link>
                    <Navbar.Link
                        href="#">
                        <div className="w-24 h-6 bg-gray-200 rounded dark:bg-gray-700"></div>
                    </Navbar.Link>
                    <Navbar.Link
                        href="#">
                        <div className="w-24 h-6 bg-gray-200 rounded dark:bg-gray-700"></div>
                    </Navbar.Link>
                    <Navbar.Link
                        href="#">
                        <div className="w-24 h-6 bg-gray-200 rounded dark:bg-gray-700"></div>
                    </Navbar.Link>
                </Navbar.Collapse>
            </Navbar>
        </>
    );
}

export default PublicNavbarLoading;