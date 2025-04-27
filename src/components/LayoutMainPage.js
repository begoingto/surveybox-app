"use client"
import React, {useEffect} from 'react';
import SBProvider from "@/components/SBProvider";
import SBSCNavbar from "@/components/surveycreator/SBSCNavbar";
import SBNavbar from "@/components/SBNavbar";
import SBSCFooter from "@/components/surveycreator/SBSCFooter";
import SBFooter from "@/components/SBFooter";
import {usePathname} from "next/navigation";
import AOS from "aos";
import "aos/dist/aos.css";
import Outlet from "@/middleware/Outlet";
function LayoutMainPage ({children})  {
    const pathname = usePathname()
    const paths = pathname.split("/").filter(el => el)
    useEffect(() => {
        AOS.init({
            duration: 800,
            once:true
        });
    }, []);
    return (
        <>
            <SBProvider>
                {(()=>{
                    switch (paths[0]) {
                        case "surveycreator":
                            return <SBSCNavbar />
                        case "admin":
                            return ""
                        case "survey":
                            return ""
                        case "vote":
                            return ""
                        default:
                            return <SBNavbar/>
                    }
                })()}
                <main>
                    {/*<Outlet>*/}
                        {children}
                    {/*</Outlet>*/}
                </main>
                {(()=>{
                    switch (paths[0]) {
                        case "surveycreator":
                            return <SBSCFooter />
                        case "admin":
                            return ""
                        case "survey":
                            return ""
                        case "vote":
                            return ""
                        default:
                            return <SBFooter/>
                    }
                })()}
            </SBProvider>
        </>
    );
};

export default LayoutMainPage;