import React from "react";
import "../Styles/AdminCardComponent.css";

export default function CardComponent({ label, number, icon }) {
  return (
    <div className="box">
      <div className="box-body-component">
        <div className="header flex">
          <div className="flex-1 flex justify-center items-center flex-col">
            {number} <span style={{ fontSize: "12px" }}> Nos.</span>
          </div>
          <div className="flex-1 flex justify-end items-center">
            <div className="icon-box-admin shadow-black">
              <img src={icon} alt="icon" />
            </div>
          </div>
        </div>
        <div className="card-title-box">{label}</div>
      </div>
    </div>
  );
}
