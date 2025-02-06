import { useSelector } from "react-redux";
import API_END_POINTS from "../ServiceRequest/APIEndPoints";
import { requestCallPost } from "../ServiceRequest/APIFunctions";

const useMakeLogs = () => {
  let userDetailedProfile = useSelector(
    (state) => state.CommonService.userDetailedProfile
  );
  const makeLog = async (action, url, serviceName = "java", reqData = {}) => {
    let reqParams = {
      serviceName: serviceName,
      userName: userDetailedProfile?.username,
      systemIp: "",
      url: url,
      action: action,
      reqData: JSON.stringify(reqData),
    };

    try {
      const response = await requestCallPost(
        API_END_POINTS.SAVE_AUDIT_LOG,
        reqParams
      );
      if (response.status) {
      }
    } catch (error) {
      console.error(error);
    }
  };

  return { makeLog };
};

export default useMakeLogs;
