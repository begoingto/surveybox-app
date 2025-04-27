import React from 'react';
import Image from "next/image";
import Link from "next/link";
import SBButtonsNavigation from "@/components/surveycreator/surveys/Utils/SBButtonsNavigation";
import {fileImgUrl} from "@/lib/fileBase";

function SBSCCard({survey, onChange}) {
    return (
        <div>
            <div className="h-full bg-gray-50 border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 ">
                <Link href={`/surveycreator/survey/setting-up/${survey.id}`} className={"flex h-56 items-center relative"}>
                    <p className={"text-white absolute -translate-x-1/2 -translate-y-1/2 top-4 left-1/2 text-lg font-medium bg-gray-900 bg-opacity-50 w-full text-center"}>{survey.surveyOption}</p>

                    <Image
                        className="rounded-t-lg w-full h-full object-cover object-top"
                        unoptimized
                        src={survey.cover ? fileImgUrl(survey.cover) :`/images/survey/${survey.surveyOption.toLowerCase()}.png`}
                        alt="survey image"
                        width={100}
                        height={100}
                        fetchPriority={"low"}
                    />
                </Link>
                <div>
                    <div className="p-3">
                        <Link href={`/surveycreator/survey/setting-up/${survey.id}`}>
                            <h5 className="pb-2 text-lg font-medium tracking-tight text-gray-900 dark:text-white text-ellipsis w-full h-16 overflow-hidden">
                                {survey.title ? survey.title : " Undefined title"}
                            </h5>
                            <div className="flex items-center justify-between">
                                <small>
                                    Date : {survey.startDate} to {survey.endDate}
                                </small>
                            </div>
                        </Link>
                    </div>
                    <div
                        className="px-6 py-4 flex items-center justify-between border-t border-t-gray-400 border-b border-b-gray-400">
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input
                                type="checkbox"
                                checked={survey.status}
                                className="sr-only peer"
                                onChange={(e) => onChange(e,survey)}
                            />
                            <div
                                className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300
                            dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:after:translate-x-full
                            peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px]
                            after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5
                            after:transition-all dark:border-gray-600 peer-checked:bg-blue-600">
                                <span className="ps-14 font-medium text-blue-700 dark:text-gray-300">
                                    {survey.status ? "Active" : "Inactive"}
                                </span>
                            </div>
                        </label>
                        <div className="flex items-center">
                            <label htmlFor="default-checkbox" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                                Questions: {survey.surveyQuestions ? survey.surveyQuestions.length : 0}
                            </label>
                        </div>
                    </div>
                </div>
                <div className="pb-3">
                    <SBButtonsNavigation survey={survey} />
                </div>
            </div>
        </div>
    );
}

export default SBSCCard;