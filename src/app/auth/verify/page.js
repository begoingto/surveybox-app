import React from 'react';
import SBVerity from "@/app/auth/verify/SBVerity";

const desc ="Welcome to SurveyBox, please click button below to fill your Information";
export const metadata = {
    title: 'Verify',
    description: desc,
}
function Page() {
    return (
       <SBVerity/>
    );
}
export default Page;