import React from 'react';
import SBQuestionLoadingItem from "@/components/loading/SBQuestionLoadingItem";

function SbQuestionLoading() {
    return (
        <>
            <section className="xl:px-0 animate-pulse">
                <div className="flex text-2xl mt-16 mb-2.5 items-center text-center justify-center dark:text-blue-600">
                    <div className="w-2/4 h-7 bg-gray-200 rounded dark:bg-gray-700"></div>
                </div>
                <div className="flex gap-2 items-center text-center justify-center">
                    <div className="w-14 h-5 bg-gray-200 rounded dark:bg-gray-700"></div>
                    <div className="w-44 h-5 bg-gray-200 rounded dark:bg-gray-700"></div>
                    <div className="w-20 h-5 bg-gray-200 rounded dark:bg-gray-700"></div>
                </div>

                <div className={"flex justify-between"}>
                    <div className="w-24 h-10 bg-gray-200 rounded dark:bg-gray-700"></div>
                    <div className="w-24 h-10 bg-gray-200 rounded dark:bg-gray-700"></div>
                </div>

                <div className="w-full h-20 bg-gray-200 rounded-lg my-6 dark:bg-gray-700"></div>
            </section>

            <SBQuestionLoadingItem />
            <SBQuestionLoadingItem />
            <SBQuestionLoadingItem />
        </>
    );
}

export default SbQuestionLoading;