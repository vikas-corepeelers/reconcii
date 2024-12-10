import React, { useEffect, useState } from "react";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import "../../Styles/DefineLogic.css";
import PrimaryButton from "../../../components/PrimaryButton";
import { useDispatch, useSelector } from "react-redux";
import FormulaModal from "./Components/FormulaModal";
import {
  setActiveLogic,
  setActiveLogicIndex,
  setLogicData,
} from "../../../Redux/Slices/Logics";
import BLANK_FORMULA from "./constants";
import OutlineButton from "../../../components/OutlineButton";
import useLogic from "./useLogic";
import moment from "moment";

const CUSTOM_OPTION = [
  {
    dataset_name: "Custom",
    dataset_type: "Custom",
  },
];

const SetLogics = () => {
  const dispatch = useDispatch();

  let { tableList, logicData, activeLogic } = useSelector(
    (state) => state.LogicsService
  );
  const [dataSetOptions, setDataSetOptions] = useState(CUSTOM_OPTION);
  const { saveFormulas, validateFormula } = useLogic();
  useEffect(() => {
    let updatedDataset = CUSTOM_OPTION.concat(tableList);
    setDataSetOptions(updatedDataset);
  }, [tableList]);

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState();

  function optionsForDataSet(index) {
    let options = CUSTOM_OPTION.concat(tableList);
    for (let i = 0; i < index; i++) {
      options.push({
        ...logicData[i],
        dataset_name: logicData[i].logicNameKey,
        dataset_type: "Formula",
      });
    }
    return options;
  }

  const addNewFormula = () => {
    let optionDataset = optionsForDataSet(logicData?.length);
    setDataSetOptions(optionDataset);
    dispatch(setActiveLogicIndex(-1));
    dispatch(setActiveLogic(BLANK_FORMULA));
  };

  const editFormula = (logicItem, index) => {
    let optionDataset = optionsForDataSet(index);
    setDataSetOptions(optionDataset);
    dispatch(setActiveLogicIndex(index));

    if (logicItem?.error) {
      let allItems = [...logicData];
      allItems[index] = { ...logicItem, error: undefined };
      dispatch(setLogicData(allItems));
    }

    dispatch(setActiveLogic({ ...logicItem, error: undefined }));
  };

  const deleteFormula = (index) => {
    let localLogicData = [...logicData];
    localLogicData?.splice(index, 1);
    dispatch(setLogicData(localLogicData));
  };

  const validateAndSave = () => {
    let requestObj = validateFormula(
      moment(startDate).format("YYYY-MM-DD"),
      endDate ? moment(endDate).format("YYYY-MM-DD") : ""
    );
    if (requestObj.isValid) {
      saveFormulas(requestObj);
    }
  };

  const handleDateChangeRaw = (e) => {
    e.preventDefault();
  };

  return (
    <div className="p-6 flex-1 font-Roboto">
      <div className="flex justify-between">
        <div className="flex gap-4">
          <div className="flex-1">
            <p>
              Effect from date <span style={{ color: "#ff0000" }}>*</span>
            </p>
            <DatePicker
              minDate={new Date()}
              dateFormat="dd-MM-YYYY"
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              onChangeRaw={handleDateChangeRaw}
            />
          </div>
          <div className="flex-1">
            <div className="flex gap-1 items-center">
              <p>Effect to date</p>
              <a
                className="clear-link"
                href="/"
                onClick={(e) => {
                  e.preventDefault();
                  setEndDate("");
                }}
              >
                (Clear)
              </a>
            </div>
            <DatePicker
              minDate={startDate}
              dateFormat="dd-MM-YYYY"
              selected={endDate}
              onChange={(date) => setEndDate(date)}
              onChangeRaw={handleDateChangeRaw}
            />
          </div>
        </div>
        <div className="flex gap-3 w-82 justify-end items-end">
          <OutlineButton
            label="ADD FORMULA"
            onClick={() => addNewFormula()}
            style={{ minWidth: "120px" }}
          />
          <PrimaryButton label="SAVE" onClick={validateAndSave} />
        </div>
      </div>
      <div className="mt-3">
        {logicData?.map((logicItem, index) => {
          return (
            <div
              className={`formula-box ${logicItem.error ? "error-border" : ""}`}
              key={logicItem.logicName}
            >
              <div className="formula-box-heading flex justify-between">
                <b>{logicItem.logicName}</b>
                <div className="flex gap-3">
                  <button onClick={() => editFormula(logicItem, index)}>
                    <i className="fa-solid fa-pencil"></i>
                  </button>
                  <button onClick={() => deleteFormula(index)}>
                    <i className="fa-solid fa-trash"></i>
                  </button>
                </div>
              </div>
              <div className="formula-box-content">{logicItem.formulaText}</div>
              {logicItem?.error && (
                <div className="error-box">{logicItem?.error}</div>
              )}
            </div>
          );
        })}
      </div>
      {activeLogic !== null && <FormulaModal dataSetOptions={dataSetOptions} />}
    </div>
  );
};

export default SetLogics;
