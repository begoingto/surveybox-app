import React from 'react';
import Image from "next/image";
import {Tooltip} from "flowbite-react";
import Link from "next/link";
import {IoLayersSharp, IoSettingsSharp} from "react-icons/io5";
import {FaChartBar, FaQuestion, FaShareSquare} from "react-icons/fa";
import SBButtonsNavigation from "@/components/surveycreator/surveys/Utils/SBButtonsNavigation";
import {fileImgUrl} from "@/lib/fileBase";

function HorizontalCardItem({survey,onChange}) {
    return (
        <div className={"grid grid-cols-12 bg-gray-50 dark:bg-gray-800 dark:text-white shadow-md rounded-lg"}>
            <div className={"col-span-12 sm:col-span-4 relative overflow-hidden"}>
                <Link href={`/surveycreator/survey/setting-up/${survey.id}`}>
                    <p className={"text-white absolute -translate-x-1/2 -translate-y-1/2 top-4 left-1/2 text-lg font-medium bg-gray-900 bg-opacity-50 w-full text-center"}>{survey.surveyOption}</p>
                    <Image
                        className="rounded-t-lg sm:rounded-t-none sm:!rounded-l-lg w-full h-32 sm:h-full object-cover object-top"
                        unoptimized
                        src={survey.cover? fileImgUrl(survey.cover) : `/images/survey/${survey.surveyOption.toLowerCase()}.png`}
                        alt="survey image"
                        width={100}
                        height={100}
                        fetchPriority={"low"}
                    />
                </Link>
            </div>
            <div className={"col-span-12 sm:col-span-8 p-3 lg:p-5"}>
                <h5 className="text-lg lg:text-xl font-medium tracking-tight text-gray-900 dark:text-white text-ellipsis w-full h-16 overflow-hidden">
                    <Tooltip
                        style={"dark"}
                        content={survey.title ? survey.title : " Undefined title"}
                        placement="top"
                        tooltipmaxwidth={50}
                    >
                        <Link href={`/surveycreator/survey/setting-up/${survey.id}`}>
                            {survey.title ? survey.title : " Undefined title"}
                        </Link>
                    </Tooltip>

                </h5>
                <small className={"text-slate-500 dark:text-slate-500"}>
                    Date: {survey.startDate} to {survey.endDate}
                </small>
                <div className={"py-2 flex items-center justify-between"}>
                    <label className="relative inline-flex items-center cursor-pointer">
                        <input
                            type="checkbox"
                            checked={survey.status}
                            className="sr-only peer"
                            onChange={(e) => onChange(e,survey)}
                        />
                        <div
                            className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600">
                            <span className="ps-14 font-medium text-slate-500 dark:text-slate-500">
                                {survey.status ? "Active" : "Inactive"}
                            </span>
                        </div>
                    </label>
                    <div className="flex items-center">
                        <label htmlFor="default-checkbox" className="ml-2 text-sm font-medium text-slate-500 dark:text-slate-500">
                            Questions: {survey.surveyQuestions ? survey.surveyQuestions.length : 0}
                        </label>
                    </div>
                </div>
                <SBButtonsNavigation survey={survey} />
            </div>
        </div>
    );
}

export default HorizontalCardItem;