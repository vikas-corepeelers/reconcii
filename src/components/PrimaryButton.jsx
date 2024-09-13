import React from "react";

const PrimaryButton = (props) => {
  return (
    <button
      type="button"
      onClick={props.onClick}
      disabled={props?.disabled}
      className={`w-full items-center justify-center flex gap-1 text-white py-2 px-2 rounded-md ${props?.disabled ? 'bg-Button-bgHiddenColor' : 'bg-Button-bgColor'}`}
    >
      {props.leftIcon}
      {props.label}
    </button>
  );
};

export default PrimaryButton;
