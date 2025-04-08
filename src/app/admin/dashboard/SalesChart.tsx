"use client";

import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { useState } from "react";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const SalesChart = () => {
  const [selectedRange, setSelectedRange] = useState("Monthly");

  // Dynamic data for Monthly and Yearly
  const dataSets = {
    Monthly: {
      labels: ["00:00", "01:00", "02:00", "03:00", "04:00", "05:00", "06:00"],
      datasets: [
        {
          label: "Product A",
          data: [30, 40, 35, 50, 45, 100, 110], // Monthly Data
          borderColor: "rgba(54, 162, 235, 1)",
          backgroundColor: "rgba(54, 162, 235, 0.2)",
          fill: true,
        },
        {
          label: "Product B",
          data: [10, 30, 45, 35, 40, 50, 42], // Monthly Data
          borderColor: "rgba(75, 192, 192, 1)",
          backgroundColor: "rgba(75, 192, 192, 0.2)",
          fill: true,
        },
      ],
    },
    Yearly: {
      labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
      datasets: [
        {
          label: "Product A",
          data: [300, 400, 350, 500, 450, 1000, 1100],
          borderColor: "rgba(255, 99, 132, 1)",
          backgroundColor: "rgba(255, 99, 132, 0.2)",
          fill: true,
        },
        {
          label: "Product B",
          data: [100, 300, 450, 350, 400, 500, 420],
          borderColor: "rgba(153, 102, 255, 1)",
          backgroundColor: "rgba(153, 102, 255, 0.2)",
          fill: true,
        },
      ],
    },
  };

  return (
    <div className="w-full h-[29rem] p-4 bg-white shadow-lg rounded-lg relative">
      {/* Dropdown at the Top Left */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-start">Sales History</h2>
        <select
          className="p-1 border text-xs w-20 rounded-full bg-custom-gradient text-black focus:outline-none"
          value={selectedRange}
          onChange={(e) => setSelectedRange(e.target.value)}
        >
          <option className="" value="Monthly">
            Monthly
          </option>
          <option value="Yearly">Yearly</option>
        </select>
      </div>

      <div className="h-[83%]">
        <Line
          //@ts-expect-error ef ef e
          data={dataSets[selectedRange]}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: { position: "top" },
            },
            scales: {
              y: { beginAtZero: true },
            },
          }}
        />
      </div>
    </div>
  );
};

export default SalesChart;
