import React, { useEffect, useState } from "react";
import "../../../InStoreDashboardGraphs/graph.style.css";
import { useSelector } from "react-redux";
import StatusComparisonItem from "./StatusComparisonItem";

export default function StatusComparison({ selectedDelta }) {
  const [storeSalesData, setStoreSalesData] = useState([]);
  const [selectedTenderIndex, setSelectedTenderIndex] = useState(-1);
  let { dashboard3POData } = useSelector((state) => state.CommonService);

  useEffect(() => {
    if (dashboard3POData?.threePOData) {
      setSelectedTenderIndex(
        dashboard3POData?.threePOData?.length > 0 ? 0 : -1
      );
      setStoreSalesData(dashboard3POData?.threePOData);
    }
  }, [selectedDelta, dashboard3POData]);

  return (
    <div className="chart-container">
      <div className="flex justify-end items-end w-100">
        <select
          className="chart-select"
          value={selectedTenderIndex}
          onChange={(e) => setSelectedTenderIndex(e.target.value)}
        >
          {storeSalesData?.map((item, index) => {
            return (
              <option value={index} key={item?.tenderName}>
                {item?.tenderName}
              </option>
            );
          })}
        </select>
      </div>
      {selectedTenderIndex > -1 && (
        <div className="chart-list-horizontal">
          <StatusComparisonItem
            item={storeSalesData[selectedTenderIndex]}
            selectedDelta={selectedDelta}
            chartIndex={selectedTenderIndex}
          />
        </div>
      )}
    </div>
  );
}
