import React from 'react';
import VShare from "@/app/surveycreator/vote/share/VShare";
export const metadata = {
    title: 'Share',
}
 function Page({params}) {
    return (
        <VShare params={params}/>
    );

}
export default Page;

