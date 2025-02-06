import React from "react";
import "./common.components.style.css";
const ManageButton = (props) => {
  return (
    <button type="button" onClick={props.onClick} className="manage-btn">
      <div className="flex justify-center items-center">
        <span className="material-icons-outlined">list</span>
        {props.label}
      </div>
    </button>
  );
};

export default ManageButton;
