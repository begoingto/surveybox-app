import React from 'react';
import SBShare from "@/app/surveycreator/survey/share/SBShare";
export const metadata = {
    title: 'Share',
}
function Page({params}) {
    return (
      <SBShare params={params}/>
    );
}
export default Page;