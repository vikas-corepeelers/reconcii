import React, { useState } from "react";
import { apiEndpoints } from "../../../ServiceRequest/APIEndPoints";
import {
  requestCallGet,
  requestCallPost,
} from "../../../ServiceRequest/APIFunctions";
import { useDispatch, useSelector } from "react-redux";
import {
  setActiveTender,
  setDBLogicId,
  setLogicData,
  setTableList,
  setTenderList,
} from "../../../Redux/Slices/Logics";
import { useLoader } from "../../../Utils/Loader";
const useLogic = () => {
  const dispatch = useDispatch();
  const { setLoading } = useLoader();
  let { logicData, activeTender, dbLogicId } = useSelector(
    (state) => state.LogicsService
  );
  const saveFormulas = async (reqObj) => {
    try {
      let url = apiEndpoints.SAVE_ALL_RECO_LOGICS;
      let requestObj = {
        tender: activeTender,
        recoData: reqObj?.response,
      };
      if (dbLogicId !== null) {
        url = apiEndpoints.UPDATE_ALL_RECO_LOGICS;
        requestObj = {
          ...requestObj,
          id: dbLogicId,
        };
      }

      const response = await requestCallPost(url, requestObj);
      if (response.status) {
        dispatch(setLogicData([]));
        dispatch(setTableList([]));
        dispatch(setTenderName(""));
        dispatch(setDBLogicId(null));
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const getSavedFormulas = async (tender) => {
    try {
      let params = {
        tender: tender,
      };
      const response = await requestCallGet(
        apiEndpoints.GET_RECO_LOGICS_BY_TOPIC,
        params
      );
      if (response.status && response.data?.data?.length > 0) {
        try {
          let savedLogic = JSON.parse(response.data?.data[0]?.recologic);
          dispatch(setLogicData(savedLogic));
          dispatch(setDBLogicId(response.data?.data[0]?.id));
        } catch (e) {
          console.log(e);
          dispatch(setDBLogicId(null));
        }
      } else {
        dispatch(setDBLogicId(null));
      }
    } catch (error) {
      dispatch(setDBLogicId(null));
    } finally {
      setLoading(false);
    }
  };

  const getTenderList = async () => {
    try {
      const response = await requestCallGet(apiEndpoints.GET_TENDER_LIST);
      if (response.status) {
        dispatch(setTenderList(response?.data));
      }
    } catch (error) {
      console.error(error);
    }
    return [];
  };

  const getTableList = async (tender) => {
    getSavedFormulas(tender);
    try {
      let params = {
        tender: tender,
      };
      dispatch(setActiveTender(tender));
      dispatch(setLogicData([]));
      const response = await requestCallGet(
        apiEndpoints.GET_TENDER_WISE_TABLES_LIST,
        params
      );
      // const response = {
      //   status: true,
      //   data: {
      //     data: Swiggy?.data,
      //   },
      // };

      if (response.status && response?.data?.data?.length > 0) {
        let tables = response?.data?.data[0]?.tableWiseColumns?.map((table) => {
          return { ...table, dataset_name: table.tableName };
        });
        dispatch(setTableList(tables));
      }
    } catch (error) {
      console.error(error);
    }
    return [];
  };

  const extractUppercaseVariables = (formula) => {
    // Regular expression to match uppercase words (allowing dot notation)
    const uppercaseWords = formula.match(/\b[A-Z_]+\b/g) || [];
    return uppercaseWords;
  };

  const checkArraySubset = (subset, superset) => {
    const missingItems = subset.filter((item) => !superset.includes(item));
    return {
      isSubset: missingItems.length === 0, // true if no missing items
      missingItems, // array of missing items
    };
  };

  const addBracketsOnVariables = (input) => {
    const output = input.replace(/\b[A-Z_]+\b/g, (match) => `<${match}>`);
    return output;
  };

  const validateFormula = (effectiveFrom, effectiveTo) => {
    setLoading(true);
    let allFormulas = [...logicData];
    let formulaNames = [];
    let validationStatus = true;
    let verifiedFormula = allFormulas?.map((formula) => {
      // Validate this formula name first
      if (formulaNames?.includes(formula?.logicNameKey)) {
        formula = { ...formula, error: "Duplicate Formula Name" };
        validationStatus = false;
        return formula;
      }
      // Get Other Formula used in this Formula
      let otherFormulas = extractUppercaseVariables(formula?.formulaText);
      if (otherFormulas?.length > 0) {
        let status = checkArraySubset(otherFormulas, formulaNames);
        if (!status?.isSubset) {
          validationStatus = false;
          formula = {
            ...formula,
            error: `${status?.missingItems[0]} is undefined.`,
          };
          return formula;
        }
      }

      let dbFields = [];
      formula?.fields.forEach((formField) => {
        if (
          formField?.type === "data_field" &&
          formField?.selectedDataSetValue
        ) {
          if (Array.isArray(formField?.selectedDataSetValue)) {
            formField?.selectedDataSetValue?.forEach((singleField) => {
              let field = formField?.selectedFieldValue + "." + singleField;
              dbFields?.push(field);
            });
          } else {
            let field =
              formField?.selectedFieldValue +
              "." +
              formField?.selectedDataSetValue;
            dbFields?.push(field);
          }
        }
      });

      let response = {
        ...formula,
        tender: activeTender,
        effectiveFrom: effectiveFrom,
        effectiveTo: effectiveTo,
        recoLogic: {
          [formula.logicNameKey]: addBracketsOnVariables(formula?.formulaText),
        },
        dbFields: dbFields?.join(", "),
        createdBy: "ADMIN",
      };
      formulaNames?.push(formula.logicNameKey);
      return response;
    });

    dispatch(setLogicData(verifiedFormula));
    if (!validationStatus) {
      setLoading(false);
    }

    console.log("verifiedFormula", verifiedFormula);
    return {
      isValid: validationStatus,
      response: verifiedFormula,
    };
  };

  return {
    saveFormulas,
    getTenderList,
    getTableList,
    validateFormula,
  };
};

export default useLogic;
