'use client'
import { SessionProvider } from 'next-auth/react'
import {Flowbite, useTheme} from "flowbite-react";
import {Provider} from "react-redux";
import store from "@/store/store";
import {useReadLocalStorage} from "usehooks-ts";

const SBProvider = ({ children }) => {
    const themeMode = useReadLocalStorage("theme")

    return (
        <>
            <Provider store={store}>
                <Flowbite theme={{ dark: themeMode ? (themeMode==='dark') : true }}>
                    <SessionProvider>{children}</SessionProvider>
                </Flowbite>
            </Provider>
        </>
    )
}

export default SBProvider
