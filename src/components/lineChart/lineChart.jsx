import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement, Tooltip} from "chart.js";
import { groupDataByDay } from "../../utils/helper";
import { useSelector } from "react-redux";
import { dashboardSelector } from "../../redux/reducers/dashboardReducer";

import zoomPlugin from "chartjs-plugin-zoom";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, zoomPlugin);

export default function LineChart() {
    
    const { trend, loadingLine, selected } = useSelector(dashboardSelector);
    const [ labels, setLabels ] = useState(null);
    const [ data, setData ] = useState(null);
    
    useEffect(() => {
        if (trend && !loadingLine) {
            const {labels , data} = groupDataByDay(trend, selected);
            setLabels(labels);
            setData(data);
        }
    }, [trend, loadingLine, selected]);


    if(loadingLine){
        return <div>Loading...</div>;
    }

    const chartData = {
        labels: labels,
        datasets: [
            {
                label: `Time Trend of ${selected}`,
                data: data,
                borderColor: "#42A5F5",
                backgroundColor: "rgba(66, 165, 245, 0.2)",
                borderWidth: 2,
                tension: 0,
            },
        ],
    };

    const chartOptions = {
        responsive: true,
        plugins: {
            legend: {
                display: true,
                position: "top",
            },
            zoom: {
                zoom: {
                    wheel: {
                        enabled: true
                    },
                    mode: "x",
                    speed: 100
                },
                pan: {
                    enabled: true,
                    mode: "x",
                    speed: 0.5
                }

            },

        },

    };

    return (
        <div className="card customBorder p-3">
            <div className="card-body">
                <h5 className="card-title"><i className="bi bi-graph-up-arrow"></i> Line Chart</h5>
                <hr />
                <Line data={chartData} options={chartOptions} />
            </div>
        </div>
    );
};


