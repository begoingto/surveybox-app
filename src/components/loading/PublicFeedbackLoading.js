import React from 'react';
import {Button, Rating} from "flowbite-react";
import Image from "next/image";
import SBFeedbackCard from "@/components/SBFeedbackCard";

function PublicFeedbackLoading() {
    return (
        <>
            <div className={"relative"}>
                <div className={"bg-no-repeat bg-gray-400 bg-cover animate-pulse"} >
                    <div className="max-w-screen-xl  mx-auto px-5 lg:px-0 py-20">
                        <div className="grid grid-cols-1  md:grid-cols-2 ">
                            <div className="self-center">
                                <div className={"flex flex-col justify-center items-center text-left text-white "}>
                                    <div>
                                        <div className={"justify-center flex"}>
                                            <div className={"w-80 mb-6 h-6 bg-white"}>
                                                <div className={"w-96 h-6 bg-white"}>

                                                </div>
                                            </div>
                                            <div className={"w-64 h-6 bg-white"}>

                                            </div>

                                        </div>
                                        <div className={"justify-center flex"}>
                                            <div className={"w-96 h-6 bg-white"}>

                                            </div>

                                        </div>

                                        <div className={"flex justify-center mt-10 gap-5"}>
                                            <div className="w-44 h-10 bg-gray-200 rounded-full dark:bg-gray-700"></div>

                                            <div className="w-44 h-10 bg-gray-200 rounded-full dark:bg-gray-700"></div>

                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div className={"order-1 sm:mt-3 "}  >
                                    <div width={100} height={100}
                                         className="flex  items-center justify-center w-full h-full  bg-gray-300 rounded dark:bg-gray-700">
                                        <svg className=" text-gray-200 h-full w-full "  xmlns="http://www.w3.org/2000/svg"
                                             aria-hidden="true"
                                             fill="currentColor" viewBox="0 0 640 512">
                                            <path
                                                d="M480 80C480 35.82 515.8 0 560 0C604.2 0 640 35.82 640 80C640 124.2 604.2 160 560 160C515.8 160 480 124.2 480 80zM0 456.1C0 445.6 2.964 435.3 8.551 426.4L225.3 81.01C231.9 70.42 243.5 64 256 64C268.5 64 280.1 70.42 286.8 81.01L412.7 281.7L460.9 202.7C464.1 196.1 472.2 192 480 192C487.8 192 495 196.1 499.1 202.7L631.1 419.1C636.9 428.6 640 439.7 640 450.9C640 484.6 612.6 512 578.9 512H55.91C25.03 512 .0006 486.1 .0006 456.1L0 456.1z"/>
                                        </svg>
                                    </div>
                                </div>                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={"max-w-screen-xl mx-auto px-5 lg:px-0"}>
                <div className={"justify-center flex animate-pulse"}>
                    <div className={"mt-10 w-80 h-9 bg-gray-400"}></div>
                </div>

                <div className="flex justify-center mt-4 gap-5 animate-pulse">
                    <div className="w-96 h-4 bg-gray-200 rounded dark:bg-gray-700"></div>
                    <div className="w-36 h-4 bg-gray-200 rounded dark:bg-gray-700"></div>

                </div>
                <div className={"justify-center flex mt-2 animate-pulse"}>
                    <div className="w-80 h-4 bg-gray-200 rounded dark:bg-gray-700"></div>
                    <div className="w-52 h-4 bg-gray-200 rounded dark:bg-gray-700"></div>
                </div>
                <div className={"justify-center flex mt-2 animate-pulse"}>
                    <div className="w-80 h-4 bg-gray-200 rounded dark:bg-gray-700"></div>
                    <div className="w-52 h-4 bg-gray-200 rounded dark:bg-gray-700"></div>
                </div>


                <div className="  ">
                    <div className={" mt-9 grid grid-cols-12 gap-5 animate-pulse"} >
                        <div className="col-span-12  md:col-span-6  lg:col-span-4">
                            <div className="p-4 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                                <div className="flex items-center space-x-4 ">
                                    <div className="flex-shrink-0">
                                        <Image className="w-10 h-10 rounded-full object-cover" unoptimized  src=
                                            "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Placeholder_view_vector.svg/681px-Placeholder_view_vector.svg.png"
                                               width={100} height={100}
                                               alt="Neil image"/>
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className={""}>
                                            <div className="font-bold w-36 h-5 mb-2 bg-gray-400 text-md  text-blue-800 truncate dark:text-white">

                                            </div>
                                        </div>
                                        <div>
                                            <p className="text-xs w-24 h-3 bg-gray-400 text-gray-500 truncate dark:text-gray-400">

                                            </p>
                                        </div>

                                    </div>
                                </div>
                                <div className="flex flex-row items-center mt-2  mb-2  justify-center">

                                </div>
                                <div className={"justify-center flex"}>
                                    <p className=" bg-gray-400 mb-3 h-2 w-72">
                                    </p>
                                </div>
                                <div className={"justify-center flex"}>
                                    <p className=" bg-gray-400 h-2 w-32">
                                    </p>
                                </div>


                            </div>

                        </div>
                        <div className="col-span-12  md:col-span-6  lg:col-span-4">
                            <div className="p-4 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                                <div className="flex items-center space-x-4 ">
                                    <div className="flex-shrink-0">
                                        <Image className="w-10 h-10 rounded-full object-cover" unoptimized  src=
                                            "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Placeholder_view_vector.svg/681px-Placeholder_view_vector.svg.png"
                                               width={100} height={100}
                                               alt="Neil image"/>
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className={""}>
                                            <div className="font-bold w-36 h-5 mb-2 bg-gray-400 text-md  text-blue-800 truncate dark:text-white">

                                            </div>
                                        </div>
                                        <div>
                                            <p className="text-xs w-24 h-3 bg-gray-400 text-gray-500 truncate dark:text-gray-400">

                                            </p>
                                        </div>

                                    </div>
                                </div>
                                <div className="flex flex-row items-center mt-2  mb-2  justify-center">

                                </div>
                                <div className={"justify-center flex"}>
                                    <p className=" bg-gray-400 mb-3 h-2 w-72">
                                    </p>
                                </div>
                                <div className={"justify-center flex"}>
                                    <p className=" bg-gray-400 h-2 w-32">
                                    </p>
                                </div>


                            </div>

                        </div>
                        <div className="col-span-12  md:col-span-6  lg:col-span-4">
                            <div className="p-4 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                                <div className="flex items-center space-x-4 ">
                                    <div className="flex-shrink-0">
                                        <Image className="w-10 h-10 rounded-full object-cover" unoptimized  src=
                                            "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Placeholder_view_vector.svg/681px-Placeholder_view_vector.svg.png"
                                               width={100} height={100}
                                               alt="Neil image"/>
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className={""}>
                                            <div className="font-bold w-36 h-5 mb-2 bg-gray-400 text-md  text-blue-800 truncate dark:text-white">

                                            </div>
                                        </div>
                                        <div>
                                            <p className="text-xs w-24 h-3 bg-gray-400 text-gray-500 truncate dark:text-gray-400">

                                            </p>
                                        </div>

                                    </div>
                                </div>
                                <div className="flex flex-row items-center mt-2  mb-2  justify-center">

                                </div>
                                <div className={"justify-center flex"}>
                                    <p className=" bg-gray-400 mb-3 h-2 w-72">
                                    </p>
                                </div>
                                <div className={"justify-center flex"}>
                                    <p className=" bg-gray-400 h-2 w-32">
                                    </p>
                                </div>


                            </div>

                        </div>
                        <div className="col-span-12  md:col-span-6  lg:col-span-4">
                            <div className="p-4 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                                <div className="flex items-center space-x-4 ">
                                    <div className="flex-shrink-0">
                                        <Image className="w-10 h-10 rounded-full object-cover" unoptimized  src=
                                            "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Placeholder_view_vector.svg/681px-Placeholder_view_vector.svg.png"
                                               width={100} height={100}
                                               alt="Neil image"/>
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className={""}>
                                            <div className="font-bold w-36 h-5 mb-2 bg-gray-400 text-md  text-blue-800 truncate dark:text-white">

                                            </div>
                                        </div>
                                        <div>
                                            <p className="text-xs w-24 h-3 bg-gray-400 text-gray-500 truncate dark:text-gray-400">

                                            </p>
                                        </div>

                                    </div>
                                </div>
                                <div className="flex flex-row items-center mt-2  mb-2  justify-center">

                                </div>
                                <div className={"justify-center flex"}>
                                    <p className=" bg-gray-400 mb-3 h-2 w-72">
                                    </p>
                                </div>
                                <div className={"justify-center flex"}>
                                    <p className=" bg-gray-400 h-2 w-32">
                                    </p>
                                </div>


                            </div>

                        </div>
                        <div className="col-span-12  md:col-span-6  lg:col-span-4">
                            <div className="p-4 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                                <div className="flex items-center space-x-4 ">
                                    <div className="flex-shrink-0">
                                        <Image className="w-10 h-10 rounded-full object-cover" unoptimized  src=
                                            "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Placeholder_view_vector.svg/681px-Placeholder_view_vector.svg.png"
                                               width={100} height={100}
                                               alt="Neil image"/>
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className={""}>
                                            <div className="font-bold w-36 h-5 mb-2 bg-gray-400 text-md  text-blue-800 truncate dark:text-white">

                                            </div>
                                        </div>
                                        <div>
                                            <p className="text-xs w-24 h-3 bg-gray-400 text-gray-500 truncate dark:text-gray-400">

                                            </p>
                                        </div>

                                    </div>
                                </div>
                                <div className="flex flex-row items-center mt-2  mb-2  justify-center">

                                </div>
                                <div className={"justify-center flex"}>
                                    <p className=" bg-gray-400 mb-3 h-2 w-72">
                                    </p>
                                </div>
                                <div className={"justify-center flex"}>
                                    <p className=" bg-gray-400 h-2 w-32">
                                    </p>
                                </div>


                            </div>

                        </div>
                        <div className="col-span-12  md:col-span-6  lg:col-span-4">
                            <div className="p-4 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                                <div className="flex items-center space-x-4 ">
                                    <div className="flex-shrink-0">
                                        <Image className="w-10 h-10 rounded-full object-cover" unoptimized  src=
                                            "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Placeholder_view_vector.svg/681px-Placeholder_view_vector.svg.png"
                                               width={100} height={100}
                                               alt="Neil image"/>
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className={""}>
                                            <div className="font-bold w-36 h-5 mb-2 bg-gray-400 text-md  text-blue-800 truncate dark:text-white">

                                            </div>
                                        </div>
                                        <div>
                                            <p className="text-xs w-24 h-3 bg-gray-400 text-gray-500 truncate dark:text-gray-400">

                                            </p>
                                        </div>

                                    </div>
                                </div>
                                <div className="flex flex-row items-center mt-2  mb-2  justify-center">

                                </div>
                                <div className={"justify-center flex"}>
                                    <p className=" bg-gray-400 mb-3 h-2 w-72">
                                    </p>
                                </div>
                                <div className={"justify-center flex"}>
                                    <p className=" bg-gray-400 h-2 w-32">
                                    </p>
                                </div>


                            </div>

                        </div>
                    </div>

                </div>

            </div>
        </>
    );
}

export default PublicFeedbackLoading;