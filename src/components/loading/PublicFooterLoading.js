import React from 'react';
import Link from "next/link";

function PublicFooterLoading() {
    return (
        <>
            <footer className={"py-20 px-5 sm:px-0"}>
                <div className="bottom-0 mx-auto max-w-screen-xl lg:py-1 ">
                    <div className="grid grid-cols-12 gap-4">
                        <div className="col-span-12 sm:col-span-3 self-center animate-pulse">
                            <div className="flex flex-col items-center ">
                                <div className={"w-32 h-28 bg-gray-200 rounded dark:bg-gray-700"}></div>
                                <h3 className="w-36 mt-3 h-10 bg-gray-200 rounded dark:bg-gray-700"></h3>
                            </div>
                        </div>
                        <div className="col-span-12 sm:col-span-9 animate-pulse">
                            <div
                                className="grid grid-cols-1 sm:grid-cols-2 gap-8 sm:gap-6 lg:grid-cols-4 justify-evenly">
                                <div>
                                    {/*<h2 className="mb-6 mr-4 text-sm font-semibold text-gray-900 uppercase dark:text-white">Feature</h2>*/}
                                    <h3 className="w-20 mb-6 mr-4 h-5 bg-gray-200 rounded dark:bg-gray-700"></h3>
                                    <ul className="text-gray-600 dark:text-gray-400 font-medium">
                                        <li className="mb-2">
                                            <div href="#"
                                                 className="w-12 h-5 bg-gray-200 rounded dark:bg-gray-700"></div>
                                        </li>
                                        <li className="mb-2">
                                            <div href="#" className="w-9 h-5 bg-gray-200 rounded dark:bg-gray-700">
                                            </div>
                                        </li>
                                        <li className="mb-2">
                                            <div href="#"
                                                 className="w-16 h-5 bg-gray-200 rounded dark:bg-gray-700"></div>
                                        </li>
                                        <li className="mb-2">
                                            <div href="#" className="w-32 h-5 bg-gray-200 rounded dark:bg-gray-700">
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                                <div>
                                    {/*<h2 className="mb-6 mr-4 text-sm font-semibold text-gray-900 uppercase dark:text-white">Feature</h2>*/}
                                    <h3 className="w-20 mb-6 mr-4 h-5 bg-gray-200 rounded dark:bg-gray-700"></h3>
                                    <ul className="text-gray-600 dark:text-gray-400 font-medium">
                                        <li className="mb-2">
                                            <div href="#"
                                                 className="w-12 h-5 bg-gray-200 rounded dark:bg-gray-700"></div>
                                        </li>
                                        <li className="mb-2">
                                            <div href="#" className="w-12 h-5 bg-gray-200 rounded dark:bg-gray-700">
                                            </div>
                                        </li>
                                        <li className="mb-2">
                                            <div href="#"
                                                 className="w-32 h-5 bg-gray-200 rounded dark:bg-gray-700"></div>
                                        </li>
                                        <li className="mb-2">
                                            <div href="#" className="w-36 h-5 bg-gray-200 rounded dark:bg-gray-700">
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                                <div>
                                    {/*<h2 className="mb-6 mr-4 text-sm font-semibold text-gray-900 uppercase dark:text-white">Feature</h2>*/}
                                    <h3 className="w-20 mb-6 mr-4 h-5 bg-gray-200 rounded dark:bg-gray-700"></h3>
                                    <ul className="text-gray-600 dark:text-gray-400 font-medium">
                                        <li className="mb-2">
                                            <div href="#"
                                                 className="w-28 h-5 bg-gray-200 rounded dark:bg-gray-700"></div>
                                        </li>
                                        <li className="mb-2">
                                            <div href="#" className="w-32 h-5 bg-gray-200 rounded dark:bg-gray-700">
                                            </div>
                                        </li>
                                        <li className="mb-2">
                                            <div href="#"
                                                 className="w-36 h-5 bg-gray-200 rounded dark:bg-gray-700"></div>
                                        </li>

                                    </ul>
                                </div>
                                <div>
                                    <h2 className="mb-6 w-28 mr-4 h-5 bg-gray-200 rounded dark:bg-gray-700"></h2>
                                    <ul className="text-gray-600 dark:text-gray-400 font-medium">
                                        <li className="mb-2">
                                            <Link href="#"
                                                  className="inline-flex items-center">
                                                <div className="flex gap-2">
                                                    <div className="w-4 h-5 bg-gray-200 rounded dark:bg-gray-700"></div>
                                                    <div
                                                        className="w-24 h-4 bg-gray-200 rounded dark:bg-gray-700"></div>
                                                </div>

                                            </Link>
                                        </li>
                                        <li className="mb-2">
                                            <div className="flex gap-2">
                                                <div className="w-4 h-5 bg-gray-200 rounded dark:bg-gray-700"></div>
                                                <div className="w-20 h-4 bg-gray-200 rounded dark:bg-gray-700"></div>
                                            </div>
                                        </li>
                                        <li className="mb-2">
                                            <div className="flex gap-2">
                                                <div className="w-4 h-5 bg-gray-200 rounded dark:bg-gray-700"></div>
                                                <div className="w-16 h-4 bg-gray-200 rounded dark:bg-gray-700"></div>
                                            </div>
                                        </li>
                                        <li className="mb-2">
                                            <div className="flex gap-2">
                                                <div className="w-4 h-5 bg-gray-200 rounded dark:bg-gray-700"></div>
                                                <div className="w-28 h-4 bg-gray-200 rounded dark:bg-gray-700"></div>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
            <hr/>
            <p className={"py-3 text-center"}>
                © 2023 SurveyBox | . All rights reserved.
            </p>
        </>
    );
}

export default PublicFooterLoading;