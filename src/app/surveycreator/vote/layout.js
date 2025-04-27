import React from 'react';
import VoteLayoutProvider from "@/app/surveycreator/vote/VoteLayoutProvider";

export const metadata = {
    title: {
        template: '%s - VOTE'
    },
}
function Layout({children}) {
    return (
        <VoteLayoutProvider>
            {children}
        </VoteLayoutProvider>
    );
}

export default Layout;