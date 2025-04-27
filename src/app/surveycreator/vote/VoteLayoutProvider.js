'use client'
import React from 'react';
import Tab from "@/components/surveycreator/Tab";
import {usePathname} from "next/navigation";

function VoteLayoutProvider({children}) {
    const pathName = usePathname()
    const paths = pathName.split("/").filter(e => e)
    if (paths.length < 3){
        return <>{children}</>
    }
    return (
        <>
            <Tab/>
            {children}
        </>
    );
}

export default VoteLayoutProvider;