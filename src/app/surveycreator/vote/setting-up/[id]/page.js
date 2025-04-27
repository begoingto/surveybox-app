import React from 'react';
import FormVoteUpdate from "@/app/surveycreator/vote/setting-up/FormVoteUpdate";

export const metadata = {
    title: 'Setting',
}
function Page({params}) {
    return (<FormVoteUpdate params={params}/> );
}

export default Page;