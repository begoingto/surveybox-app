import React from 'react';
import "./style.css"
import SBSurveySidebar from "@/app/surveycreator/survey/SBSurveySidebar";

export const metadata = {
    title: {
        template: '%s - SURVEYCREATOR'
    },
}
function Layout({children}) {
    return (
        <div className="flex flex-col lg:flex-row w-full relative">
            <SBSurveySidebar />
            <div className="px-2 lg:px-5 w-full">
                {children}
            </div>
        </div>
    );
}

export default Layout;