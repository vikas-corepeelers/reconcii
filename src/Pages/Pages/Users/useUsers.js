import React, { useState } from "react";
import API_END_POINTS from "../../../ServiceRequest/APIEndPoints";
import {
  requestCallGet,
  requestCallPost,
} from "../../../ServiceRequest/APIFunctions";

const useUsers = () => {
  const [userList, setUserList] = useState([]);

  const fetchUserList = async () => {
    try {
      const response = await requestCallGet(API_END_POINTS.USERS_LIST);
      if (response.status) {
        setUserList(response.data?.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return {
    fetchUserList,
    userList,
  };
};

export default useUsers;
