import React from 'react';

function SbscavTabLoading() {
    return (
        <>
            <div className={"bg-opacity-75 dark:bg-opacity-75 bg-white dark:bg-gray-900 dark:text-white flex justify-center sticky top-[55px] left-0 z-40"}>
                <div className="border-b border-gray-200 dark:border-gray-700 ">
                    <ul className="flex lg:justify-center  text-sm font-medium text-center text-gray-500 dark:text-gray-400 overflow-x-auto animate-pulse">
                        <li>
                            <div
                                  className={" inline-flex p-4 rounded-t-lg group " }
                                  aria-current="page">
                                <div className="w-5 h-5 bg-gray-200 mr-2"/>
                                <span className={"hidden md:inline bg-gray-200 w-24 h-4 "}></span>
                            </div>
                        </li>
                        <li>
                            <div
                                  className={"inline-flex p-4 rounded-t-lg group " }>
                                <div className="w-5 h-5 bg-gray-200 mr-2"/>
                                <span className={"hidden md:inline bg-gray-200 w-16 h-4 "}></span>
                            </div>
                        </li>
                        <li>
                            <div
                                  className={"inline-flex p-4 rounded-t-lg group " }>
                                <div className="w-5 h-5 bg-gray-200 mr-2"/>
                                <span className={"hidden md:inline bg-gray-200 w-12 h-4 "}></span>
                            </div>
                        </li>
                        <li>
                            <div
                                  className={"inline-flex p-4 rounded-t-lg group " }>
                                <div className="w-5 h-5 bg-gray-200 mr-2"/>
                                <span className={"hidden md:inline bg-gray-200 w-16 h-4 "}></span>

                            </div>
                        </li>
                        <li>
                            <div
                                  className={"inline-flex p-4 rounded-t-lg group " }>
                                <div className="w-5 h-5 bg-gray-200 mr-2"/>
                                <span className={"hidden md:inline bg-gray-200 w-24 h-4 "}></span>
                            </div>
                        </li>
                        <li>
                            <div
                                  className={"inline-flex p-4 rounded-t-lg group "}>
                                <div className="w-5 h-5 bg-gray-200 mr-2"/>
                                <span className={"hidden md:inline bg-gray-200 w-16 h-4 "}></span>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>

        </>
    );
}

export default SbscavTabLoading;