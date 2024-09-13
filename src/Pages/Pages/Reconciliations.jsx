import React, { useEffect, useState } from "react";
import CardComponent from "../Components/CardComponent";
import "../Styles/Dashboard.css";

const Reconciliations = () => {
  
  return (
    <div className="p-6 flex-1">
      <div class="grid grid-cols-12 gap-x-6">
        <div class="xxl:col-span-3 md:col-span-3 col-span-12">
          <CardComponent />
        </div>
        <div class="xxl:col-span-3 md:col-span-3 col-span-12">
          <CardComponent />
        </div>
        <div class="xxl:col-span-3 md:col-span-3 col-span-12">
          <CardComponent />
        </div>
        <div class="xxl:col-span-3 md:col-span-3 col-span-12">
          <CardComponent />
        </div>
      </div>
    </div>
  );
};

export default Reconciliations;
