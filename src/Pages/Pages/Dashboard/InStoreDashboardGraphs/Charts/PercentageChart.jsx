import React, { useMemo, useRef } from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { formatNumberToLakhsAndCrores } from "../../../../../Utils/UtilityFunctions";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function PercentageChart({
  labels,
  data,
  backgroundColor = "#4caf50",
  colors = [],
  amountInRupee = false,
}) {
  const chartRef = useRef(null);
  const dataset = {
    labels: labels,
    datasets: [
      {
        data: data,
        backgroundColor:
          colors.length > 0 ? colors : [backgroundColor, "#cecece"],
        borderWidth: 0,
        // borderColor: "#000000",
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            const dataset = tooltipItem.dataset;
            const currentValue = dataset.data[tooltipItem.dataIndex];
            const fixedPercentage = currentValue.toFixed(2);
            if (amountInRupee) {
              return `₹${formatNumberToLakhsAndCrores(fixedPercentage)} lac`;
            }
            return `${fixedPercentage}%`;
            // const total = dataset.data.reduce((acc, value) => acc + value, 0);
            // const percentage = ((currentValue / total) * 100).toFixed(2);
            // return `${tooltipItem.label}: ${percentage}%`;
          },
        },
      },
    },
  };

  return (
    <div>
      <Doughnut ref={chartRef} data={dataset} options={options} />
    </div>
  );
}
