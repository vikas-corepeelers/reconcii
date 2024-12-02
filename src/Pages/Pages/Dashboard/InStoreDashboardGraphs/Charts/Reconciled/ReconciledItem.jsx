import React, { useEffect, useState } from "react";
import "../../graph.style.css";
import { useSelector } from "react-redux";
import PercentageChart from "../PercentageChart";
import LegendTable from "../../../3PODashboardGraphs/components/LegendTable";

export default function ReconciledItem({ chartIndex, item }) {
  const [graphData, setGraphData] = useState({
    labels: [],
    data: [],
    legends: [],
    colors: [],
  });

  const [legendData, setLegendData] = useState({
    labels: [],
    data: [],
    colors: [],
  });

  let { dashboardFilters } = useSelector((state) => state.CommonService);

  useEffect(() => {
    let sales = 0;
    let totalSales = 0;
    if (dashboardFilters?.salesType === "POS Sales") {
      sales = Number(item?.reconciled);
      totalSales = Number(item?.sales);
    } else {
      sales = Number(item?.trmSalesData.reconciled);
      totalSales = Number(item?.trmSalesData?.sales);
    }

    let percentage = 0;
    if (sales) {
      percentage = (sales / totalSales) * 100;
    }
    setGraphData({
      labels: ["Reconciled", "Remaining"],
      data: [percentage, 100 - percentage],
      colors: ["#4caf50"],
    });
    setLegendData({
      labels: [item?.tenderName],
      data: [sales],
      colors: ["#4caf50"],
    });
  }, [chartIndex, dashboardFilters?.salesType]);

  return (
    <div className="chart-container">
      <PercentageChart labels={graphData?.labels} data={graphData.data} />
      <div className="w-100">
        <LegendTable graphData={legendData} reportType={"Reconciled"} />
      </div>
    </div>
  );
}