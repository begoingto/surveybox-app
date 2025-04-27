'use client'
import React, { useEffect, useState } from 'react';
import SBNavTab from '@/components/surveycreator/SBSCNavTab';
import { ErrorBoundary } from "next/dist/client/components/error-boundary";
import Error from "@/app/surveycreator/error";
import Detectnetwork from "@/app/surveycreator/detectnetwork";
import {usePathname} from "next/navigation";
import SurveyCreator from "@/middleware/SurveyCreator";
import './survey-creator-style.css'

function LayoutSurveyCreator({ children }) {
    const [isOnline, setIsOnline] = useState(true);
    const pathname = usePathname();
    const paths = pathname.split("/").filter(el => el)
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
                <ErrorBoundary errorComponent={Error}>
                    <SBNavTab />
                    <section className={paths.includes("compares")?"px-3 lg:px-5":'max-w-screen-xl mx-auto'}>
                        <SurveyCreator>
                            {children}
                        </SurveyCreator>
                    </section>
                </ErrorBoundary>
            ) : (
                <Detectnetwork />
            )}
        </>
    );
}

export default LayoutSurveyCreator;