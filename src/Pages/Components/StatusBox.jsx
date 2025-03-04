import React from "react";
// import "./common.css";

const StatusBox = ({
  status,
  trueValue,
  falseValue,
  statusList = {},
  statusValue,
}) => {
  if (Object.keys(statusList).length === 0) {
    return (
      <div className={status ? "status-box active" : "status-box"}>
        {status ? trueValue || "Active" : falseValue || "Inactive"}
      </div>
    );
  }
  return (
    <div
      className={status ? "status-box active" : "status-box"}
      style={{ backgroundColor: statusList[statusValue]?.bgColor }}
    >
      {statusList[statusValue]?.label}
    </div>
  );
};

export default StatusBox;
