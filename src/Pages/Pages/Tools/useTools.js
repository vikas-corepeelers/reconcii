import React, { useState } from "react";
import API_END_POINTS from "../../../ServiceRequest/APIEndPoints";
import {
  requestCallGet,
  requestCallPost,
} from "../../../ServiceRequest/APIFunctions";
import { useLoader } from "../../../Utils/Loader";

const BLANK_MODULE = {
  tool_name: "",
  tool_logo: "",
  tool_url: "",
  tool_status: 1,
};

const useTools = () => {
  const { setLoading, setToastMessage } = useLoader();
  const [params, setParams] = useState(BLANK_MODULE);
  const [formError, setFormError] = useState(null);
  const [toolList, setToolList] = useState([]);

  const handleChange = (name, val) => {
    if (formError !== null) {
      setFormError(null);
    }
    setParams({ ...params, [name]: val });
  };

  const fetchToolList = async () => {
    try {
      const response = await requestCallGet(API_END_POINTS.GET_TOOLS);
      if (response.status) {
        setToolList(response.data?.Data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const addTool = async () => {
    try {
      if (params?.tool_name?.trim() === "") {
        setFormError({ tool_name: "Please enter Module Name" });
        return;
      }
      setLoading(true);
      let req = {
        ...params,
      };
      const response = await requestCallPost(
        params?.id ? API_END_POINTS.UPDATE_TOOL : API_END_POINTS.CREATE_TOOL,
        req
      );
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

  const deleteTool = async (params) => {
    try {
      const response = await requestCallPost(
        API_END_POINTS.DELETE_TOOL,
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
    fetchToolList,
    toolList,
    handleChange,
    params,
    setParams,
    addTool,
    formError,
    setFormError,
    deleteTool,
    BLANK_MODULE,
  };
};

export default useTools;
