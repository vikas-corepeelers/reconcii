import React, { useEffect, useState } from "react";
import IMAGES from "../../../Constants/Images";
import CardComponent from "../../Components/CardComponent";

const Dashboard = () => {
  return (
    <div className="flex-1">
      <div class="flex gap-3">
        <div class="flex-1 col-span-12">
          <CardComponent
            label={"TOTAL USERS"}
            number={"17"}
            icon={IMAGES.User}
          />
        </div>
        <div class="flex-1 col-span-12">
          <CardComponent
            label={"Active User"}
            number={12}
            icon={IMAGES.ActiveUser}
          />
        </div>
        <div class="flex-1 col-span-12">
          <CardComponent
            label={"Inactive User"}
            number={5}
            icon={IMAGES.InactiveUser}
          />
        </div>
        <div class="flex-1 col-span-12">
          <CardComponent
            label={"Total Groups"}
            number={5}
            icon={IMAGES.Groups}
          />
        </div>
        <div class="flex-1 col-span-12">
          <CardComponent
            label={"Total Modules"}
            number={5}
            icon={IMAGES.Modules}
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
