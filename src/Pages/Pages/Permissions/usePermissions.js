import { useState } from "react";
import API_END_POINTS from "../../../ServiceRequest/APIEndPoints";
import {
  requestCallGet,
  requestCallPost,
} from "../../../ServiceRequest/APIFunctions";
import { useLoader } from "../../../Utils/Loader";

const BLANK_PERMISSION = {
  permission_name: "",
  permission_code: "",
  module_id: "",
  tool_id: 1,
};

const usePermissions = () => {
  const { setLoading } = useLoader();
  const [params, setParams] = useState(BLANK_PERMISSION);
  const [formError, setFormError] = useState(null);
  const [permissionList, setPermissionList] = useState([]);

  const handleChange = (name, val) => {
    if (formError !== null) {
      setFormError(null);
    }
    setParams({ ...params, [name]: val });
  };

  const fetchPermissionList = async (params) => {
    try {
      const response = await requestCallPost(
        API_END_POINTS.GET_PERMISSION_LIST,
        params
      );
      if (response.status) {
        setPermissionList(response.data?.Data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const addPermission = async () => {
    try {
      if (params?.permission_name?.trim() === "") {
        setFormError({ permission_name: "Please enter Permission Name" });
        return;
      }
      if (params?.permission_code?.trim() === "") {
        setFormError({ permission_code: "Please enter Permission Code" });
        return;
      }
      setLoading(true);
      let req = {
        ...params,
        tool_id: localStorage.getItem("activeTool") || 1,
      };
      const response = await requestCallPost(
        API_END_POINTS.CREATE_PERMISSION,
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

  return {
    fetchPermissionList,
    permissionList,
    handleChange,
    params,
    setParams,
    addPermission,
    formError,
    setFormError,
  };
};

export default usePermissions;
