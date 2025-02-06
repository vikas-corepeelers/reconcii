import React from "react";

const CustomInput = (props) => {
  return (
    <div className={props.extraSpace && "mb-3"}>
      {props.label && (
        <label className="block text-color-black text-sm font-bold mb-2">
          {props.label}{" "}
          {props.required && <span style={{ color: "#ff0000" }}>*</span>}
        </label>
      )}
      <input
        {...props}
        className={
          "w-full px-3 py-2 border border-Background-light rounded-lg" +
          (props.error ? "bg-red-50 border border-red-500 text-red-900" : "") +
          (props.disabled ? " bg-Background-light text-Background-light" : "")
        }
      />
      {props.error && (
        <span className="text-box-error-text">{props.error}</span>
      )}
    </div>
  );
};

export default CustomInput;
