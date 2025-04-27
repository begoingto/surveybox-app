import React from 'react';
import {Tooltip} from "flowbite-react";
import Link from "next/link";
import {BiLayer} from "react-icons/bi";
import {HiOutlineShare} from "react-icons/hi";
import {VscSettings} from "react-icons/vsc";

function SbButtonsNavigation({vote }) {

    return (
        <div className="flex items-center justify-center gap-x-6 text-gray-500">
            <Tooltip
                style={"dark"}
                content="Setting-Up"
                placement="top"
                tooltipmaxwidth={50}
            >
                <Link href={"/surveycreator/vote/setting-up/"+ vote.id}>
                    <VscSettings/>
                </Link>
            </Tooltip>

            <Tooltip
                style={"dark"}
                content="Share"
                placement="top"
                tooltipmaxwidth={50}
            >
                <Link href={"/surveycreator/vote/share/"+ vote.id }>
                    <HiOutlineShare/>
                </Link>
            </Tooltip>

            <Tooltip
                style={"dark"}
                content="Report"
                placement="top"
                tooltipmaxwidth={50}
            >
                <Link href={"/surveycreator/vote/result/"+ vote.id}>
                    <BiLayer/>
                </Link>
            </Tooltip>

        </div>
    );
}

export default SbButtonsNavigation;