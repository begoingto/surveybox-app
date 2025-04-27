import React from 'react';
import MainReportList from "@/app/surveycreator/survey/report/MainReportList";

export const metadata = {
    title: 'Report',
}
function Page({params}) {
    return (
       <MainReportList params={params} />
    );
}
export default Page;