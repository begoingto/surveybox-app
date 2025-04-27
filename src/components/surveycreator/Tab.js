import React from 'react';
import Link from "next/link";
import { usePathname } from "next/navigation";
import { VscSettings } from "react-icons/vsc";
import { HiOutlineShare } from "react-icons/hi";
import { BiLayer } from "react-icons/bi";
import { useSelector } from "react-redux";
import {selectVote} from "@/store/feature/vote/voteSlice";
import "../../app/globals.css"

function Tab() {
    const vote = useSelector(selectVote);
    const pathName = usePathname();
    const active = "dark:bg-gray-700 dark:text-white bg-blue-200 text-gray-700";
    const paths = pathName.split("/").filter(el => el)
    if (paths.length < 3) return null
    return (
        <div className="my-4 flex justify-center">
            <ul className="flex  text-sm font-medium text-center text-gray-500 divide-x divide-gray-200 rounded-lg shadow sm:flex dark:divide-gray-700 dark:text-gray-400">
                <li className="w-32 lg:w-44">
                    <Link
                        href={"/surveycreator/vote/setting-up" + (vote ? "/" + vote.id : "")}
                        className={"flex gap-2 justify-center items-center w-full p-4 hover:text-gray-700 hover:bg-gray-100 dark:hover:text-white dark:hover:bg-gray-700 " +
                            (pathName.includes("setting-up") ? active : "")
                        }
                    >
                        <VscSettings className="sm:w-6 sm:h-6" />
                        <span className="hidden sm:inline">Setup</span>
                    </Link>
                </li>
                <li className="w-32 lg:w-44">
                        <Link
                            href={vote ? "/surveycreator/vote/share/" + vote.id : "#"}
                            className={
                                "flex gap-2 justify-center items-center w-full p-4 hover:text-gray-700 hover:bg-gray-100 dark:hover:text-white dark:hover:bg-gray-700 " +
                                (`${vote === null ? 'none-vote ' : ''}${paths[2] === 'share' ? 'active ' : ''}`)
                            }
                            disabled={vote === null}
                        >
                            <HiOutlineShare className="sm:w-6 sm:h-6" />
                            <span className="hidden sm:inline">Share</span>
                        </Link>
                </li>
                <li className="w-32 lg:w-44">
                    <Link
                        href={vote ? "/surveycreator/vote/result/" + vote.id : "#"}
                        className={
                            "flex gap-2 justify-center items-center w-full p-4 hover:text-gray-700 hover:bg-gray-100 dark:hover:text-white dark:hover:bg-gray-700 " +
                            (`${vote===null  ?'none-vote ':''}${paths[2]==='result'? active : ""}`)}
                            disabled={vote === null}

                    >
                        <BiLayer className="sm:w-6 sm:h-6" />
                        <span className="hidden sm:inline">Results</span>
                    </Link>
                </li>
            </ul>
        </div>
    );
}

export default Tab;
