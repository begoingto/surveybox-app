'use client'
import React from 'react';

import 'react-toastify/dist/ReactToastify.css';
import {ToastContainer} from "react-toastify";
import {useTheme} from "flowbite-react";

function ToastConfig(props) {
    const theme = useTheme()
    return (
        <>
            <ToastContainer
                theme={theme.mode}
                {...props}
            />
        </>
    );
}

export default ToastConfig;