import React, {useEffect, useState} from 'react';
import {useLazyGetAdminMonthlyQuery} from "@/store/feature/dashborad/dashboardSlice";
import {LineChartLoading} from "@/components/loading/surveycreatorloading/SBSCDashboardLoading";
import dynamic from "next/dynamic";
import {useTheme} from "flowbite-react";
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

function SurveyVoteMonthlyChart() {
    const [fetchMonthly,{data: res, isLoading}] = useLazyGetAdminMonthlyQuery()
    const theme = useTheme()
    const [series, setSeries] = useState([
        {
            name: "Total Surveys",
            data: []
        }, {
            name: 'Total Votes',
            data: [2, 3, 1, 2, 3, 1, 2,3,4,5,1,2]
        }
    ]);
    const [options] = useState({
        chart: {
            height: 350,
            type: 'area'
        },
        xaxis: {
            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec' ]
        },
        theme: {
            mode:  theme.mode
        },
        dataLabels: {
            enabled: false
        },
        stroke: {
            curve: 'smooth'
        },
    })

    useEffect(() => {
        fetchMonthly()
    },[fetchMonthly])

    useEffect(() => {
        if(res){
            const surveyMonths = Array.from({length: 12}, (item, i) => {
                const obj = res.data.survey.find(item => item.month === i+1);
                return obj ? obj : {
                    month: i+1 ,
                    total: 0
                }
            });
            const voteMonths = Array.from({length: 12}, (item, i) => {
                const obj = res.data.vote.find(item => item.month === i+1);
                return obj ? obj : {
                    month: i+1 ,
                    total: 0
                }
            });
            setSeries([
                {
                    name: "Total Surveys",
                    data: surveyMonths.map(item => item.total)
                }, {
                    name: 'Total Votes',
                    data: voteMonths.map(item => item.total)
                }
            ])
        }
    }, [res]);

    if (isLoading) return (<LineChartLoading />)

    return (
        <div className={"rounded-lg border border-gray-200 bg-white shadow-md dark:border-gray-700 dark:bg-gray-800 my-5 p-0"}>
            <div className="mixed-chart" id="chart">
                <h2 className={"uppercase text-center font-medium mt-3"}> Survey & Vote Monthly</h2>
                <Chart
                    options={options}
                    series={series}
                    type="area"
                    height={350}
                />
            </div>
        </div>
    )
}

export default SurveyVoteMonthlyChart;