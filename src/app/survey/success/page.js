import React from 'react';
import MainResponseSuccess from "@/app/survey/success/MainResponseSuccess";

export const metadata = {
    title: 'Thank you for your response',
    openGraph: {
        title: 'Thank you for your response',
    }
}

function Page({searchParams}) {

    return (<MainResponseSuccess searchParams={searchParams} />);
}

export default Page;