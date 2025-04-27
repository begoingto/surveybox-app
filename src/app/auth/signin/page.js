'use client'
import React, { useEffect} from 'react';
import {signIn, useSession} from "next-auth/react";

export default function Page() {
    const { data: session ,status,loading } = useSession()

    useEffect(() => {
        if (!loading && !session) void signIn('google')
        if (!loading && session) window.close()
    }, [loading, session])
    return (
        <div
            className={"bg-white dark:bg-gray-900"}
            style={{
                width: "100vw",
                height: "100vh",
                position: "absolute",
                left: 0,
                top: 0,
                zIndex: 1500,
            }}
        ></div>
    );
}