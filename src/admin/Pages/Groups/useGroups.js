import React, { useState } from "react";
import { apiEndpoints } from "../../../ServiceRequest/APIEndPoints";
import {
  requestCallGet,
  requestCallPost,
} from "../../../ServiceRequest/APIFunctions";

const BLANK_GROUP = {
  name: "",
  roles: [],
  users: [],
};

const useGroups = () => {
  const [params, setParams] = useState(BLANK_GROUP);
  const [groupList, setGroupList] = useState([]);
  const [roleList, setRoleList] = useState([]);
  const [userList, setUserList] = useState([]);

  const handleChange = (name, val) => {
    setParams({ ...params, [name]: val });
  };

  const fetchGroupList = async () => {
    try {
      const response = await requestCallGet(apiEndpoints.GROUPS_LIST);
      if (response.status) {
        setGroupList(response.data?.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const fetchAllUsers = async () => {
    try {
      const response = await requestCallGet(apiEndpoints.USERS_LIST);
      if (response.status) {
        setUserList(response.data?.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const fetchAllRoles = async () => {
    try {
      const response = await requestCallGet(apiEndpoints.ROLES_LIST);
      if (response.status) {
        setRoleList(response.data?.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return {
    fetchGroupList,
    groupList,
    fetchAllUsers,
    fetchAllRoles,
    roleList,
    userList,
    handleChange,
    params,
  };
};

export default useGroups;
