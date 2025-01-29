import React from "react";
import "../Styles/AdminCardComponent.css";

export default function CardComponent({ label, number, icon }) {
  return (
    <div className="box">
      <div className="box-body">
        <div className="flex">
          <div className="flex-1">
            <p className="card-label">{label}</p>
            <p className="card-number">
              {number}
              <p className="lac-label"> Nos.</p>
            </p>
          </div>
          <div className="flex justify-end items-center">
            <div className="icon-box-admin shadow-black">
              <img src={icon} alt="icon" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
