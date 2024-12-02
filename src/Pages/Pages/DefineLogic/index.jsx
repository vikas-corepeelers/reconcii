import React from "react";
import "../../Styles/DefineLogic.css";
import ExpandableCard from "./ExpandableCard";
import PickFile from "./Components/PickFile";
import { useSelector } from "react-redux";
import SetLogics from "./SetLogics";

const DefineLogic = () => {
  let excelFiles = useSelector((state) => state.LogicsService.excelFiles);
  return (
    <div className="">
      <ExpandableCard header={"Upload Data File"} dataSetNos={excelFiles?.length} >
        <PickFile />
      </ExpandableCard>
      <ExpandableCard header={"Set Logics"}>
        <SetLogics />
      </ExpandableCard>  
    </div>
  );

};

export default DefineLogic;
