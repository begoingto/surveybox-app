import React from 'react';
import '../../style.css';
import VResult from "@/app/surveycreator/vote/result/VResult";
import {TableVoteUser} from "@/app/surveycreator/vote/result/TableVoteUser";

export const metadata = {
    title: 'Result',
}
function Page({ params }) {
    return (
        <>
            <VResult params={params} />
        </>
    );
}
export default Page;

