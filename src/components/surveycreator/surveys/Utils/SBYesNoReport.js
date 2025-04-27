import React, {useState} from 'react';
import dynamic from "next/dynamic";
const ReactApexChart = dynamic(() => import('react-apexcharts'), { ssr: false });


function SBYesNoReport({data}) {

    const chartData = data.map(item => item.answered.length)
    const chartLabel = data.map(item => item.name)

    const [state, setState] = useState({

        series: [{
            data: chartData
        }],
        options: {
            chart: {
                height: 300,
                type: 'bar',
            },
            // colors: colors,
            plotOptions: {
                bar: {
                    columnWidth: '45%',
                    distributed: true,
                }
            },
            dataLabels: {
                enabled: false
            },
            legend: {
                show: true
            },
            xaxis: {
                categories: chartLabel,
                labels: {
                    style: {
                        // colors: colors,
                        fontSize: '12px'
                    }
                }
            }
        },
    })
    return (
        <ReactApexChart options={state.options} series={state.series} type="bar" height={350} />
    );
}

export default SBYesNoReport;