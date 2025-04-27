'use client'
import React, {useState} from 'react';
import {Avatar, Dropdown,Sidebar} from "flowbite-react";
import {
    HiChartPie} from "react-icons/hi2";
import {BiBuoy} from "react-icons/bi";
import {HiDocumentReport, HiOutlineLogout, HiViewBoards} from "react-icons/hi";
import Link from "next/link";
import Image from "next/image";
import {usePathname} from "next/navigation";
import {VscSettings} from "react-icons/vsc";
import {FaClipboardList, FaListUl, FaVoteYea} from "react-icons/fa";
import {IoMdColorFill} from "react-icons/io";
import {BsFillQuestionCircleFill} from "react-icons/bs";
import {MdDashboard} from "react-icons/md";
import SbHandleThemeMode from "@/components/SBHandleThemeMode";
function SBSidebar({children}) {

    const active = "bg-white dark:bg-gray-700"
    const pathname = usePathname()
    const [drawerClass,setDrawerClass] = useState("left-0")
    const [drawer,setDrawer] = useState(false)
    const handleDrawer = () => {
        if (drawer){
            setDrawer(false)
            setDrawerClass("left-64 lg:left-0");
        }else{
            setDrawer(true)
            setDrawerClass("left-0");
        }
    }

    return (
        <>
            <nav
                className=" fixed top-0 justify-items-center z-50 w-full  border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
                <div className="px-3 py-3 lg:px-5 lg:pl-3">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center justify-start">
                            <button
                                onClick={handleDrawer}
                                type="button"
                                className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                            >
                                <span className="sr-only">Open sidebar</span>
                                <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20"
                                     xmlns="http://www.w3.org/2000/svg">
                                    <path clipRule="evenodd" fillRule="evenodd"
                                          d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
                                </svg>
                            </button>
                            <Link href={"/admin/dashboard"} className="flex ml-40 md:mr-24">
                                <Image unoptimized width={100} height={100} src="/surveybox-logo.png" className="h-8 mr-3 w-full" alt="surveybox Logo"/>
                                <span className="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap uppercase text-blue-800 dark:text-blue-600">surveybox</span>
                            </Link>
                        </div>

                        <div className={"flex items-center md:order-2 gap-3 mr-40 "}>
                            <SbHandleThemeMode />
                            <Avatar alt="User settings" img="https://flowbite.com/docs/images/people/profile-picture-5.jpg" rounded/>
                            <Dropdown
                                inline
                                label={"Nun SomRithy"}
                            >
                                <Dropdown.Header>
                        <span className="block text-sm">
                          Bonnie Green
                        </span>
                                    <span className="block truncate text-sm font-medium">
                          name@flowbite.com
                        </span>
                                </Dropdown.Header>
                                <Dropdown.Item>
                                    Dashboard
                                </Dropdown.Item>
                                <Dropdown.Item>
                                    Settings
                                </Dropdown.Item>
                                <Dropdown.Item>
                                    Earnings
                                </Dropdown.Item>
                                <Dropdown.Divider />
                                <Dropdown.Item>
                                    Sign out
                                </Dropdown.Item>
                            </Dropdown>
                        </div>
                    </div>
                </div>
            </nav>

            <Sidebar
                aria-label="SBSidebar with content separator example"
                className={" fixed z-40  transition-transform -translate-x-full  border-r border-gray-200 lg:translate-x-0 dark:bg-gray-800 dark:border-gray-700 "+ drawerClass}
            >
                <Sidebar.Items>
                    <Sidebar.ItemGroup>
                        <Sidebar.Item
                            href={"/admin/dashboard"}
                            as={Link}
                            icon={MdDashboard}
                            className={pathname.includes("dashboard") ? active : ""}
                        >
                            Dashboard
                        </Sidebar.Item>
                        <Sidebar.Item
                            href={"#"}
                            as={Link}
                            icon={FaListUl}
                            className={pathname.includes("products") ? active : ""}
                        >
                            Category
                        </Sidebar.Item>
                        <Sidebar.Item
                            href="#"
                            as={Link}
                            icon={BsFillQuestionCircleFill}
                        >
                            Question
                        </Sidebar.Item>
                        <Sidebar.Item
                            href="#"
                            as={Link}
                            icon={IoMdColorFill}
                        >
                            Theme
                        </Sidebar.Item>
                        <Sidebar.Item
                            href="#"
                            as={Link}
                            icon={FaClipboardList}
                        >
                            Survey
                        </Sidebar.Item>
                        <Sidebar.Item
                            href="#"
                            as={Link}
                            icon={HiDocumentReport}
                        >
                            Report
                        </Sidebar.Item>
                        <Sidebar.Item
                            href="#"
                            as={Link}
                            icon={FaVoteYea}
                        >
                            Vote
                        </Sidebar.Item>
                        <Sidebar.Item
                            href="#"
                            as={Link}
                            icon={VscSettings}
                        >
                            Setting
                        </Sidebar.Item>
                    </Sidebar.ItemGroup>
                    <Sidebar.ItemGroup>
                        <Sidebar.Item
                            href="#"
                            as={Link}
                            icon={HiChartPie}
                        >
                            Upgrade to Pro
                        </Sidebar.Item>
                        <Sidebar.Item
                            href="#"
                            as={Link}
                            icon={HiViewBoards}
                        >
                            Documentation
                        </Sidebar.Item>
                        <Sidebar.Item
                            href="#"
                            as={Link}
                            icon={BiBuoy}
                        >
                            Help
                        </Sidebar.Item>
                        <Sidebar.Item
                            href="#"
                            as={Link}
                            icon={HiOutlineLogout}
                        >
                            Logout
                        </Sidebar.Item>
                    </Sidebar.ItemGroup>
                </Sidebar.Items>
            </Sidebar>

            <div className="p-4 lg:ml-64 mt-16">
                {children}
            </div>
        </>
    );
}

export default SBSidebar;