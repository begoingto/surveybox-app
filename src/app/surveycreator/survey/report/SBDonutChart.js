import React, {useState} from 'react';
import dynamic from "next/dynamic";

const ReactApexChart = dynamic(() => import('react-apexcharts'), { ssr: false });

function SbDonutChart({data}) {
    const [state]=useState({
         series: data.map(item=>item.value),
            options: {
                chart: {
                    type: 'donut',
                },
                labels: data.map(item=>item.name),
                responsive: [{
                    breakpoint: 480,
                    options: {
                        chart: {
                            width: 100+'%'
                        },
                        legend: {
                            position: 'bottom'
                        }
                    }
                }]
            },
    });

    return (

        <div id="chart">
            <ReactApexChart
                options={state.options}
                series={state.series}
                type="donut"
            />
        </div>

    );
}

export default SbDonutChart;

