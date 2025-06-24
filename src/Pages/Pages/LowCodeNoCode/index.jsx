import React, { useEffect, useRef, useState } from "react";
import FormulaManager from "./FormulaManager";
import BlankCard from "../../../components/BlankCard";
import "./lowcodenocode.css";
import ExpandableCard from "../DefineLogic/ExpandableCard";
const REPORTS = [
  {
    id: "1",
    name: "POS vs 3PO",
    tenders: ["Zomato", "Swiggy", "Magic Pin"],
  },
  {
    id: "2",
    name: "POS vs TRM",
    tenders: ["Cash", "Card", "UPI"],
  },
];
export default function LowCodeNoCode() {
  return (
    <div className="">
      <BlankCard
        header={<h4 class="box-title font-bold text-base">DEFINE LOGICS</h4>}
      >
        <div className="p-2" />
        {REPORTS?.map((report) => {
          return <ExpandableSection key={report.id} report={report} />;
        })}
      </BlankCard>
    </div>
  );
}

const ExpandableSection = ({ report }) => {
  return <ExpandableCard header={report?.name}></ExpandableCard>;
};
