'use client'
import React from 'react';
import {BsFillChatRightDotsFill, BsFillFileEarmarkBarGraphFill, BsPatchCheckFill} from "react-icons/bs";
import {FaClipboardList} from "react-icons/fa";
import {VscSettings} from "react-icons/vsc";
import Link from "next/link";
import {MdDashboard} from "react-icons/md";
import {usePathname} from "next/navigation";
import SbcNavTabLoading from "@/components/loading/surveycreatorloading/SbcNavTabLoading";
import {useSession} from "next-auth/react";

function SBSCNavTab() {
    const pathname = usePathname()
    const active = "text-blue-600 border-b-2 border-blue-600"
    const paths = pathname.split("/").filter(el => el)
    const {status } = useSession()
    if (status === "loading") {
        return <SbcNavTabLoading />
    }
    return (
        <>
            <div className={"bg-opacity-75 dark:bg-opacity-75 bg-white dark:bg-gray-900 dark:text-white flex justify-center sticky top-[55px] left-0 z-40"}>
                <div className="border-b border-gray-200 dark:border-gray-700 ">
                    <ul className="flex lg:justify-center  text-sm font-medium text-center text-gray-500 dark:text-gray-400 overflow-x-auto">
                        <li>
                            <Link href={"/surveycreator/dashboard"}
                                  className={" inline-flex p-4 rounded-t-lg group text-base " + (paths[1]==="dashboard" ? active : "")}
                                  aria-current="page">
                                <MdDashboard className="w-5 h-5 mr-2"/>
                                <span className={"hidden md:inline"}>Dashboard</span>
                            </Link>
                        </li>
                        <li>
                            <Link href={"/surveycreator/survey"}
                                  className={"inline-flex p-4 rounded-t-lg group text-base " + (paths[1] === "survey" ? active : "")}>
                                <FaClipboardList className="w-5 h-5 mr-2"/>
                                <span className={"hidden md:inline"}>Survey</span>
                            </Link>
                        </li>
                        <li>
                            <Link href={"/surveycreator/vote"}
                                  className={"inline-flex p-4 rounded-t-lg group text-base " + (paths[1]==="vote" ? active : "")}>
                                <BsPatchCheckFill className="w-5 h-5 mr-2"/>
                                <span className={"hidden md:inline"}>Vote</span>
                            </Link>
                        </li>
                        <li>
                            <Link href={"/surveycreator/report"}
                                  className={"inline-flex p-4 rounded-t-lg group text-base " + (paths[1]==="report" ? active : "")}>
                                <BsFillFileEarmarkBarGraphFill className="w-5 h-5 mr-2"/>
                                <span className={"hidden md:inline"}>Report</span>

                            </Link>
                        </li>
                        <li>
                            <Link href={"/surveycreator/feedback"}
                                  className={"inline-flex p-4 rounded-t-lg group text-base " + (paths[1]==="feedback" ? active : "")}>
                                <BsFillChatRightDotsFill className="w-5 h-5 mr-2"/>
                                <span className={"hidden md:inline"}>Feedback</span>
                            </Link>
                        </li>
                        <li>
                            <Link href={"/surveycreator/settings/user"}
                                  className={"inline-flex p-4 rounded-t-lg group text-base " + (paths[1]==="settings" ? active : "")}>
                                <VscSettings className="w-5 h-5 mr-2"/>
                                <span className={"hidden md:inline"}>Settings</span>
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </>
    );
}

export default SBSCNavTab;