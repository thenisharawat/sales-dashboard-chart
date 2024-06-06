













import React from 'react';
import { Pie } from 'react-chartjs-2';

const TransactionsPieChart = ({ data }) => {
    const chartData = {
        labels: Object.keys(data),
        datasets: [
            {
                label: 'Number of Items',
                data: Object.values(data),
                backgroundColor: [
                    'rgba(255, 99, 132, 0.6)',
                    'rgba(54, 162, 235, 0.6)',
                    'rgba(255, 206, 86, 0.6)',
                    'rgba(75, 192, 192, 0.6)',
                    'rgba(153, 102, 255, 0.6)',
                    'rgba(255, 159, 64, 0.6)',
                ],
            },
        ],
    };

    return (
        <div>
            <h2>Pie Chart</h2>
            <Pie data={chartData} />
        </div>
    );
};

export default TransactionsPieChart;
