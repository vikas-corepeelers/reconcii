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
  const { setLoading } = useLoader();
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
      const response = await requestCallPost(
        API_END_POINTS.GET_MODULE_LIST,
        params
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

  return {
    fetchModuleList,
    moduleList,
    handleChange,
    params,
    setParams,
    addModule,
    formError,
    setFormError,
  };
};

export default useModule;
