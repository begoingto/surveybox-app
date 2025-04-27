'use client'
import React from 'react';
import {Avatar,Dropdown, Navbar} from "flowbite-react";
import Link from "next/link";
import Image from "next/image";
import {signOut, useSession} from "next-auth/react";
import { useRouter} from "next/navigation";
import {useDispatch, useSelector} from "react-redux";
import {logout, selectCurrentUser, setLoadingLogout} from "@/store/feature/auth/AuthSlice";
import PublicNavbarLoading from "@/components/loading/PublicNavbarLoading";
import {getUserAvatar} from "@/lib/fileBase";
import {avatarDefault, getFullName, sleep} from "@/lib/siteConfig";
import LoadingIndicator from "@/app/sign-in/components/LoadingIndicator";
import SbHandleThemeMode from "@/components/SBHandleThemeMode";
function SBSCNavbar() {
    const dispatch = useDispatch();
    const user = useSelector(selectCurrentUser)
    const router = useRouter();
    const { status} = useSession();
    const [loading, setLoading] = React.useState(false);


    const handleLogout = async () => {
        setLoading(true);
        dispatch(setLoadingLogout(true))
        dispatch(logout());
        await signOut({ redirect: false });
        await sleep(2000);
        setLoading(false);
        dispatch(setLoadingLogout(false))
        router.push('/');
    }

    if (status=== "loading"){
        return <PublicNavbarLoading />
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
            <div className="flex items-center md:order-2 gap-3 relative">
                <SbHandleThemeMode />
                <Dropdown
                    className={"z-50"}
                    inline
                    label={<>
                        <LoadingIndicator width={7} height={7} className={loading ? '' :'hidden' } />
                        <Avatar
                            className={"object-fill"}
                            alt="User settings"
                            img={getUserAvatar(user?.avatar) ? getUserAvatar(user?.avatar) : avatarDefault.src}
                            rounded
                        />
                        <p className={"hidden md:block ml-3"}>{user ? getFullName(user): "surveybox"}</p>
                    </>}
                >
                    <Dropdown.Header>
                        <span className="block text-sm">
                         {user ? user.firstName :  "SurveyBox"}
                        </span>
                        <span className="block truncate text-sm font-medium">
                          {user ? user.email :  "surveybox@gmail.com"}
                        </span>
                    </Dropdown.Header>
                    <Dropdown.Item   onClick={() => router.push('/surveycreator/dashboard')}>
                        Dashboard
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => router.push('/surveycreator/settings/user')}>
                        Settings
                    </Dropdown.Item>
                    <Dropdown.Item onClick={handleLogout}>
                        <LoadingIndicator width={7} height={7} className={loading ? '' :'hidden' } />
                        Sign Out
                    </Dropdown.Item>
                    <Dropdown.Divider />
                </Dropdown>
            </div>
        </Navbar>
    );
}

export default SBSCNavbar;