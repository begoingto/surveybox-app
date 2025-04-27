import React from 'react';
import './style.css'
import SBDashboardContent from "@/app/surveycreator/dashboard/SBSCDashboard";
export const metadata = {
    title: 'Dashboard',

}
function Page() {
    return (
        <>
            <SBDashboardContent />
        </>
    )
}

export default Page;