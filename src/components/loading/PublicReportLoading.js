import React from 'react';
import {Card} from "flowbite-react";
import {TbReportAnalytics} from "react-icons/tb";
import {MdOutlineSpaceDashboard} from "react-icons/md";
import {FaRegFilePdf} from "react-icons/fa";

function PublicReportLoading() {
    return (
        <>
            <section
                className={"px-5 lg:px-0 bg-cover bg-center bg-no-repeat bg-[url('/images/home/bg-vector-home.svg')]"}>
                <div className={"max-w-screen-xs lg:max-w-screen-xl mx-auto px-5 sm:px-0 py-14 md:py-36"}>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center animate-pulse">
                        <div>
                            <div className="max-w-md mx-auto">
                                <div className={"flex items-center flex-col gap-5 sm:items-start"}>
                                    <div className="w-44 h-10 bg-gray-200 rounded dark:bg-gray-700"></div>
                                    <div className="w-full h-7 bg-gray-200 rounded dark:bg-gray-700"></div>
                                    <div className="w-full h-4 bg-gray-200 rounded dark:bg-gray-700"></div>
                                    <div className="w-full h-4 bg-gray-200 rounded dark:bg-gray-700"></div>
                                    <div className="flex gap-5">
                                        <div className="w-52 h-4 bg-gray-200 rounded dark:bg-gray-700"></div>
                                        <div className="w-36 h-4 bg-gray-200 rounded dark:bg-gray-700"></div>
                                    </div>
                                    <div className="w-44 h-10 bg-gray-200 rounded-full dark:bg-gray-700"></div>
                                </div>
                            </div>
                        </div>
                        <div className={"order-1"}>
                            <div
                                className="flex items-center justify-center w-full h-96 bg-gray-300 rounded dark:bg-gray-700">
                                <svg className="w-12 h-12 text-gray-200" xmlns="http://www.w3.org/2000/svg"
                                     aria-hidden="true"
                                     fill="currentColor" viewBox="0 0 640 512">
                                    <path
                                        d="M480 80C480 35.82 515.8 0 560 0C604.2 0 640 35.82 640 80C640 124.2 604.2 160 560 160C515.8 160 480 124.2 480 80zM0 456.1C0 445.6 2.964 435.3 8.551 426.4L225.3 81.01C231.9 70.42 243.5 64 256 64C268.5 64 280.1 70.42 286.8 81.01L412.7 281.7L460.9 202.7C464.1 196.1 472.2 192 480 192C487.8 192 495 196.1 499.1 202.7L631.1 419.1C636.9 428.6 640 439.7 640 450.9C640 484.6 612.6 512 578.9 512H55.91C25.03 512 .0006 486.1 .0006 456.1L0 456.1z"/>
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className={"h-full bg-cover bg-center bg-fixed"}>
                <div className="bg-cyan-900 relative mt-40">
                    <div className={" max-w-screen-xl mx-auto pb-48 "}>
                        {/*<SbCardReport/>*/}
                        <div className="max-w-screen-xl mx-auto px-5 md:px-0 my-32">
                            <div
                                className="flex flex-col sm:grid sm:grid-cols-2 md:flex md:flex-row gap-10 items-center justify-evenly md:pt-32">
                                <Card
                                    className={"-mt-32 md:-mt-52 sm:col-span-2 dark:bg-gray-900 border-0 shadow-md border-t-4 border-t-blue-700 dark:border-t-blue-400"}>
                                    <div className="flex flex-col items-center p-2 animate-pulse">
                                        <div
                                            alt="image"
                                            className="mb-3 w-24 h-24 bg-gray-200 rounded-full  shadow-lg"
                                            height="96"
                                            width="96"
                                        ></div>
                                        <div
                                            className="mb-1 w-36 h-6 bg-gray-200 font-medium text-gray-900 dark:text-white uppercase">
                                        </div>
                                        <div className=" w-40 h-3 bg-gray-200 mt-3 mb-3">
                                        </div>
                                        <div className=" w-40 h-3 bg-gray-200 ">
                                        </div>
                                    </div>
                                </Card>
                                <Card
                                    className={"md:-mt-52 dark:bg-gray-900 border-0 shadow-md border-t-4 border-t-red-700 dark:border-t-red-400"}>
                                    <div className="flex flex-col items-center p-2 animate-pulse">
                                        <div
                                            alt="image"
                                            className="mb-3 w-24 h-24 bg-gray-200 rounded-full  shadow-lg"
                                            height="96"
                                            width="96"
                                        ></div>
                                        <div
                                            className="mb-1 w-36 h-6 bg-gray-200 font-medium text-gray-900 dark:text-white uppercase">
                                        </div>
                                        <div className=" w-40 h-3 bg-gray-200 mt-3 mb-3">
                                        </div>
                                        <div className=" w-40 h-3 bg-gray-200 ">
                                        </div>
                                    </div>
                                </Card>
                                <Card
                                    className={"md:-mt-52 dark:bg-gray-900 border-0 shadow-md border-t-4 border-t-green-700 dark:border-t-green-400\""}>
                                    <div className="flex flex-col items-center p-2 animate-pulse">
                                        <div
                                            alt="image"
                                            className="mb-3 w-24 h-24 bg-gray-200 rounded-full  shadow-lg"
                                            height="96"
                                            width="96"
                                        ></div>
                                        <div
                                            className="mb-1 w-36 h-6 bg-gray-200 font-medium text-gray-900 dark:text-white uppercase">
                                        </div>
                                        <div className=" w-40 h-3 bg-gray-200 mt-3 mb-3">
                                        </div>
                                        <div className=" w-40 h-3 bg-gray-200 ">
                                        </div>
                                    </div>
                                </Card>
                            </div>
                        </div>
                        {/*<SbCardReport/>*/}
                        {/*<SBCardDataConcluding/>*/}
                        <>
                            <div className={" flex justify-center "}>
                                <div className={"w-60 h-9 bg-gray-400 mb-5"}>
                                </div>
                            </div>
                            <div
                                className="w-44 mx-auto flex items-center justify-center bg-white rounded-full h-1.5 mb-10 ">
                                <div className="bg-white text-center rounded-full dark:bg-white"></div>
                            </div>
                            <div className="sm:bg-cyan-700  border-0 p-10 rounded-lg">
                                <ul className="grid grid-cols-1 sm:grid-cols-3 gap-10 sm:gap-5">
                                    <li className=" flex flex-col dark:!bg-cyan-900 items-center animate-pulse justify-center rounded-lg bg-gray-50 p-3 text-base font-bold text-black">
                                        <MdOutlineSpaceDashboard style={{color: "#F9FAFB"}} size={'3rem'} className="m-5 text-blue-400"/>
                                        <span style={{color: "#F9FAFB"}} className=" uppercase text-cyan-700 dark:text-white">PDF</span>
                                    </li>
                                    <li className="w-full flex flex-col dark:!bg-cyan-900 items-center animate-pulse justify-center rounded-lg bg-gray-50 p-3 text-base font-bold text-black">
                                <span>
                                  <TbReportAnalytics  style={{color: "#F9FAFB"}} size={'3rem'} className="m-5 block text-orange-400"/>
                                </span>
                                        <span style={{color: "#F9FAFB"}}
                                            className="uppercase text-center dark:text-white  text-red-400">PDF</span>
                                    </li>
                                    <li className="w-full flex flex-col dark:!bg-cyan-900 items-center animate-pulse  justify-center rounded-lg bg-gray-50 p-3 text-base font-bold text-black">
                        <span>
                          <FaRegFilePdf style={{color: "#F9FAFB"}} size={'2.5rem'} className="m-5 text-white"/>
                        </span>
                                        <span style={{color: "#F9FAFB"}} className="uppercase text-center text-white  ">PDF & CSV</span>
                                    </li>
                                </ul>
                            </div>
                        </>
                        {/*<SBCardDataConcluding/>*/}
                    </div>
                </div>
            </section>

            {/*Section for chart reports*/}
            {/*5*/}
            <section
                className={"px-5 lg:px-0 bg-cover bg-center bg-no-repeat "}>
                <div className={"max-w-screen-xs lg:max-w-screen-xl mx-auto px-5 sm:px-0 py-14 md:py-36"}>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center animate-pulse">
                        <div>
                            <div className="max-w-md mx-auto">
                                <div className={"flex items-center flex-col gap-5 sm:items-start"}>
                                    <div className="w-44 h-10 bg-gray-200 rounded dark:bg-gray-700"></div>
                                    <div className="w-full h-7 bg-gray-200 rounded dark:bg-gray-700"></div>
                                    <div className="w-full h-4 bg-gray-200 rounded dark:bg-gray-700"></div>
                                    <div className="w-full h-4 bg-gray-200 rounded dark:bg-gray-700"></div>
                                    <div className="flex gap-5">
                                        <div className="w-52 h-4 bg-gray-200 rounded dark:bg-gray-700"></div>
                                        <div className="w-36 h-4 bg-gray-200 rounded dark:bg-gray-700"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={"order-1"}>
                            <div
                                className="flex items-center justify-center w-full h-96 bg-gray-300 rounded dark:bg-gray-700">
                                <svg className="w-12 h-12 text-gray-200" xmlns="http://www.w3.org/2000/svg"
                                     aria-hidden="true"
                                     fill="currentColor" viewBox="0 0 640 512">
                                    <path
                                        d="M480 80C480 35.82 515.8 0 560 0C604.2 0 640 35.82 640 80C640 124.2 604.2 160 560 160C515.8 160 480 124.2 480 80zM0 456.1C0 445.6 2.964 435.3 8.551 426.4L225.3 81.01C231.9 70.42 243.5 64 256 64C268.5 64 280.1 70.42 286.8 81.01L412.7 281.7L460.9 202.7C464.1 196.1 472.2 192 480 192C487.8 192 495 196.1 499.1 202.7L631.1 419.1C636.9 428.6 640 439.7 640 450.9C640 484.6 612.6 512 578.9 512H55.91C25.03 512 .0006 486.1 .0006 456.1L0 456.1z"/>
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/*    This section for History report*/}
            <section
                className={"px-5 lg:px-0 bg-cover bg-center bg-no-repeat "}>
                <div
                    className={"max-w-screen-xs  lg:max-w-screen-xl mx-auto px-5 sm:px-0 py-14 md:py-36 animate-pulse"}>
                    <div className="flex flex-col-reverse md:grid md:grid-cols-2 gap-10 my-10">
                        <div>
                            <div
                                className=" items-center justify-center w-full h-96 bg-gray-300 rounded dark:bg-gray-700">
                                <div
                                    className=" flex items-center justify-center w-full h-96 bg-gray-300 rounded dark:bg-gray-700">
                                    <svg className="w-12 h-12 text-gray-200" xmlns="http://www.w3.org/2000/svg"
                                         aria-hidden="true"
                                         fill="currentColor" viewBox="0 0 640 512">
                                        <path
                                            d="M480 80C480 35.82 515.8 0 560 0C604.2 0 640 35.82 640 80C640 124.2 604.2 160 560 160C515.8 160 480 124.2 480 80zM0 456.1C0 445.6 2.964 435.3 8.551 426.4L225.3 81.01C231.9 70.42 243.5 64 256 64C268.5 64 280.1 70.42 286.8 81.01L412.7 281.7L460.9 202.7C464.1 196.1 472.2 192 480 192C487.8 192 495 196.1 499.1 202.7L631.1 419.1C636.9 428.6 640 439.7 640 450.9C640 484.6 612.6 512 578.9 512H55.91C25.03 512 .0006 486.1 .0006 456.1L0 456.1z"/>
                                    </svg>
                                </div>
                            </div>
                        </div>
                        <div className="self-center ">
                            <div className="max-w-md mx-auto ">
                                <div className={"flex items-center flex-col gap-5 sm:items-start"}>
                                    <div className="w-44 h-10 bg-gray-200 rounded dark:bg-gray-700"></div>
                                    <div className="w-full h-4 bg-gray-200 rounded dark:bg-gray-700"></div>
                                    <div className="w-full h-4 bg-gray-200 rounded dark:bg-gray-700"></div>
                                    <div className="w-full h-4 bg-gray-200 rounded dark:bg-gray-700"></div>
                                    <div className="flex gap-5">
                                        <div className="w-52 h-4 bg-gray-200 rounded dark:bg-gray-700"></div>
                                        <div className="w-36 h-4 bg-gray-200 rounded dark:bg-gray-700"></div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </>
    );
}

export default PublicReportLoading;