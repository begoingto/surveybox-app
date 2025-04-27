import React from 'react';
import SBSettingForm from "@/app/surveycreator/survey/setting-up/SBSettingForm";

export const metadata = {
    title: 'Setting-Up',
}
function Page({params}) {
    return (
           <SBSettingForm params={params}/>
    );
}

export default Page;