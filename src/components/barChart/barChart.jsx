import React, { useEffect, useState } from 'react';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { useSelector } from 'react-redux';
import { dashboardSelector } from '../../redux/reducers/dashboardReducer';
import { dashboardActions } from '../../redux/reducers/dashboardReducer';
import { useDispatch } from 'react-redux';

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

export default function BarChart() {

    const dispatch = useDispatch();

    const [barData, setBarData] = useState(null);
    const { features, loadingBar } = useSelector(dashboardSelector);

    useEffect(() => {
        if (features && !loadingBar) {
            setBarData(features[0]);
        }
    }, [loadingBar, barData, features]);

    const handleOnBarClicked = (event, elements) => {
        if (elements.length > 0) {
            
            const labels = ['A', 'B', 'C', 'D', 'E', 'F'];

            const index = elements[0].index;

            dispatch(dashboardActions.setSelected(labels[index]));
        }
    }

    let data;

    if (barData) {

        data = {
            labels: ['A', 'B', 'C', 'D', 'E', 'F'],
            datasets: [
                {
                    label: 'Features',
                    data: [barData.totalA, barData.totalB, barData.totalC, barData.totalD, barData.totalE, barData.totalF],
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)'
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)'
                    ],
                    borderWidth: 1
                },
            ],
        };

    } else {

        data = {
            labels: ['A', 'B', 'C', 'D', 'E', 'F'],
            datasets: [
                {
                    label: 'Features',
                    data: [0, 0, 0, 0, 0, 0],
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)'
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)'
                    ],
                    borderWidth: 1
                },
            ],
        };
    }

    const options = {
        indexAxis: 'y',
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            tooltip: {
                enabled: true,
            },
        },
        scales: {
            x: {
                beginAtZero: true,
            },
        },
        onClick: handleOnBarClicked
    };

    return (
        <div className="card customBorder p-3">
            <div className="card-body">
                <h5 className="card-title"><i className="bi bi-bar-chart-fill"></i> Bar Chart</h5>
                <hr />
                <Bar data={data} options={options} />
            </div>
        </div>
    );
};

