'use client'
import React, {useEffect} from 'react';
import SBBreadcrumb from "@/components/admin/SBBreadcrumb";
import SBSCCardActive from "@/components/surveycreator/SBSCCardActive";
import SBSLineChart from "@/app/admin/dashboard/SBSLineChart";
import {useLazyGetDashboardQuery} from "@/store/feature/dashborad/dashboardSlice";
import {useSession} from "next-auth/react";
import DashboardLoading from "@/components/loading/adminLoading/DashboardLoading";
import SurveyVoteMonthlyChart from "@/app/admin/dashboard/SurveyVoteMonthlyChart";

function Page() {
    const {data:session,status}=useSession()
    const [fetchDashboard,{ data: res, isLoading, error }] = useLazyGetDashboardQuery();

    useEffect(() => {
        if (session){
            fetchDashboard()
        }
    },[fetchDashboard,session])

    if (status === 'loading') {
        return <DashboardLoading/>;
    }
    return (
        <>
            {/*<SBBreadcrumb />*/}
            <div>
                <SBSCCardActive
                    totalQuestions={res?.data?.totalQuestions}
                    totalSurveys={res?.data?.totalSurveys}
                        totalVotes={res?.data?.totalVotes}/>
            </div>
            <SurveyVoteMonthlyChart />
            {/*<SBSLineChart/>*/}
        </>
    );
}



export default Page;


