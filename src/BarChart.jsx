/* eslint-disable react/prop-types */
// BarChart.js
// import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register the necessary components for the chart
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const BarChart = ({expenses}) => {
  // Define the data for the bar chart
  const data = {
    labels: expenses.map((expense) => `${expense.dateStamp},${expense.timeStamp}`), // Label each data point with its index
    datasets: [
      {
        label: "Expenses",
        data: expenses.map((expense) => parseFloat(expense.amount)),
        backgroundColor: "rgba(75, 192, 192, 0.7)", // Point color
        borderColor: "rgba(75, 192, 192, 1)", // Line color
        fill: false, // This will ensure the area under the line is not filled
        tension: 0.1, // Adds smoothness to the line
      },
    ],
  };

  // Define the options for the bar chart
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      tooltip: {
        callbacks: {
          label: (tooltipItem) => `${tooltipItem.dataset.label}: ${tooltipItem.raw}`,
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true, // Set y-axis to start from zero
      },
    },
  };

  return (
    <div className="w-[700px] h-[400px]">
      <h2>Sales Bar Chart</h2>
      <Bar data={data} options={options} />
    </div>
  );
};

export default BarChart;
