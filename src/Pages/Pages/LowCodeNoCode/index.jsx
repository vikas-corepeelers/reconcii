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
  return (
    <ExpandableCard header={report?.name}>
      {report?.tenders?.length > 0 ? (
        <div className="flex flex-col gap-2 p-2">
          {report?.tenders?.map((tender, index) => (
            <button
              key={index}
              className="flex items-center gap-2 p-3 rounded tender-item"
              onClick={() =>
                window.open(`/formula-manager/${tender}`, "_blank")
              }
            >
              {tender}
            </button>
          ))}
        </div>
      ) : (
        <div className="text-gray-500 text-sm">No tenders available</div>
      )}
    </ExpandableCard>
  );
};
