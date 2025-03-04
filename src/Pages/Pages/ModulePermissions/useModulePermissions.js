import { useState } from "react";
import API_END_POINTS from "../../../ServiceRequest/APIEndPoints";
import { requestCallPost } from "../../../ServiceRequest/APIFunctions";
import { useLoader } from "../../../Utils/Loader";

const BLANK_PERMISSION = {
  permission_name: "",
  permission_code: "",
  module_id: "",
  tool_id: 1,
};

const useModulePermissions = (groupId) => {
  const { setLoading, setToastMessage } = useLoader();
  const [params, setParams] = useState(BLANK_PERMISSION);
  const [formError, setFormError] = useState(null);
  const [modulePermissionMapping, setModulePermissionMapping] = useState({});

  const handleChange = (type, module, permission = 0) => {
    if (type === "module") {
      // Get array of object Keys
      let selectedModules = [];
      let localModulePermission = { ...modulePermissionMapping };
      try {
        selectedModules = Object.keys(localModulePermission);
      } catch (e) {
        console.error(e);
      }
      if (selectedModules?.includes(module?.toString())) {
        delete localModulePermission[module?.toString()];
      } else {
        localModulePermission = {
          ...localModulePermission,
          [parseInt(module)]: [0],
        };
      }
      setModulePermissionMapping(localModulePermission);
    } else {
      // Get array of object Keys
      let selectedModules = [];
      let localModulePermission = { ...modulePermissionMapping };
      try {
        selectedModules = Object.keys(localModulePermission);
      } catch (e) {
        console.error(e);
      }
      if (selectedModules?.includes(module?.toString())) {
        let permissionArray = localModulePermission[module];
        let permissionIndex = permissionArray?.findIndex(
          (permissionIds) => permissionIds === permission
        );
        if (permissionIndex === -1) {
          permissionArray?.push(permission);
        } else {
          permissionArray?.splice(permissionIndex, 1);
        }
        localModulePermission = {
          ...localModulePermission,
          [module]: permissionArray,
        };
      } else {
        localModulePermission = {
          ...localModulePermission,
          [parseInt(module)]: [permission],
        };
      }
      setModulePermissionMapping(localModulePermission);
    }
  };

  const transformData = (data) => {
    const result = {};

    data.forEach(({ module_id, permission_id }) => {
      if (!result[module_id]) {
        result[module_id] = [];
      }
      result[module_id].push(parseInt(permission_id));
    });

    return result; // Wrapping in an array as per your request
  };

  const fetchGroupModules = async (params) => {
    try {
      const response = await requestCallPost(
        API_END_POINTS.GET_GROUP_MODULES,
        params
      );
      if (response.status) {
        if (response.data?.Data?.length > 0) {
          setModulePermissionMapping(transformData(response.data?.Data));
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  const updateMapping = async () => {
    try {
      setLoading(true);
      let req = {
        group_id: groupId,
        module_permission_mapping: modulePermissionMapping,
      };

      const response = await requestCallPost(
        API_END_POINTS.UPDATE_GROUP_MODULE_MAPPING,
        req
      );
      setLoading(false);
      if (response.status) {
        setToastMessage({
          message: "Group Module successfully mapped.",
          type: "success",
        });
      } else {
        setFormError({
          permission_code:
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
    fetchGroupModules,
    handleChange,
    params,
    setParams,
    updateMapping,
    formError,
    setFormError,
    modulePermissionMapping,
    setModulePermissionMapping,
  };
};

export default useModulePermissions;
