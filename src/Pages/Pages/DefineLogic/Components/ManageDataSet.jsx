import React from "react";
import { useSelector } from "react-redux";
import DatasetItem from "./DatasetItem";
import useLogic from "../useLogic";
import Select from "react-select";
export default function ManageDataSet() {
  const { getTableList } = useLogic();
  let { tenderList, tableList } = useSelector((state) => state.LogicsService);

  return (
    <div className="font-Roboto text-Text-secondary border-text-primary rounded-md p-3">
      <div className="w-50">
        <p>
          Tenders <span style={{ color: "#ff0000" }}>*</span>
        </p>
        <Select
          onChange={(e) => getTableList(e)}
          options={tenderList.map((option) => ({
            label: option,
            value: option,
          }))}
          isMulti
        />
      </div>
      <div className="dataset-list mt-3">
        {tableList?.map((item, index) => {
          return <DatasetItem item={item} key={item?.tender} />;
        })}
        {tableList?.length === 0 && (
          <div className="dataset-list zero-state">No dataset selected</div>
        )}
      </div>
    </div>
  );
}
