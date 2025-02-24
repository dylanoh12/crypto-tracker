import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement, TimeScale } from 'chart.js';

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, TimeScale);

const Chart = ({ data }) => {
  const chartData = {
    labels: data.map((point) => new Date(point[0]).toLocaleDateString()),
    datasets: [
      {
        label: 'Price (USD)',
        data: data.map((point) => point[1]),
        borderColor: '#FF5733',
        backgroundColor: 'rgba(255, 87, 51, 0.1)',
        fill: true,
        tension: 0.4,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: { ticks: { color: '#A0AEC0' } },
      y: { ticks: { color: '#A0AEC0' } },
    },
    plugins: {
      legend: { display: false },
    },
  };

  return <Line data={chartData} options={options} />;
};

export default Chart;