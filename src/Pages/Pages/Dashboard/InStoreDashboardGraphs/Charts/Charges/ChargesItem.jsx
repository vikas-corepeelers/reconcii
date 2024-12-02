import React, { useEffect, useState } from "react";
import "../../graph.style.css";
import { useSelector } from "react-redux";
import PercentageChart from "../PercentageChart";
import CustomLegend from "../../components/CustomLegend";
import LegendTable from "../../../3PODashboardGraphs/components/LegendTable";

export default function ChargesItem({ chartIndex, item }) {
  const [graphData, setGraphData] = useState({
    labels: [],
    data: [],
    legends: [],
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
      sales = Number(item?.charges);
      totalSales = Number(item?.sales);
    } else {
      sales = Number(item?.trmSalesData.charges);
      totalSales = Number(item?.trmSalesData?.sales);
    }
    let percentage = 0;
    if (sales) {
      percentage = (sales / totalSales) * 100;
    }
    setGraphData({
      labels: ["Charges", "Remaining"],
      data: [percentage, 100 - percentage],
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
        <LegendTable graphData={legendData} reportType={"Charges"} />
      </div>
    </div>
  );
}