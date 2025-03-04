import React, { useState } from "react";
import API_END_POINTS from "../../../ServiceRequest/APIEndPoints";
import {
  requestCallGet,
  requestCallPost,
} from "../../../ServiceRequest/APIFunctions";
import { useLoader } from "../../../Utils/Loader";

const BLANK_MODULE = {
  module_name: "",
  tool_id: 1,
};

const useModule = () => {
  const { setLoading, setToastMessage } = useLoader();
  const [params, setParams] = useState(BLANK_MODULE);
  const [formError, setFormError] = useState(null);
  const [moduleList, setModuleList] = useState([]);

  const handleChange = (name, val) => {
    if (formError !== null) {
      setFormError(null);
    }
    setParams({ ...params, [name]: val });
  };

  const fetchModuleList = async (params) => {
    try {
      let req = {
        ...params,
        organization_id: localStorage.getItem("Organization"),
      };
      const response = await requestCallPost(
        API_END_POINTS.GET_MODULE_LIST,
        req
      );
      if (response.status) {
        setModuleList(response.data?.Data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const addModule = async () => {
    try {
      if (params?.module_name?.trim() === "") {
        setFormError({ module_name: "Please enter Module Name" });
        return;
      }
      setLoading(true);
      let req = {
        ...params,
        tool_id: localStorage.getItem("activeTool") || 1,
      };
      const response = await requestCallPost(API_END_POINTS.CREATE_MODULE, req);
      setLoading(false);
      if (response.status) {
        return true;
      } else {
        setFormError({
          module_name:
            response?.message?.data?.message || "Something went wrong.",
        });
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const deleteModule = async (params) => {
    try {
      const response = await requestCallPost(
        API_END_POINTS.DELETE_MODULE,
        params
      );
      if (response.status) {
        return true;
      } else {
        setToastMessage({
          message: response?.message?.data?.message || "Something went wrong.",
          type: "error",
        });
      }
    } catch (error) {
      console.error(error);
    }
    return false;
  };

  return {
    fetchModuleList,
    moduleList,
    handleChange,
    params,
    setParams,
    addModule,
    formError,
    setFormError,
    deleteModule,
  };
};

export default useModule;
