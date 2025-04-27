import React from 'react';
import {Accordion} from "flowbite-react";


function SbSurveyReportLoading() {
    return (
        <>
            <div className={"mt-10 flex justify-between animate-pulse"}>
                <div className="flex gap-5">
                    <div className="h-10 bg-gray-200 rounded dark:bg-gray-700 w-24"/>
                    <div className="h-10 bg-gray-200 rounded dark:bg-gray-700 w-24"/>
                </div>
                <div className={"flex gap-5"}>
                    <div className="h-10 bg-gray-200 rounded dark:bg-gray-700 w-24"/>
                    <div className="h-10 bg-gray-200 rounded dark:bg-gray-700 w-24"/>
                </div>
            </div>
            <Accordion flush={false} alwaysOpen={true} collapseAll={false} className="mt-6 text-center animate-pulse">
                {Array.from({length:5}).map((item, index) => (
                    <Accordion.Panel key={index}>
                        <Accordion.Title className={"bg-gray-200 rounded dark:bg-gray-700 w-full"}>
                            <div className="h-5"/>
                        </Accordion.Title>
                        <Accordion.Content>
                            <div className="h-64 bg-gray-200 rounded dark:bg-gray-700 w-full"/>
                        </Accordion.Content>
                    </Accordion.Panel>
                ))}
            </Accordion>
        </>
    );
}

export default SbSurveyReportLoading;