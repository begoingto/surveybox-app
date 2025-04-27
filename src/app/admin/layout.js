'use client'
import React, {useEffect, useState} from 'react';
import SBSidebar from "@/components/admin/SBSidebar";
import DetectNetworkAdmin from "@/app/admin/DetectNetworkAdmin";
import Admin from "@/middleware/Admin";
import './admin-style.css'

function LayoutAdmin({children}) {
    const [isOnline, setIsOnline] = useState(true);

    useEffect(() => {
        const handleOnline = () => {
            setIsOnline(true);
        };

        const handleOffline = () => {
            setIsOnline(false);
        };

        window.addEventListener('online', handleOnline);
        window.addEventListener('offline', handleOffline);

        return () => {
            window.removeEventListener('online', handleOnline);
            window.removeEventListener('offline', handleOffline);
        };
    }, []);

    return (
        <>
            {isOnline ? (
            <SBSidebar>
                <Admin>
                    {children}
                </Admin>
            </SBSidebar>
            ) : (
                <DetectNetworkAdmin/>
            )}
        </>
    );
}

export default LayoutAdmin;