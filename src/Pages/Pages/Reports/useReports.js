import React, { useState } from "react";
import { apiEndpoints } from "../../../ServiceRequest/APIEndPoints";
import {
  requestCallGet,
  requestCallPost,
} from "../../../ServiceRequest/APIFunctions";
import { useDispatch } from "react-redux";

const useReports = () => {
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
        params
      );
      let res = response?.response;
      const { data = "" } = res || {};
      const contentType = res?.header?.["content-type"];
      const contentDisposition = res?.headers["content-disposition"];
      const fileNameMatch =
        contentDisposition && contentDisposition.match(/filename="(.+)"/);
      const fileName = fileNameMatch ? fileNameMatch[1] : record?.fileName;
      downloadReportsFun(data, fileName, contentType);
    } catch (error) {
      console.error(error);
    }
    return [];
  };

  const downloadMissingMappedStores = async (tender) => {
    try {
      let params = {
        threepo: tender?.toLowerCase(),
      };
      const response = await requestCallGet(
        `${apiEndpoints.DOWNLOAD_MISSING_STORE_MAPPING}/threepo`,
        params,
        { responseType: "blob" }
      );
      let res = response?.response;
      const { data = "" } = res || {};
      const contentType = res?.header?.["content-type"];
      const contentDisposition = res?.headers["content-disposition"];
      const fileNameMatch =
        contentDisposition && contentDisposition.match(/filename="(.+)"/);
      const fileName = fileNameMatch ? fileNameMatch[1] : record?.fileName;
      downloadReportsFun(data, fileName, contentType);
    } catch (error) {
      console.error(error);
    }
    return [];
  };

  const downloadReportsFun = (
    data,
    fileName,
    type = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
  ) => {
    const blob = new Blob([data], { type: type });
    const downloadLink = document.createElement("a");
    downloadLink.href = window.URL.createObjectURL(blob);
    downloadLink.download = fileName;
    downloadLink.click();
  };

  return {
    generatedReports,
    fetchGeneratedReports,
    downloadGeneratedReports,
    downloadMissingMappedStores,
  };
};

export default useReports;
