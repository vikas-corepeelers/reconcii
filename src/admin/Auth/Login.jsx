import React from "react";
import "./Auth.css";
import CustomInput from "../../components/CustomInput";
import useAuth from "./useAuth";
import Alert from "../../components/Alert";
import { useNavigate } from "react-router-dom";
import AuthLogo from "./AuthLogo";
const Login = () => {
  const navigate = useNavigate();
  const { loginParams, loginErrors, handleLoginParamsChanges, doLogin } =
    useAuth();

  return (
    <div>
      <div className="login-container">
        <div className="login-box">
          <div className="admin-login-label">
            <p className="text-xl">ADMIN LOGIN</p>
          </div>
          <p className="text-sm text-black mb-4">
            Please log in to your account
          </p>
          {loginErrors?.status && (
            <Alert type="error" message={loginErrors?.status} />
          )}
          <CustomInput
            type="email"
            placeholder="Username"
            value={loginParams?.username}
            onChange={(e) =>
              handleLoginParamsChanges("username", e.target.value)
            }
            error={loginErrors?.username}
          />
          <CustomInput
            type="password"
            name={"password"}
            placeholder="Password"
            value={loginParams?.password}
            onChange={(e) =>
              handleLoginParamsChanges("password", e.target.value)
            }
            error={loginErrors?.password}
          />
          <button type="submit" className="login-button mb-2" onClick={doLogin}>
            Login
          </button>
          <a
            href="/"
            onClick={(e) => {
              e.preventDefault();
              navigate("/forgot-password");
            }}
            className="forgot-password"
          >
            Forgot your password?
          </a>
        </div>
      </div>
      <AuthLogo />
    </div>
  );
};

export default Login;
