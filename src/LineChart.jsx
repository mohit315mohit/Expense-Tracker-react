/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, LinearScale, PointElement, CategoryScale, LineElement } from "chart.js";

ChartJS.register(LinearScale, PointElement, CategoryScale, LineElement);

export default function LineChart({ expenses }) {
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

  // const options = {

  //   plugins: {
  //     legend: {
  //       display: false, // Remove legend for simplicity
  //     },
  //     tooltip: {
  //       callbacks: {
  //         label: (tooltipItem) => `${tooltipItem.dataset.label}: ${tooltipItem.raw}`,
  //       },
  //     },
  //   },
  //   scales: {
  //     x: {
  //       grid: {
  //         color: '#000',
  //       },
  //       title: {
  //         display: true,
  //         text: "Expense Index", // Change label if using dates
  //       },
       
  //     },
  //     y: {
  //       title: {
  //         display: true,
  //         text: "Expense Amount ($)",
  //       },
  //     },
  //   },
  //   responsive: true,
  //   maintainAspectRatio: false, // Ensures responsive resizing
  //   backgroundColor: "#fff", // Set chart background color
  // };

  const options = {
    plugins: {
      legend: {
        display: false, // Remove legend for simplicity
      },
      tooltip: {
        callbacks: {
          label: (tooltipItem) => `${tooltipItem.dataset.label}: ${tooltipItem.raw}`,
        },
      },
    },
    scales: {
      x: {
        grid: {
          color: '#000',
        },
        title: {
          display: true,
          text: "Expense Index", // Change label if using dates
        },
        ticks: {
          autoSkip: true, // Automatically skip labels if they overlap
          maxRotation: 45, // Rotate x-axis labels for better visibility
          minRotation: 45, // Set a minimum rotation for labels
        },
      },
      y: {
        title: {
          display: true,
          text: "Expense Amount ($)",
        },
        ticks: {
          beginAtZero: true, // Ensure y-axis starts at zero
          callback: (value) => `$${value.toFixed(2)}`, // Format y-axis values as currency
        },
      },
    },
    responsive: true,
    maintainAspectRatio: false, // Ensures responsive resizing
    backgroundColor: "#fff", // Set chart background color
  };
  
  return (
    <div className="w-[700px] h-[360px]">
      <Line data={data}  />
    </div>
  );
}
