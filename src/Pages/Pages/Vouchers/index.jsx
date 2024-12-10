import React, { useEffect, useRef, useState } from "react";
import BlankCard from "../../../components/BlankCard";

import "./vouchers.style.css";

export default function Vouchers() {
  return (
    <div className="">
      <BlankCard
        header={<h4 className="box-title font-bold text-base">VOUCHERS</h4>}
      ></BlankCard>
    </div>
  );
}
