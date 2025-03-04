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

const useToolModule = (organizationId) => {
  const { setLoading, setToastMessage } = useLoader();
  const [params, setParams] = useState(BLANK_PERMISSION);
  const [formError, setFormError] = useState(null);
  const [organizationModuleMapping, setOrganizationModuleMapping] = useState(
    {}
  );

  const handleChange = (type, tool, module = 0) => {
    if (type === "tool") {
      // Get array of object Keys
      let selectedTools = [];
      let localToolModule = { ...organizationModuleMapping };
      try {
        selectedTools = Object.keys(localToolModule);
      } catch (e) {
        console.error(e);
      }
      if (selectedTools?.includes(tool?.toString())) {
        delete localToolModule[tool?.toString()];
      } else {
        localToolModule = {
          ...localToolModule,
          [parseInt(tool)]: [0],
        };
      }
      setOrganizationModuleMapping(localToolModule);
    } else {
      // Get array of object Keys
      let selectedTools = [];
      let localToolModule = { ...organizationModuleMapping };
      try {
        selectedTools = Object.keys(localToolModule);
      } catch (e) {
        console.error(e);
      }
      if (selectedTools?.includes(tool?.toString())) {
        let moduleArray = localToolModule[tool];
        let moduleIndex = moduleArray?.findIndex(
          (moduleIds) => moduleIds === module
        );
        if (moduleIndex === -1) {
          moduleArray?.push(module);
        } else {
          moduleArray?.splice(moduleIndex, 1);
        }
        localToolModule = {
          ...localToolModule,
          [parseInt(tool)]: moduleArray,
        };
      } else {
        localToolModule = {
          ...localToolModule,
          [parseInt(tool)]: [module],
        };
      }
      setOrganizationModuleMapping(localToolModule);
    }
  };

  const transformData = (data) => {
    const result = {};

    data.forEach(({ tool_id, module_id }) => {
      if (!result[tool_id]) {
        result[tool_id] = [];
      }
      result[tool_id].push(parseInt(module_id));
    });

    return result; // Wrapping in an array as per your request
  };

  const fetchOrganizationModules = async (params) => {
    try {
      const response = await requestCallPost(
        API_END_POINTS.GET_ORGANIZATION_MODULES,
        params
      );
      if (response.status) {
        if (response.data?.Data?.length > 0) {
          setOrganizationModuleMapping(transformData(response.data?.Data));
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
        organization_id: organizationId,
        organization_module_mapping: organizationModuleMapping,
      };

      const response = await requestCallPost(
        API_END_POINTS.UPDATE_ORGANIZATION_MODULE_MAPPING,
        req
      );
      setLoading(false);
      if (response.status) {
        setToastMessage({
          message: "Mapping successfully updated.",
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
    fetchOrganizationModules,
    handleChange,
    params,
    setParams,
    updateMapping,
    formError,
    setFormError,
    organizationModuleMapping,
    setOrganizationModuleMapping,
  };
};

export default useToolModule;
