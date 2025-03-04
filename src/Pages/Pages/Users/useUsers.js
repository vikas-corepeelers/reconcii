import { useState } from "react";
import API_END_POINTS from "../../../ServiceRequest/APIEndPoints";
import { requestCallPost } from "../../../ServiceRequest/APIFunctions";
import { useLoader } from "../../../Utils/Loader";
import {
  isValidPassword,
  validateEmail,
  validateMobile,
} from "../../../Utils/UtilityFunctions";
import { useNavigate } from "react-router-dom";

const BLANK_USER = {
  username: "",
  name: "",
  email: "",
  mobile: "",
  password: "",
  group_id: "",
  tool_id: 1,
};

const useUsers = () => {
  const navigate = useNavigate();
  const { setLoading, setToastMessage } = useLoader();
  const [params, setParams] = useState(BLANK_USER);
  const [formError, setFormError] = useState(null);
  const [userList, setUserList] = useState([]);

  const [passwordParams, setPasswordParams] = useState({ password: "" });
  const [passwordFormError, setPasswordFormError] = useState(null);

  const [modulePermissionMapping, setModulePermissionMapping] = useState({});

  const handleChange = (name, val) => {
    if (formError !== null) {
      setFormError(null);
    }
    setParams({ ...params, [name]: val });
  };

  const handlePermissionChange = (type, module, permission = 0) => {
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

  const fetchUserList = async (params) => {
    try {
      const response = await requestCallPost(
        API_END_POINTS.GET_USER_LIST,
        params
      );
      if (response.status) {
        setUserList(response.data?.Data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const addUser = async () => {
    try {
      if (params?.username?.trim() === "") {
        setFormError({ username: "Please enter username." });
        return;
      }
      if (params?.name?.trim() === "") {
        setFormError({ name: "Please enter name." });
        return;
      }
      if (!validateEmail(params?.email)) {
        setFormError({ email: "Please enter valid email." });
        return;
      }
      if (!validateMobile(params?.mobile)) {
        setFormError({ mobile: "Please enter mobile" });
        return;
      }
      if (!params?.id) {
        if (!isValidPassword(params?.password)) {
          setFormError({
            password:
              "Password must have 1 special character, number, capital letter and minimum 8 character long.",
          });
          return;
        }
      }
      if (params?.group_id === "") {
        setToastMessage({
          message: "Please select group.",
          type: "error",
        });
        return;
      }
      setLoading(true);
      let req = {
        ...params,
        tool_id: localStorage.getItem("activeTool") || 1,
      };
      const response = await requestCallPost(
        params?.id ? API_END_POINTS.UPDATE_USER : API_END_POINTS.CREATE_USER,
        req
      );
      setLoading(false);
      if (response.status) {
        setToastMessage({
          message: params?.id
            ? "User details successfully updated!"
            : "New user created successfully!",
          type: "success",
        });
        navigate(-1);
      } else {
        if (response?.message?.data?.field) {
          setFormError({
            [response?.message?.data?.field]:
              response?.message?.data?.message || "Something went wrong.",
          });
        } else {
          setToastMessage({
            message:
              response?.message?.data?.message || "Something went wrong.",
            type: "error",
          });
        }
        return;
      }
    } catch (error) {
      console.log("error", error);
    } finally {
      setLoading(false);
    }
  };

  const deleteGroup = async (params) => {
    try {
      const response = await requestCallPost(
        API_END_POINTS.DELETE_GROUP,
        params
      );
      if (response.status) {
        return true;
      }
    } catch (error) {
      console.error(error);
    }
    return false;
  };

  const handlePasswordFormChange = (name, val) => {
    if (passwordFormError !== null) {
      setPasswordFormError(null);
    }
    setPasswordParams({ ...passwordParams, [name]: val });
  };

  const updatePassword = async () => {
    try {
      if (!isValidPassword(passwordParams?.password)) {
        setPasswordFormError({
          password:
            "Password must have 1 special character, number, capital letter and minimum 8 character long.",
        });
        return;
      }

      setLoading(true);
      let req = {
        ...passwordParams,
      };
      const response = await requestCallPost(
        API_END_POINTS.UPDATE_PASSWORD,
        req
      );
      setLoading(false);
      if (response.status) {
        return true;
      } else {
        setPasswordFormError({
          password: response?.message?.data?.message || "Something went wrong.",
        });
        return;
      }
    } catch (error) {
      console.log("error", error);
    } finally {
      setLoading(false);
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

  const fetchUserModules = async (params) => {
    try {
      const response = await requestCallPost(
        API_END_POINTS.GET_USER_MODULES,
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

  const updateMapping = async (userId, override = false) => {
    try {
      setLoading(true);
      let req = {
        user_id: userId,
        module_permission_mapping: override ? {} : modulePermissionMapping,
      };
      setModulePermissionMapping({});
      const response = await requestCallPost(
        API_END_POINTS.UPDATE_USER_MODULE_MAPPING,
        req
      );
      setLoading(false);
      if (response.status) {
        setToastMessage({
          message: "User permission successfully updated.",
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
    fetchUserList,
    userList,
    handleChange,
    params,
    setParams,
    addUser,
    formError,
    setFormError,
    deleteGroup,
    BLANK_USER,
    handlePasswordFormChange,
    passwordParams,
    setPasswordParams,
    updatePassword,
    passwordFormError,
    setPasswordFormError,
    modulePermissionMapping,
    setModulePermissionMapping,
    handlePermissionChange,
    fetchUserModules,
    updateMapping,
  };
};

export default useUsers;
