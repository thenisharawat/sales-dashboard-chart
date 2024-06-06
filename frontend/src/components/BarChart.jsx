/* eslint-disable array-callback-return */
import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import { Bar, Pie } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);
export const MyBarChart = ({ selectedMonth, barChartData }) => {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: `Bar Chart Stats - ${selectedMonth}`,
      },
    },
  };

  let range = [];
  let count = [];
  barChartData.map((item) => {
    range.push(item.range);
    count.push(item.count);
  });

  const data = {
    labels: range,
    datasets: [
      {
        label: "",
        data: [...new Set(count)],
        backgroundColor: "rgb(107, 229, 232)",
      },
    ],
  };

  return <Bar className="bar" data={data} options={options} />;
};

export const MyPieChart = ({ selectedMonth, pieChartData }) => {
  let pieDataLength = pieChartData.length;
  // Function to generate a random color
  const getRandomColor = () => {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgb(${r},${g},${b})`;
  };
  let pieCount = [];
  let pieCategory = [];
  pieChartData.map((data) => {
    pieCount.push(data.count);
    pieCategory.push(data._id);
  });

  const pieData = {
    labels: pieCategory,
    datasets: [
      {
        label: "# of Counts",
        data: pieCount,
        backgroundColor: Array(pieDataLength)
          .fill()
          .map(() => getRandomColor()), // Generate random colors for each data item
        borderColor: Array(pieDataLength)
          .fill()
          .map(() => getRandomColor()), // Generate random colors for each data item
        borderWidth: 1,
      },
    ],
  };
  return (
    <div className="pie">
      <Pie data={pieData} />
    </div>
  );
};
