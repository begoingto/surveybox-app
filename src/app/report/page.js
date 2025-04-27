import React from 'react';
import SBReport from "@/components/SBReport";


export const metadata = {
    title: 'Report ',
    description: 'A surveys report is a document that demonstrates all the important information about the surveys in an objective, clear, precise, and fact-based manner.',

}
function Page() {
    return (
        <>
          <SBReport/>
        </>
    );
}
export default Page;