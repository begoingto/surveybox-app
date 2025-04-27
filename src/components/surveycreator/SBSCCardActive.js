import React from 'react';
import {Card, Progress} from "flowbite-react";
import {FaClipboardList, FaQuestionCircle, FaUserFriends} from "react-icons/fa";

function SBSCCardActive({ totalSurveys = 0, totalVotes = 0, totalQuestions = 0 }) {
    return (
        <div className={"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"}>
            <Card>
                <div className=" flex flex-row font-normal text-gray-700 dark:text-gray-400">
                    <FaClipboardList size={"2.5rem"} className={"p-2 text-cyan-600 border-2 rounded border-gray-300 dark:border-gray-700"}/>
                    <span className="ml-3 self-center font-medium uppercase">Total Survey</span>
                </div>
                <div>
                    <p className=" font-medium  ">{totalSurveys}</p>
                    <Progress className={"mt-5"}
                              color="blue"
                              progress={totalSurveys}
                              size="md"
                    />
                </div>
            </Card>
            <Card>
                <div className=" flex flex-row font-normal text-gray-700 dark:text-gray-400">
                    <FaUserFriends size={"2.5rem"} className={"p-2 text-green-400 border-2 rounded border-gray-300 dark:border-gray-700"}/>
                    <span className="ml-3 self-center font-medium uppercase fon">Total Vote</span>
                </div>
                <div>
                    <p className=" font-medium ">{totalVotes}</p>
                    <Progress className={"mt-5"}
                              color="green"
                              progress={totalVotes}
                              size="md"
                    />
                </div>
            </Card>
            <Card className={"md:col-span-2 lg:col-span-1"}>
                <div className=" flex flex-row font-normal text-gray-700 dark:text-gray-400">
                    <FaQuestionCircle size={"2.5rem"} className={"p-2 text-purple-600 border-2 rounded border-gray-300 dark:border-gray-700"}/>
                    <span className="ml-3 self-center  font-medium uppercase">Total Question</span>
                </div>
                <div>
                    <p className="font-medium">{totalQuestions}</p>
                    <Progress className={"mt-5"}
                              color="yellow"
                              progress={totalQuestions}
                              size="md"
                    />
                </div>
            </Card>
        </div>

    );
}

export default SBSCCardActive;