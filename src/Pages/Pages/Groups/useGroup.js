import React, { useState } from "react";
import API_END_POINTS from "../../../ServiceRequest/APIEndPoints";
import {
  requestCallGet,
  requestCallPost,
} from "../../../ServiceRequest/APIFunctions";
import { useLoader } from "../../../Utils/Loader";

const BLANK_GROUP = {
  group_name: "",
  tool_id: 1,
};

const useGroup = () => {
  const { setLoading } = useLoader();
  const [params, setParams] = useState(BLANK_GROUP);
  const [formError, setFormError] = useState(null);
  const [groupList, setGroupList] = useState([]);

  const handleChange = (name, val) => {
    if (formError !== null) {
      setFormError(null);
    }
    setParams({ ...params, [name]: val });
  };

  const fetchGroupList = async () => {
    try {
      const response = await requestCallGet(API_END_POINTS.GET_GROUP_LIST);
      if (response.status) {
        setGroupList(response.data?.Data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const addGroup = async () => {
    try {
      if (params?.group_name?.trim() === "") {
        setFormError({ group_name: "Please enter Group Name" });
        return;
      }
      setLoading(true);
      let req = {
        ...params,
        tool_id: localStorage.getItem("activeTool") || 1,
      };
      const response = await requestCallPost(API_END_POINTS.CREATE_GROUP, req);
      setLoading(false);
      if (response.status) {
        return true;
      } else {
        setFormError({
          group_name:
            response?.message?.data?.message || "Something went wrong.",
        });
        return;
      }
    } catch (error) {
      console.log("error", error);
    } finally {
      setLoading(false);
    }
  };

  return {
    fetchGroupList,
    groupList,
    handleChange,
    params,
    setParams,
    addGroup,
    formError,
    setFormError,
  };
};

export default useGroup;
