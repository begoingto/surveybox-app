import React from 'react';
import MainCompareContent from "@/app/surveycreator/survey/responses/MainCompareContent";

export const metadata = {
    title: "survey response report"
}

function Page({params}) {
    return <MainCompareContent params={params}/>;
}

export default Page;