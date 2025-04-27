import React from 'react';
import {DarkThemeToggle} from "flowbite-react";
import {useLocalStorage, useReadLocalStorage} from "usehooks-ts";

function SbHandleThemeMode() {
    const themeMode = useReadLocalStorage("theme")
    const [theme, setTheme] = useLocalStorage('theme', themeMode)

    return (
        <DarkThemeToggle onClick={() => {
            setTheme(themeMode ? (themeMode==='dark' ? 'light' : 'dark') : 'dark')
        }} />
    );
}

export default SbHandleThemeMode;