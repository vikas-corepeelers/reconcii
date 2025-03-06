import React, { useEffect } from "react";
import dayjs from "dayjs";
import useOrganization from "../Organization/useOrganization";

function isCurrentDateInRange(startDate, endDate) {
  const currentDate = dayjs(); // Get today's date
  return (
    currentDate.isAfter(dayjs(startDate), "day") &&
    currentDate.isBefore(dayjs(endDate), "day")
  );
}

const Dashboard = () => {
  const { dashboard, fetchOrganizationDashboard } = useOrganization();

  useEffect(() => {
    fetchOrganizationDashboard({});
  }, []);

  return (
    <div className="flex-1 dashboard-card">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="dashboard-head">
          <tr>
            <th scope="col">Organization</th>
            <th scope="col">Tool</th>
            <th scope="col">Subscription Start Date</th>
            <th scope="col">Subscription End Date</th>
            <th scope="col">Auto Renew</th>
            <th scope="col">Status</th>
          </tr>
        </thead>
        <tbody className="dashboard-body">
          {dashboard?.map((subscription) => {
            return (
              <tr>
                <td scope="col">
                  {subscription?.organization?.organization_full_name}
                </td>
                <td scope="col">{subscription?.tools?.tool_name}</td>
                <td scope="col">
                  {dayjs(subscription?.start_date).format("DD MMM YYYY")}
                </td>
                <td scope="col">
                  {dayjs(subscription?.end_date).format("DD MMM YYYY")}
                </td>
                <td scope="col">{subscription?.auto_renew ? "Yes" : "No"}</td>
                <td scope="col">
                  <div className="flex justify-start">
                    {isCurrentDateInRange(
                      subscription?.start_date,
                      subscription?.end_date
                    ) ? (
                      <div
                        style={{
                          backgroundColor: "#4caf50",
                          color: "#ffffff",
                          padding: "5px 15px",
                          borderRadius: "5px",
                        }}
                      >
                        Active
                      </div>
                    ) : (
                      <div
                        style={{
                          backgroundColor: "#ff6666",
                          color: "#ffffff",
                          padding: "5px 15px",
                          borderRadius: "5px",
                        }}
                      >
                        Inactive
                      </div>
                    )}
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Dashboard;
