import React from 'react';
import dynamic from "next/dynamic";
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

const VoteChart = ({ chartData }) => {
    const options = {
        chart: {
            type: 'bar',
            height: 350,
        },
        plotOptions: {
            bar: {
                columnWidth: '20%',
                distributed: true,
            }
        },
        dataLabels: {
            enabled: true,
            formatter: (value) => value.toFixed(2),
        },
        legend: {
            show: true
        },
        xaxis: {
            categories: chartData?.map((item) => item.value),
            labels: {
                style: {
                    fontSize: '16px'
                }
            }
        },
        yaxis: {
            min: 0,
            max: 100,
            labels: {
                formatter: (value) => value.toFixed(2),
            },
        },
    };
    const data = Array.isArray(chartData) ? chartData : [];
    const votePercentages = data.map((item) => item.votePercentage);
    const series = [
        {
            data: votePercentages,
        },
    ];

    return <Chart options={options} series={series} type="bar" height={350} />;
};

export default VoteChart;