import React, { useEffect, useState } from "react";
import IMAGES from "../../../Constants/Images";
import CardComponent from "../../Components/CardComponent";
import useOrganization from "../Organization/useOrganization";

const Dashboard = () => {
  const { dashboard, fetchOrganizationDashboard } = useOrganization();

  useEffect(() => {
    let tool_id = localStorage.getItem("activeTool") || 1;
    let organization_id = localStorage.getItem("Organization") || 1;
    fetchOrganizationDashboard({
      tool_id: tool_id,
      organization_id: organization_id,
    });
  }, []);

  return (
    <div className="flex-1">
      <div class="flex gap-3">
        <div class="flex-1 col-span-12">
          <CardComponent
            label={"TOTAL USERS"}
            number={dashboard?.total_users || 0}
            icon={IMAGES.User}
          />
        </div>
        <div class="flex-1 col-span-12">
          <CardComponent
            label={"ACTIVE USERS"}
            number={dashboard?.active_users || 0}
            icon={IMAGES.ActiveUser}
          />
        </div>
        <div class="flex-1 col-span-12">
          <CardComponent
            label={"INACTIVE USERS"}
            number={dashboard?.inactive_users || 0}
            icon={IMAGES.InactiveUser}
          />
        </div>
        <div class="flex-1 col-span-12">
          <CardComponent
            label={"TOTAL GROUPS"}
            number={dashboard?.total_groups || 0}
            icon={IMAGES.Groups}
          />
        </div>
        <div class="flex-1 col-span-12">
          <CardComponent
            label={"TOTAL MODULES"}
            number={dashboard?.total_modules || 0}
            icon={IMAGES.Modules}
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
