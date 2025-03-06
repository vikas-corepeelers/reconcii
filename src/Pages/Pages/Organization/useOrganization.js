import React, { useState } from "react";
import API_END_POINTS from "../../../ServiceRequest/APIEndPoints";
import {
  requestCallGet,
  requestCallPost,
} from "../../../ServiceRequest/APIFunctions";
import { useLoader } from "../../../Utils/Loader";
import {
  isValidPassword,
  validateEmail,
  validateMobile,
} from "../../../Utils/UtilityFunctions";

const BLANK_MODULE = {
  organization_unit_name: "",
  organization_full_name: "",
  domain_name: "",
  address: "",
  logo_url: "",
  status: 1,
  username: "",
  email: "",
  password: "",
  mobile: "",
};

const BLANK_DASHBOARD = {
  active_users: 0,
  inactive_users: 0,
  total_groups: 0,
  total_modules: 0,
  total_users: 0,
};

const useOrganization = () => {
  const { setLoading, setToastMessage } = useLoader();
  const [params, setParams] = useState(BLANK_MODULE);
  const [formError, setFormError] = useState(null);
  const [organizationList, setOrganizationList] = useState([]);
  const [organizationToolList, setOrganizationToolList] = useState([]);
  const [dashboard, setDashboard] = useState([]);
  const handleChange = (name, val) => {
    if (formError !== null) {
      setFormError(null);
    }
    setParams({ ...params, [name]: val });
  };

  const fetchOrganizationList = async (params) => {
    try {
      const response = await requestCallGet(API_END_POINTS.GET_ORGANIZATION);
      if (response.status) {
        setOrganizationList(response.data?.Data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const addOrganization = async () => {
    try {
      if (params?.organization_unit_name?.trim() === "") {
        setFormError({ organization_unit_name: "Please enter Unit Name" });
        return;
      }
      if (params?.organization_full_name?.trim() === "") {
        setFormError({
          organization_full_name: "Please enter Organization Name",
        });
        return;
      }
      if (params?.address?.trim() === "") {
        setFormError({ address: "Please enter Organization Address" });
        return;
      }

      if (params?.id) {
        // Organization updating
      } else {
        // Organization Adding
        if (params?.username?.trim()?.length < 6) {
          setFormError({ username: "Minimum username 6 character long." });
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
      }

      setLoading(true);
      let req = {
        ...params,
      };
      const response = await requestCallPost(
        params?.id
          ? API_END_POINTS.UPDATE_ORGANIZATION
          : API_END_POINTS.ADD_ORGANIZATION,
        req
      );
      setLoading(false);
      if (response.status) {
        return true;
      } else {
        if (response?.message?.data?.field) {
          setFormError({
            [response?.message?.data?.field]:
              response?.message?.data?.message || "Something went wrong.",
          });
        } else {
          setFormError({
            organization_unit_name: "Organization Unit Name already exist.",
          });
        }
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const deleteOrganization = async (params) => {
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

  const assignToolsToOrganization = async (orgId) => {
    try {
      setLoading(true);
      let req = {
        organization_id: orgId,
        tool_ids: organizationToolList,
      };
      const response = await requestCallPost(
        API_END_POINTS.UPDATE_ORGANIZATION_TOOLS,
        req
      );
      setLoading(false);
      if (response.status) {
        return true;
      } else {
        setFormError({
          organization_unit_name: "Organization Unit Name already exist.",
        });
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const fetchOrganizationDashboard = async (params) => {
    try {
      const response = await requestCallPost(
        API_END_POINTS.GET_ORGANIZATION_DASHBOARD,
        params
      );
      if (response.status) {
        setDashboard(response.data?.Data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return {
    fetchOrganizationList,
    organizationList,
    handleChange,
    params,
    setParams,
    addOrganization,
    formError,
    setFormError,
    deleteOrganization,
    BLANK_MODULE,
    organizationToolList,
    setOrganizationToolList,
    assignToolsToOrganization,
    fetchOrganizationDashboard,
    dashboard,
  };
};

export default useOrganization;
