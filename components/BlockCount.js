import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import axios from 'axios';
import 'chart.js/auto'; // Ensure this import is present

const BlockCountChart = () => {
    const [chartData, setChartData] = useState({
        labels: [],
        datasets: [
            {
                label: 'Estimated Blocks Created',
                data: [],
                fill: false,
                backgroundColor: 'rgba(75,192,192,0.4)',
                borderColor: 'rgba(75,192,192,1)',
            },
        ],
    });

    const apiKey = process.env.NEXT_PUBLIC_ETH_KEY; // Replace with your Etherscan API key

    useEffect(() => {
        const fetchBlockData = async () => {
            const labels = ['6 Months Ago', '5 Months Ago', '4 Months Ago', '3 Months Ago', '2 Months Ago', '1 Month Ago'];
            const blockCounts = [];

            // Simulating varying block counts for each month
            const simulatedBlockCounts = [
                Math.floor(Math.random() * (180000 - 160000 + 1) + 160000), // Random value between 160k and 180k
                Math.floor(Math.random() * (180000 - 160000 + 1) + 160000),
                Math.floor(Math.random() * (180000 - 160000 + 1) + 160000),
                Math.floor(Math.random() * (180000 - 160000 + 1) + 160000),
                Math.floor(Math.random() * (180000 - 160000 + 1) + 160000),
                Math.floor(Math.random() * (180000 - 160000 + 1) + 160000),
            ];

            // Populate blockCounts with simulated data
            simulatedBlockCounts.forEach(count => blockCounts.push(count));

            setChartData({
                labels: labels,
                datasets: [
                    {
                        label: 'Estimated Blocks Created',
                        data: blockCounts,
                        fill: false,
                        backgroundColor: 'rgba(75,192,192,0.4)',
                        borderColor: 'rgba(75,192,192,1)',
                    },
                ],
            });
        };

        fetchBlockData();
    }, [apiKey]);

    return (
        <div className="w-full max-w-3xl mx-auto p-4 bg-white rounded-lg shadow-md">
            <h2 className="text-center text-xl font-bold mb-4">Estimated Ethereum Block Count Over Last 6 Months</h2>
            <div className="relative">
                <Line data={chartData} options={{ maintainAspectRatio: false }} />
            </div>
        </div>
    );
};

export default BlockCountChart;