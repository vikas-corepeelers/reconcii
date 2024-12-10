import { useState } from "react";
import { apiEndpoints } from "../../../ServiceRequest/APIEndPoints";
import {
  requestCallGet,
  requestCallPost,
} from "../../../ServiceRequest/APIFunctions";
const useVouchers = () => {
  const [generatedReports, setGeneratedReports] = useState([]);
  const fetchGeneratedReports = async () => {
    try {
      const response = await requestCallPost(
        apiEndpoints.GET_ASYNC_GENERATE_REPORT_DATA,
        {}
      );
      if (response.status) {
        console.log(response?.data?.data);
        setGeneratedReports(response?.data?.data);
        // return response?.data?.data;
      }
    } catch (error) {
      console.error(error);
    }
    return [];
  };

  const downloadGeneratedReports = async (record) => {
    try {
      let params = {
        id: record?.id,
      };
      const response = await requestCallGet(
        apiEndpoints.DOWNLOAD_ASYNC_GENERATE_REPORT_DATA,
        params,
        {},
        { responseType: "blob" }
      );
      let res = response?.response;
      const { data = "" } = res || {};
      const fileName = record?.fileName;
      downloadReportsFun(data, fileName);
    } catch (error) {
      console.error(error);
    }
    return [];
  };

  const downloadMissingMappedStores = async (tender) => {
    let params = {
      threepo: tender?.toLowerCase(),
    };
    const response = await requestCallGet(
      `${apiEndpoints.DOWNLOAD_MISSING_STORE_MAPPING}/threepo`,
      params,
      {},
      { responseType: "blob" }
    );

    const fileName = "downloaded_file.xlsx";
    const data = response.data;
    downloadReportsFun(data, fileName);
  };

  const downloadReportsFun = (blob, fileName) => {
    const downloadLink = document.createElement("a");
    downloadLink.href = URL.createObjectURL(blob); // Creates an object URL for the Blob
    downloadLink.download = fileName; // Assign the file name
    downloadLink.click(); // Simulate the click to download the file
  };

  return {
    generatedReports,
    fetchGeneratedReports,
    downloadGeneratedReports,
    downloadMissingMappedStores,
  };
};

export default useVouchers;
