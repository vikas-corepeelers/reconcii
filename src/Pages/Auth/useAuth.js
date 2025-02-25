import React, { useState } from "react";
import { apiEndpoints } from "../../ServiceRequest/APIEndPoints";
import {
  requestCallGet,
  requestCallPost,
} from "../../ServiceRequest/APIFunctions";
import { generateDeviceCode } from "../../Utils/UtilityFunctions";
import { useDispatch } from "react-redux";
import {
  setUserDetailedProfile,
  setUserProfile,
} from "../../Redux/Slices/Common";
import { useNavigate } from "react-router-dom";
import { useLoader } from "../../Utils/Loader";
import useMakeLogs from "../../Hooks/useMakeLogs";
import LOG_ACTIONS from "../../Constants/LogAction";
const BLANK_LOGIN = {
  username: "",
  password: "",
};

const FORGOT_PASSWORD = {
  emailId: "",
  username: "",
};

const useAuth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { setLoading, setToastMessage } = useLoader();
  const [loginParams, setLoginParams] = useState(BLANK_LOGIN);
  const [loginErrors, setLoginErrors] = useState(null);
  const { makeLog } = useMakeLogs();
  const [forgotPasswordParams, setForgotPasswordParams] =
    useState(FORGOT_PASSWORD);
  const [forgotPasswordErrors, setForgotPasswordErrors] = useState(null);

  const handleLoginParamsChanges = (name, value) => {
    if (loginErrors !== null) {
      setLoginErrors(null);
    }
    setLoginParams({ ...loginParams, [name]: value });
  };

  const handleForgotPasswordParamsChanges = (name, value) => {
    if (forgotPasswordErrors !== null) {
      setForgotPasswordErrors(null);
    }
    setForgotPasswordParams({ ...forgotPasswordParams, [name]: value });
  };

  const doLogin = async () => {
    try {
      if (loginParams.username?.trim() === "") {
        setLoginErrors({ username: "Please enter your email address." });
        return;
      } else if (loginParams.password?.trim() === "") {
        setLoginErrors({ password: "Please enter your password." });
        return;
      }
      setLoading(true);
      let deviceId = generateDeviceCode();
      let additionalHeaders = {
        deviceId: deviceId,
      };
      const response = await requestCallPost(
        apiEndpoints.ACCESS_TOKEN,
        loginParams,
        additionalHeaders
      );
      setLoading(false);
      if (response.status) {
        let allowedModules = [];
        let allowedPermission = [];
        const decodedToken = decodeJWT(response.data?.data?.access_token);
        let userDetails = {};
        try {
          userDetails = JSON.parse(decodedToken?.USER_DETAILS);
          console.log("userDetails?.modules", userDetails?.modules);
          userDetails?.modules?.forEach((module) => {
            if (module?.permissions?.length > 0) {
              allowedPermission?.push(module?.permissions[0]?.permission_code);
            }
            allowedModules.push(module?.id);
          });
          allowedModules = [...new Set(allowedModules)];
        } catch (e) {
          //Error in decoding
          console.error(e);
        }

        localStorage.setItem("allowedModules", JSON.stringify(allowedModules));
        localStorage.setItem(
          "allowedPermission",
          JSON.stringify(allowedPermission)
        );

        localStorage.setItem(
          "ReconciiToken",
          response.data?.data?.access_token
        );
        localStorage.setItem(
          "ReconciiRefreshToken",
          response.data?.data?.refresh_token
        );
        localStorage.setItem(
          "userProfile",
          JSON.stringify(response.data?.data)
        );
        dispatch(setUserProfile(response.data?.data));
        makeLog(
          LOG_ACTIONS.LOGIN,
          apiEndpoints.ACCESS_TOKEN,
          {
            username: loginParams.username,
          },
          {},
          userDetails
        );
        fetchProfile();
        navigate("/dashboard");
        return;
      }
      setToastMessage({ message: "Invalid credentials!", type: "error" });
    } catch (error) {
      console.log(error);
      setToastMessage({ message: "Something went wrong!", type: "error" });
    }
  };

  const fetchProfile = async () => {
    try {
      const response = await requestCallGet(apiEndpoints.PROFILE);
      if (response.status) {
        dispatch(setUserDetailedProfile(response?.data?.data));
        localStorage.setItem(
          "userDetailedProfile",
          JSON.stringify(response.data?.data)
        );
      }
    } catch (error) {
      console.error(error);
    }
  };

  const decodeJWT = (token) => {
    const base64Url = token.split(".")[1]; // Extract payload
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/"); // Format it for decoding
    return JSON.parse(atob(base64)); // Decode base64 and parse JSON
  };

  const doForgotPassword = async () => {
    try {
      if (forgotPasswordParams.emailId?.trim() === "") {
        setLoginErrors({
          emailId: "Please enter your registered email address.",
        });
        return;
      } else if (forgotPasswordParams.username?.trim() === "") {
        setLoginErrors({ username: "Please enter your username." });
        return;
      }
      setLoading(true);
      const response = await requestCallPost(
        apiEndpoints.FORGOT_PASSWORD,
        forgotPasswordParams
      );
      setLoading(false);
      if (response.status) {
        setToastMessage({
          message: "New password shared on your registered email.",
          type: "success",
        });
        makeLog(
          "forgot_password",
          apiEndpoints.FORGOT_PASSWORD,
          "java",
          forgotPasswordParams
        );
        navigate("/");
        return;
      }
      setToastMessage({
        message: "Email or Username not mapped correctly.",
        type: "error",
      });
    } catch (error) {
      console.log(error);
      setToastMessage({ message: "Something went wrong!", type: "error" });
    }
  };

  return {
    loginParams,
    loginErrors,
    handleLoginParamsChanges,
    doLogin,
    fetchProfile,
    forgotPasswordParams,
    forgotPasswordErrors,
    handleForgotPasswordParamsChanges,
    doForgotPassword,
  };
};

export default useAuth;
