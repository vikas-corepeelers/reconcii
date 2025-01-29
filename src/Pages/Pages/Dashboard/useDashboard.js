import React, { useState } from "react";
import { apiEndpoints } from "../../../ServiceRequest/APIEndPoints";
import {
  requestCallGet,
  requestCallPost,
} from "../../../ServiceRequest/APIFunctions";
import { useDispatch, useSelector } from "react-redux";
import {
  setCityList,
  setDashboard3POData,
  setDashboardData,
  setDataEffectiveDate,
  setLoadingDashboard,
  setStoreList,
  setTenderWiseStoresMissedInMapping,
} from "../../../Redux/Slices/Common";
import { useLoader } from "../../../Utils/Loader";
import { setReconciliation3POData } from "../../../Redux/Slices/Reconciliation";

const useDashboard = () => {
  const dispatch = useDispatch();
  const { setToastMessage, setLoading } = useLoader();
  let { currentDashboardRequest } = useSelector((state) => state.CommonService);

  const fetchOldEffectiveDate = async () => {
    try {
      const response = await requestCallGet(
        apiEndpoints.FIND_OLDEST_EFFECTIVE_DATE
      );
      if (response.status) {
        dispatch(setDataEffectiveDate(response?.data?.data));
      }
    } catch (error) {
      console.error(error);
    }
    return [];
  };

  const fetchCityList = async () => {
    try {
      const response = await requestCallGet(apiEndpoints.GET_CITY_LIST_DATA);
      if (response.status) {
        dispatch(setCityList(response?.data?.data));
        return response?.data?.data;
      }
    } catch (error) {
      console.error(error);
    }
    return [];
  };

  const fetchStoreList = async (params) => {
    try {
      const response = await requestCallPost(
        apiEndpoints.GET_STORE_LIST_DATA,
        params
      );
      if (response.status) {
        dispatch(setStoreList(response?.data?.data));
        return response?.data?.data;
      }
    } catch (error) {
      console.error(error);
    }
    return [];
  };

  const fetchTenderWiseStoresMissedInMapping = async () => {
    try {
      const response = await requestCallGet(apiEndpoints.MISSING_STORE_MAPPING);
      if (response.status) {
        dispatch(setTenderWiseStoresMissedInMapping(response?.data?.data));
      }
    } catch (error) {
      console.error(error);
    }
  };

  const getDashboard = async (params) => {
    getDashboard3POData(params);
    dispatch(setLoadingDashboard(true));
    setLoading(true);
    try {
      const response = await requestCallPost(
        apiEndpoints.DASHBOARD_DATA,
        params
      );
      if (response.status) {
        dispatch(setDashboardData(response?.data?.data));
        dispatch(setLoadingDashboard(false));
        setTimeout(() => {
          setLoading(false);
          dispatch(setLoadingDashboard(false));
        }, 1000);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const getDashboard3POData = async (params, reconciliation = false) => {
    try {
      const response = await requestCallPost(apiEndpoints._3PO_DATA, params);
      dispatch(setLoadingDashboard(false));
      if (reconciliation) {
        dispatch(setLoadingDashboard(true));
        setLoading(true);
      }
      if (response.status) {
        if (reconciliation) {
          dispatch(setReconciliation3POData(response?.data?.data));
          setTimeout(() => {
            setLoading(false);
            dispatch(setLoadingDashboard(false));
          }, 1000);
        } else {
          dispatch(setDashboard3POData(response?.data?.data));
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  const downloadAsyncReport = async (params) => {
    try {
      let req = {
        ...params,
        ...currentDashboardRequest,
      };
      const response = await requestCallPost(
        apiEndpoints.DOWNLOAD_ASYNC_DASHBOARD_REPORT,
        req
      );
      dispatch(setLoadingDashboard(false));
      if (response.status) {
        setToastMessage({
          message: "Request submitted for generating report.",
          type: "success",
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  const downloadStoreReport = async (params) => {
    try {
      let req = {
        ...params,
        ...currentDashboardRequest,
      };
      setToastMessage({
        message: "Request submitted for generating report.",
        type: "success",
      });
      const response = await requestCallPost(
        apiEndpoints.DOWNLOAD_STORE_TEMPLATE_DATA,
        req
      );
      dispatch(setLoadingDashboard(false));
      if (response.status) {
        setToastMessage({
          message: "Request submitted for generating report.",
          type: "success",
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  return {
    fetchCityList,
    fetchStoreList,
    getDashboard,
    downloadAsyncReport,
    downloadStoreReport,
    fetchTenderWiseStoresMissedInMapping,
    getDashboard3POData,
    fetchOldEffectiveDate,
  };
};

export default useDashboard;
