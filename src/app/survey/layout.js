'use client'
import React, {useLayoutEffect} from 'react';

function Layout({children}) {

    useLayoutEffect(() => {
        document.body.className = `dark:bg-gray-900 bg-gray-100 dark:text-white text-gray-900 bg-[url('/images/response/table-note.jpg')] bg-no-repeat bg-cover h-[100vh]`
    });

    return (
        <>
            {children}
        </>
    );
}

export default Layout;