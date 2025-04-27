"use client"
import React, {useEffect} from 'react';
import {FaUndoAlt} from "react-icons/fa";
import {useTheme} from "flowbite-react";
import SBSCCardRecentSurvey from "@/components/surveycreator/SBSCCardRecentSurvey";
import SBSCCardActive from "@/components/surveycreator/SBSCCardActive";
import SBSCBarChart from "@/components/surveycreator/SBSCBarChart";
import {useLazyGetDashboardQuery} from "@/store/feature/dashborad/dashboardSlice";
import {useLazyGetSurveyQuery} from "@/store/feature/survey/surveyApiSlice";
import SbscDashboardLoading from "@/components/loading/surveycreatorloading/SBSCDashboardLoading";
import SBHandleContent from "@/components/surveycreator/SBHandleContent";
import {useSelector} from "react-redux";
import {selectCurrentUser} from "@/store/feature/auth/AuthSlice";
import {getFullName} from "@/lib/siteConfig";
import {useSession} from "next-auth/react";

function SBDashboardContent() {
    const {data: session,status} = useSession()
    const theme = useTheme()
    const auth = useSelector(selectCurrentUser)
    // Fetch data from API
    const [fetchDashboard,{ data: res, isLoading, error }] = useLazyGetDashboardQuery();
    const [fetchSurveys,{ data: surveyRes, isLoading: sLoading }] = useLazyGetSurveyQuery();

    useEffect(() => {
        if (session){
            fetchDashboard()
            fetchSurveys({ page: 1, limit: 4,filters: null})
        }
    },[fetchDashboard, fetchSurveys, auth, session])

    return (
        <SBHandleContent
            isLoading={isLoading || sLoading || status==='loading'}
            error={error}
            customLoadingContent={<SbscDashboardLoading/>}
        >
            <section className={"px-2 lg:-0"}>

                <h1 className={"text-2xl 2xl:text-3xl font-medium py-3 text-center text-cyan-500"}>Hello {auth? getFullName(auth) : ""}, Welcome to Surveybox new evaluation of survey technology.</h1>
                <p className={"text-slate-400 text-center sm:text-lg md:text-xl lg:text-xls"}>
                    Allows you to measure the effectiveness and impact of your surveys. With this feature, you can easily access data on response rates, satisfaction scores, feedback themes, and more. Thank you for choosing Surveybox and we hope you enjoy.
                </p>

                <br/>
                <div className={"flex my-5"}>
                    <FaUndoAlt className={"h-5 w-5 mr-2 text-cyan-600"}/>
                    Recent Survey
                </div>

                <div className={"grid grid-cols-12 gap-4 mb-5"}>
                    {surveyRes?.data?.list.map((survey) => (
                        <SBSCCardRecentSurvey
                            key={survey.id}
                            survey={survey}
                        />
                    ))}
                </div>

                <SBSCCardActive
                    totalQuestions={res?.data?.totalQuestions}
                    totalSurveys={res?.data?.totalSurveys}
                    totalVotes={res?.data?.totalVotes}
                />

                <div>
                    <SBSCBarChart theme={theme.mode}/>
                </div>
            </section>
        </SBHandleContent>
    )
}

export default SBDashboardContent;