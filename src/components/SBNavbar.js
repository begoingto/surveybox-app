"use client"
import React from 'react';
import {Button, Navbar} from "flowbite-react";
import Link from "next/link";
import Image from "next/image";
import {FaUserPlus} from "react-icons/fa";
import {IoLogInOutline} from "react-icons/io5";
import {usePathname, useRouter} from "next/navigation";
import {AiFillDashboard} from "react-icons/ai";
import {useSession} from "next-auth/react";
import PublicNavbarLoading from "@/components/loading/PublicNavbarLoading";
import SbHandleThemeMode from "@/components/SBHandleThemeMode";


function SbNavbar() {

    const pathname = usePathname();
    const router = useRouter()
    const {data: session, status} = useSession()
    // Save the theme to localStorage whenever it changes


    if (status==='loading'){
        return <PublicNavbarLoading />
    }

    const handleDashboard = () =>{
        if (session) {
            if (session.user) {
                const {authMeDto} = JSON.parse(session.user.image)
                const roles = authMeDto.roles.map(role => role.name)
                if (roles.includes("ADMIN")){
                    router.push("/admin/dashboard")
                }else {
                    router.push("/surveycreator/dashboard")
                }
            }
        }
    }

    return (
        <Navbar
            className={"cus-navbar dark:bg-gray-900 sticky top-0 left-0 z-50"}
        >
            <Navbar.Brand href="/" as={Link}>
                <Image
                    unoptimized
                    width={100}
                    height={100}
                    alt="Logo"
                    className="mr-3 w-9 h-9 object-contain"
                    src="/surveybox-logo.png"
                />
                <span className="self-center font-extrabold whitespace-nowrap text-md sm:text-xl uppercase text-blue-800 dark:text-blue-600">surveybox</span>
            </Navbar.Brand>
            <div className="flex md:order-2 gap-2">
                <SbHandleThemeMode />
                <div className={"flex items-center gap-2 btn-auth"}>
                    {(() => {
                        if (session){
                            return (
                                <Button
                                    pill
                                    onClick={handleDashboard}
                                >
                               <span className={"lg:px-3 uppercase flex gap-2"}>
                                   <AiFillDashboard className={"h-5 w-5 lg:mr-2"} />
                                    <span className={"hidden lg:inline"}>Dashboard</span>
                                </span>
                                </Button>
                            )
                        }
                        return (
                            <>
                                <Button pill
                                        onClick={() => router.push("/sign-up")}
                                >
                                <span className={"lg:px-3 uppercase flex gap-2"}>
                                    <FaUserPlus className="h-5 w-5" />
                                    <span className={"hidden lg:inline"}>Sign Up</span>
                                </span>
                                </Button>
                                <Button outline pill
                                        onClick={() => router.push("/sign-in")}
                                >
                                <span className={"lg:px-3 uppercase flex gap-2"}>
                                    <IoLogInOutline className="h-5 w-5" />
                                    <span className={"hidden lg:inline"}>Sign In</span>
                                </span>
                                </Button>
                            </>
                        )
                    })()}
                </div>
                <Navbar.Toggle/>
            </div>
            <Navbar.Collapse>
                <Navbar.Link
                    active={pathname.includes("feature")}
                    href="/feature"
                    as={Link}
                >
                    Feature
                </Navbar.Link>
                <Navbar.Link
                    active={pathname.includes("report")}
                    href="/report" as={Link}>
                    Report
                </Navbar.Link>
                <Navbar.Link
                    active={pathname.includes("vote")}
                    href="/votes" as={Link}>
                    Vote
                </Navbar.Link>
                <Navbar.Link
                    active={pathname.includes("feedback")}
                    href="/feedback" as={Link}>
                    Feedback
                </Navbar.Link>
                <Navbar.Link
                    active={pathname.includes("about-us")}
                    href="/about-us" as={Link}>
                    About Us
                </Navbar.Link>
            </Navbar.Collapse>
        </Navbar>
    );
}

export default SbNavbar;