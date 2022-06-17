import React from "react";
import { Pie } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ArcElement
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ArcElement
);

const Chart = () => {
    const pieChartData = {
        labels: ["October", "November", "December"],
        datasets: [{
            data: [20, 21, 10],
            label: "Infected People",
            backgroundColor: ["#2FDE00", "#00A6B4", "#ff6600"],
            hoverBackgroundColor: ["#175000", "#003350", "#993d00"]
        }]
    };
    const pieChart = (
        <Pie
            type="pie"
            width={30}
            height={30}
            options={{
                title: {
                    display: true,
                    text: "COVID-19 Cases of Last 3 Months",
                    fontSize: 15
                },
                legend: {
                    display: true, //Is the legend shown?
                    position: "top" //Position of the legend.
                }
            }}
            data={pieChartData}
        />
    );
    return pieChart;
};
export default Chart;