import React, { useState } from "react";
import CustomInput from "../../components/Input";
import PrimaryButton from "../../components/PrimaryButton";
import { useLocation, useNavigate } from "react-router-dom";
import useAuth from "../AdvertisersHooks/useAuth";
import { validateEmail } from "../../Utils/UtilityFunctions";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const {signIn} = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState(null);
  const [status, setStatus] = useState(0);

  const handleChange = (e) => {
    setErrors({});
    let { name, value } = e.target;
    if (name === "email") {
      setEmail(value);
    } else {
      setPassword(value);
    }
  };

  const submit = async () => {
    if (!validateEmail(email)) {
      setErrors({ email: "Please enter a valid email." });
      return;
    }

    let req = {
      password: password,
      adv_email: email,
    };
    let response = await signIn(req);
    if (response.status) {
      setStatus(1);
      localStorage.setItem("userType", 'advertiser');
      localStorage.setItem("accessToken", response?.accessToken);
      localStorage.setItem("managerId", response?.Content?.advertiser_id);
      localStorage.setItem(
        "managerName",
        response?.Content?.adv_name
      );
      localStorage.setItem(
        "managerEmail",
        response?.Content?.adv_email
      );
      navigate("/advertisers/dashboard");
    } else {
      setErrors({ otp: "Invalid Password." });
    }
  };

  return (
    <div className="content-area bg-white ">
      {/* <div className="w-full lg:w-2/3 flex justify-center">
      </div>   */}
      <div className="w-full lg:w-1/3 font-Roboto">
        <div className="form-area rounded-lg">
          <div className="flex justify-center mb-5">
            {/* <img src="logo.jpeg" alt="Scale Jobs Logo" className="h-20" /> */}
            <h6 className="font-bold">LOGO</h6>
          </div>
          <h2 className="text-Background-dark mb-3">Please login to your account</h2>
          {status === 1 && (
            <div
              className="p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400"
              role="alert"
            >
              <span className="font-medium">Congratulations!</span> OTP
              successfully verified.
            </div>
          )}
          {status === 2 && (
            <div
              className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
              role="alert"
            >
              <span className="font-medium">Error!</span> Invalid OTP.
            </div>
          )}
          <form action="#" method="POST">
            <div className="mb-4">
              <CustomInput
                label={"Email"}
                type="email"
                id="email"
                name="email"
                placeholder="Enter your email"
                onChange={handleChange}
                error={errors?.email}
                value={email}
              />
            </div>
            <div className="mb-4">
              <CustomInput
                label={"Password"}
                type="password"
                id="password"
                name="password"
                placeholder="* * * * * *"
                onChange={handleChange}
                error={errors?.password}
                value={password}
              />
            </div>
            <div>
              <PrimaryButton onClick={submit} label={"Submit"} />
            </div>
          </form>
        </div>
          <h1 className="text-Text-primary mt-10 text-center">Powered by CorePeelers</h1>
      </div>
    </div>
  );
};

export default Login;
