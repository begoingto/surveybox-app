import React, {useState} from "react";
import '@/app/surveycreator/dashboard/style.css'
import dynamic from "next/dynamic";

const ReactApexChart = dynamic(() => import('react-apexcharts'), { ssr: false });


function SBSLineChart(){
    const [state] = useState({
            series: [{
                name: "Desktops",
                data: [10, 41, 35, 51, 49, 62, 69, 91, 148, 23, 34,55]
            }],
            options: {
                chart: {
                    height: 350,
                    type: 'line',
                    zoom: {
                        enabled: true
                    }
                },
                dataLabels: {
                    enabled: true
                },
                stroke: {
                    curve: 'straight'
                },
                grid: {
                    row: {
                        colors: ['#F8F9F9', 'transparent'],// takes an array which will be repeated on columns
                        opacity: 0.05
                    },
                },
                yaxis: {
                  axisBorder: {
                      show: true
                  },
                  axisTicks: {
                      show: true
                  },
                    labels: {
                        style: {
                            colors: ['#037EDC']
                        },
                        show: true
                    }
                },
                xaxis: {
                    categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Out', 'Nov', 'Dec'],
                    labels: {
                        show: true,
                        style: {
                            colors: '#037EDC',
                        },
                    },
                },
                axisBorder: {
                    show: true,
                },
                axisTicks: {
                    show: true,
                },
            },
    });
    return(
        <div>
            <p>Statistics</p>
            <h1 className={'font-bold text-xl'}>Survey report</h1>
            <ReactApexChart options={state.options} series={state.series} type="line" height={600} />
        </div>
    )
}
export default SBSLineChart;

