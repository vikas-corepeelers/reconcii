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

  const handleFormChanges = (tool, name, value) => {
    let localToolModule = { ...organizationModuleMapping };
    localToolModule = {
      ...localToolModule,
      [parseInt(tool)]: {
        ...localToolModule[parseInt(tool)],
        [name]: value,
      },
    };
    setOrganizationModuleMapping(localToolModule);
  };

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
          [parseInt(tool)]: {
            modules: [0],
          },
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
        let moduleArray = localToolModule[tool]?.modules;
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
          [parseInt(tool)]: {
            ...localToolModule[parseInt(tool)],
            modules: moduleArray,
          },
        };
      } else {
        localToolModule = {
          ...localToolModule,
          [parseInt(tool)]: {
            ...localToolModule[parseInt(tool)],
            modules: [module],
          },
        };
      }
      setOrganizationModuleMapping(localToolModule);
    }
  };

  const transformData = (data) => {
    const result = {};

    data.forEach(({ tool_id, module_id }) => {
      if (!result[tool_id]) {
        result[tool_id] = { modules: [] };
      }
      result[tool_id].modules?.push(parseInt(module_id));
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
        if (response.data?.Data?.tools?.length > 0) {
          let tool = transformData(response.data?.Data?.tools);

          response.data?.Data?.subscriber_details?.forEach(
            (subscriber_detail) => {
              tool[subscriber_detail?.tool_id] = {
                ...tool[subscriber_detail?.tool_id],
                organization_id: subscriber_detail?.organization_id,
                tool_id: subscriber_detail?.tool_id,
                start_date: subscriber_detail?.start_date,
                end_date: subscriber_detail?.end_date,
                secret_key: subscriber_detail?.secret_key,
                auto_renew: subscriber_detail?.auto_renew ? 1 : 0,
                renew_in_every: subscriber_detail?.renew_in_every,
              };
            }
          );

          setOrganizationModuleMapping(tool);
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  const validateRequest = () => {
    let requestObj = { ...organizationModuleMapping };
    let toolIds = Object.keys(requestObj);
    let status = true;

    toolIds?.map((toolId) => {
      let tool = requestObj[toolId];
      if (
        tool?.start_date &&
        tool?.end_date &&
        tool?.secret_key &&
        tool?.auto_renew !== undefined &&
        tool?.auto_renew !== ""
      ) {
        if (
          parseInt(tool?.auto_renew) === 1 &&
          (tool?.renew_in_every === undefined || tool?.renew_in_every === "")
        ) {
          status = false;
          setToastMessage({
            message: "Please select auto renewal time.",
            type: "error",
          });
        } else if (tool?.start_date > tool?.end_date) {
          status = false;
          setToastMessage({
            message: "Invalid subscription dates",
            type: "error",
          });
        } else if (tool?.secret_key?.length < 16) {
          status = false;
          setToastMessage({
            message: "Secret Key should be minimum 16 character long.",
            type: "error",
          });
        }
      } else {
        status = false;
        setToastMessage({
          message: "Please fill all subscription details",
          type: "error",
        });
      }
    });

    return status;
  };

  const updateMapping = async () => {
    try {
      let requestStatus = validateRequest();
      console.log("requestStatus", requestStatus);
      if (!requestStatus) {
        return;
      }

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
    handleFormChanges,
  };
};

export default useToolModule;
