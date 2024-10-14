import React from "react";
import "./Auth.css";
import CustomInput from "../../components/CustomInput";
import useAuth from "./useAuth";
import Alert from "../../components/Alert";
import AuthLogo from "./AuthLogo";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const {     
    forgotPasswordParams,
    forgotPasswordErrors,
    handleForgotPasswordParamsChanges, 
    doForgotPassword 
  } = useAuth();

  return (
    <div>
      <div className="login-container">
        <div className="login-box">
          <p className="text-xl text-black mb-2">FORGOT PASSWORD</p>
          <p className="text-sm text-black mb-4">
            Please enter your registered email
          </p>
          {forgotPasswordErrors?.status && (
            <Alert type="error" message={forgotPasswordErrors?.status} />
          )}
          <CustomInput
            type="email"
            placeholder="User Id"
            value={forgotPasswordParams?.username}
            onChange={(e) => handleForgotPasswordParamsChanges("username", e.target.value)}
            error={forgotPasswordErrors?.username}
          />
          <CustomInput
            type="email"
            placeholder="Email"
            value={forgotPasswordParams?.emailId}
            onChange={(e) => handleForgotPasswordParamsChanges("emailId", e.target.value)}
            error={forgotPasswordErrors?.emailId}
          />
          <button type="submit" className="login-button mb-2" onClick={doForgotPassword}>
            SUBMIT
          </button>
          <a
            href="/"
            onClick={(e) => {
              e.preventDefault();
              navigate("/");
            }}
            className="forgot-password"
          >
            Login
          </a>
        </div>
      </div>
      <AuthLogo />
    </div>
  );
};

export default ForgotPassword;
