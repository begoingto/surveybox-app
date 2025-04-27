"use client"
import React from 'react';
import {Card} from "flowbite-react";
import {FaEye} from "react-icons/fa";
import Link from "next/link";

function SBSCCardRecentSurvey({survey}) {
    return (
        <Link
            href={`/surveycreator/survey/setting-up/${survey.id}`}
            className={"col-span-12 md:col-span-6"}
        >
            <Card
                className={"hover:bg-gray-50 hover:cursor-pointer transform hover:scale-95 transition-transform duration-300 ease-in-out"}
            >
                <div className="flex justify-between">
                    <h5 className="mb-2 text-lg font-medium text-gray-600 dark:text-white text-ellipsis w-full h-16 overflow-hidden">
                        {survey.title}
                    </h5>
                    <FaEye className={" w-5 h-5 text-gray-500 "}/>
                </div>
                <div className="mb-2  text-gray-500 dark:text-gray-400">
                   <p>{survey.startDate}-{survey.endDate}</p>
                </div>
            </Card>
        </Link>
    );
}

export default SBSCCardRecentSurvey;