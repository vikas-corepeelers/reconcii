import React, { useEffect, useState } from "react";
import DashboardFilter from "./components/DashboardFilter";
import DashboardNumbers from "./components/DashboardNumbers";
import InStoreDashboardGraphs from "./InStoreDashboardGraphs";
import BlankDashboard from "./components/BlankDashboard";
import { useSelector } from "react-redux";
import { DASHBOARD_ITEMS } from "./DashboardConstants";
import ThreePODashboardGraphs from "./3PODashboardGraphs";

const Dashboard = () => {
  let { dashboardData, dashboardFilters } = useSelector(
    (state) => state.CommonService
  );
  return (
    <div>
      <DashboardFilter />
      <DashboardNumbers />
      {dashboardFilters?.salesLocation === DASHBOARD_ITEMS[0]?.key &&
        (dashboardData?.sales !== undefined ? (
          <InStoreDashboardGraphs />
        ) : (
          <BlankDashboard />
        ))}
      {dashboardFilters?.salesLocation === DASHBOARD_ITEMS[1]?.key &&
        (dashboardData?.sales !== undefined ? (
          <ThreePODashboardGraphs />
        ) : (
          <BlankDashboard />
        ))}
    </div>
  );
};

export default Dashboard;
