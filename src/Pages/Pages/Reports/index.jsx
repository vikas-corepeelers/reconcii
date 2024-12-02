import React, { useEffect, useRef, useState } from "react";
import BlankCard from "../../../components/BlankCard";

import "./reports.style.css";
import useReports from "./useReports";

const STATIC_REPORTS = [
  {
    id: "03",
    reportType: "POSVsTRM",
    startDate: "Nov 1 2023",
    endDate: "Nov 30 2023",
    fileSize: "14.12",
    status: "SUCCESS",
    createdAt: "28 Nov 24 14:58:09",
    fileName: "POSVsTRM_ALL_ALL_2023-11-01_2023-11-30.xlsx",
    file: "./Reports/POSVsTRM_ALL_ALL_2023-11-01_2023-11-30.xlsx",
  },
  {
    id: "01",
    reportType: "POSVsThreePO",
    startDate: "Nov 1 2023",
    endDate: "Nov 30 2023",
    fileSize: "1.91",
    status: "SUCCESS",
    createdAt: "28 Nov 24 12:51:19",
    fileName: "POSVsThreePO_ZOMATO_2023-11-01_2023-11-30.xlsx",
    file: "./Reports/POSVsThreePO_ZOMATO_2023-11-01_2023-11-30.xlsx",
  },
  {
    id: "02",
    reportType: "StoreSync",
    startDate: "Nov 1 2023",
    endDate: "Nov 30 2023",
    fileSize: "0.02",
    status: "SUCCESS",
    createdAt: "28 Nov 24 12:48:24",
    fileName: "StoreSync_ALL_ALL_2023-11-01_2023-11-30.xlsx",
    file: "./Reports/StoreSync_ALL_ALL_2023-11-01_2023-11-30.xlsx",
  },
];

export default function Reports() {
  const { generatedReports, fetchGeneratedReports, downloadGeneratedReports } =
    useReports();

  useEffect(() => {
    fetchGeneratedReports();
  }, []);

  const [file, setFile] = useState(null);
  const handleChange = (file) => {
    setFile(file);
  };

  const onSubmit = () => {};

  return (
    <div className="">
      <BlankCard
        header={<h4 className="box-title font-bold text-base">REPORTS</h4>}
      >
        <div className="pt-3 w-full">
          <p className="text-black-600">DOWNLOAD GENERATED REPORTS</p>
          <div className="relative overflow-x-auto mt-2 mb-2">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Report Type
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3"
                    // style={{ minWidth: "140px" }}
                  >
                    Start Date
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3"
                    // style={{ minWidth: "140px" }}
                  >
                    End Date
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3"
                    style={{ minWidth: "120px" }}
                  >
                    File Size (mb)
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Generation
                  </th>
                  <th scope="col" className="px-6 py-3">
                    File Name
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {STATIC_REPORTS?.map((report) => {
                  return (
                    <tr
                      key={report?.id}
                      className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                    >
                      <td className="px-6 py-4">{report?.reportType}</td>
                      <td className="px-6 py-4">{report?.startDate}</td>
                      <td className="px-6 py-4">{report?.endDate}</td>
                      <td className="px-6 py-4">{report?.fileSize} mb</td>
                      <td className="px-6 py-4">{report?.status}</td>
                      <td className="px-6 py-4">{report?.createdAt}</td>
                      <td className="px-6 py-4">{report?.fileName}</td>
                      <td className="px-6 py-4 flex justify-center items-center">
                        {/* <button
                          download
                          onClick={() => downloadGeneratedReports(report)}
                        >
                          <i className="fa-solid fa-download"></i>
                        </button> */}
                        <a href={`${report.file}`} download="myFile">
                          <i className="fa-solid fa-download"></i>
                        </a>
                      </td>
                    </tr>
                  );
                })}
                {generatedReports?.map((report) => {
                  return (
                    <tr
                      key={report?.id}
                      className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                    >
                      <td className="px-6 py-4">{report?.reportType}</td>
                      <td className="px-6 py-4">{report?.startDate}</td>
                      <td className="px-6 py-4">{report?.endDate}</td>
                      <td className="px-6 py-4">{report?.fileSize} mb</td>
                      <td className="px-6 py-4">{report?.status}</td>
                      <td className="px-6 py-4">{report?.createdAt}</td>
                      <td className="px-6 py-4">{report?.fileName}</td>
                      <td className="px-6 py-4 flex justify-center items-center">
                        <button
                          onClick={() => downloadGeneratedReports(report)}
                        >
                          <i className="fa-solid fa-download"></i>
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </BlankCard>
    </div>
  );
}
