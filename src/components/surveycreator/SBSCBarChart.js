"use client"
import React, {useEffect, useState} from "react";
import {Card} from "flowbite-react";
import dynamic from 'next/dynamic';
import {useGetSurveyMonthlyQuery} from "@/store/feature/dashborad/dashboardSlice";
import {setIsLoading} from "@/store/feature/survey/surveySlide";
import {useDispatch} from "react-redux";
import {LineChartLoading} from "@/components/loading/surveycreatorloading/SBSCDashboardLoading";
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

function App(props){
    const { data, isLoading} = useGetSurveyMonthlyQuery();
    const [series, setSeries] = useState([
        {
            name: "Total Surveys",
            data: []
        }, {
            name: 'Total Votes',
            data: [2, 3, 1, 2, 3, 1, 2,3,4,5,1,2]
        }
    ]);
    const dispatch = useDispatch( );
    const [options] = useState({
        chart: {
            height: 350,
            type: 'area'
        },
        xaxis: {
            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec' ]
        },
        theme: {
            mode:  props.theme
        },
        dataLabels: {
            enabled: false
        },
        stroke: {
            curve: 'smooth'
        },
    })

    useEffect(() => {
        if(data){
            const surveyMonths = Array.from({length: 12}, (item, i) => {
                const obj = data.data.survey.find(item => item.month === i+1);
                return obj ? obj : {
                    month: i+1 ,
                    total: 0
                }
            });
            const voteMonths = Array.from({length: 12}, (item, i) => {
                const obj = data.data.vote.find(item => item.month === i+1);
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
    },[data, dispatch, isLoading])

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


export default App;