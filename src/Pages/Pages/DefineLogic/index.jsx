import React, { useEffect } from "react";
import "../../Styles/DefineLogic.css";
import ExpandableCard from "./ExpandableCard";
import ManageDataSet from "./Components/ManageDataSet";
import { useSelector } from "react-redux";
import SetLogics from "./SetLogics";
import useLogic from "./useLogic";

const DefineLogic = () => {
  const { getTenderList } = useLogic();
  let tableList = useSelector((state) => state.LogicsService.tableList);

  useEffect(() => {
    getTenderList();
  }, []);

  return (
    <div className="">
      <ExpandableCard header={"Select Data Source"}>
        <ManageDataSet />
      </ExpandableCard>
      {tableList?.length > 0 && (
        <ExpandableCard header={"Set Logics"}>
          <SetLogics />
        </ExpandableCard>
      )}
    </div>
  );
};

export default DefineLogic;
