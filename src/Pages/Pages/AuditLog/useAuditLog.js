import React, { useState } from "react";
import API_END_POINTS from "../../../ServiceRequest/APIEndPoints";
import {
  requestCallGet,
  requestCallPost,
} from "../../../ServiceRequest/APIFunctions";
import useMakeLogs from "../../../Hooks/useMakeLogs";
import moment from "moment";

const BLANK_LOG_PARAMS = {
  startDate: moment().format("YYYY-MM-DD"),
  endDate: moment().format("YYYY-MM-DD"),
  username: "",
  action: "",
};

const useAuditLog = () => {
  const [userList, setUserList] = useState([]);
  const [auditLogList, setAuditLogList] = useState([]);
  const [filterValues, setFilterValues] = useState(BLANK_LOG_PARAMS);
  const handleFilterChange = (name, value) => {
    setFilterValues({ ...filterValues, [name]: value });
  };

  const fetchUserList = async () => {
    try {
      const response = await requestCallGet(API_END_POINTS.ACTIVITY_USER_LIST);
      if (response.status) {
        setUserList(response?.data?.Data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const fetchAuditLog = async () => {
    try {
      const response = await requestCallPost(
        API_END_POINTS.ACTIVITY_SEARCH,
        filterValues
      );
      if (response.status) {
        setAuditLogList(response?.data?.Data);
      }
    } catch (error) {
      console.error(error);
    }
    return [];
  };

  return {
    filterValues,
    userList,
    fetchUserList,
    handleFilterChange,
    setFilterValues,
    auditLogList,
    fetchAuditLog,
  };
};

export default useAuditLog;
