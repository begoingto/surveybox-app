import React from 'react';
import {Card} from "flowbite-react";
import {FaDatabase, FaFilePdf, FaRegFilePdf} from "react-icons/fa";
import {MdDashboard, MdOutlineSpaceDashboard} from "react-icons/md";

import {AiTwotoneFilePdf} from "react-icons/ai";
import {TbReportAnalytics} from "react-icons/tb";

function SBCardDataConcluding(props) {
    return (

        <>
            <h1 className={"text-3xl flex justify-center text-white text-center mb-5"}>Data concluding</h1>
            <div className="w-44 mx-auto flex items-center justify-center bg-white rounded-full h-1.5 mb-10 ">
                <div className="bg-white text-center rounded-full dark:bg-white"></div>
            </div>
            <div className="sm:bg-cyan-700  border-0 p-10 rounded-lg">
                <ul className="grid grid-cols-1 sm:grid-cols-3 gap-10 sm:gap-5">
                    <li className=" flex flex-col dark:!bg-cyan-900 items-center justify-center rounded-lg bg-gray-50 p-3 text-base font-bold text-black"
                        data-aos="flip-left"
                        data-aos-easing="ease-out-cubic"
                    >
                              <TbReportAnalytics size={'3rem'} className="m-5 text-blue-400"/>
                            <span className=" uppercase text-cyan-700 dark:text-white">results</span>
                    </li>
                    <li  className="w-full flex flex-col dark:!bg-cyan-900 items-center justify-center rounded-lg bg-gray-50 p-3 text-base font-bold text-black"
                         data-aos="flip-left"
                         data-aos-easing="ease-out-cubic"
                    >
                                <span>
                                  <MdOutlineSpaceDashboard size={'3rem'} className="m-5 text-orange-400"/>
                                </span>
                            <span className="uppercase text-center dark:text-white text-red-400" >dashboard</span>
                    </li>
                    <li className="w-full flex flex-col dark:!bg-cyan-900 items-center justify-center rounded-lg bg-gray-50 p-3 text-base font-bold text-black"
                        data-aos="flip-left"
                        data-aos-easing="ease-out-cubic"
                    >
                        <span>
                          <FaRegFilePdf size={'2.5rem'} className="m-5 text-gray-500"/>
                        </span>
                        <span className="uppercase text-center dark:text-white ">PDF & CSV</span>
                    </li>
                </ul>
            </div>
        </>
    );
}

export default SBCardDataConcluding;