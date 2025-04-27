import React from 'react';
import MainThemeContent from "@/app/surveycreator/survey/theme/MainThemeContent";


export const metadata ={
    title: "Survey theme view"
}

function Page({params}) {
    return (<MainThemeContent params={params} />);
}

export default Page;