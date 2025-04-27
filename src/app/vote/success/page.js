import React from 'react';
import MainResponseSuccess from "@/app/vote/success/MainResponseSuccess";

export const metadata = {
    title: 'Thank you for your response',
    openGraph: {
        title: 'Thank you for your response',
    }
}

function Page() {

    return (<MainResponseSuccess />);
}

export default Page;