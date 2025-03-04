import React, { useEffect } from "react";
import PrimaryButton from "../../../components/PrimaryButton";
import OutlineButton from "../../../components/OutlineButton";
import CustomInput from "../../../components/Input";
import useTools from "./useTools";
const AddUpdateModal = ({ isOpen, onClose, onSuccess }) => {
  const {
    addTool,
    handleChange,
    params,
    setParams,
    formError,
    setFormError,
    BLANK_MODULE,
  } = useTools();

  useEffect(() => {
    if (isOpen === true) {
      setParams(BLANK_MODULE);
    } else if (isOpen?.tool_name) {
      setParams(isOpen);
    } else {
      setFormError(null);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const submitForm = async () => {
    let status = await addTool();
    if (status) {
      onSuccess();
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-semibold mb-4">
          {isOpen?.id ? "Update" : "Add"} Tool
        </h2>
        <CustomInput
          label="Tool Name"
          required
          extraSpace
          value={params?.tool_name}
          onChange={(e) => handleChange("tool_name", e.target.value)}
          error={formError?.tool_name}
        />
        <CustomInput
          label="Tool URL"
          extraSpace
          value={params?.tool_url}
          onChange={(e) => handleChange("tool_url", e.target.value)}
          error={formError?.tool_url}
        />
        <CustomInput
          label="Logo"
          extraSpace
          type="file"
          // value={params?.tool_url}
          // onChange={(e) => handleChange("tool_url", e.target.value)}
          // error={formError?.tool_url}
        />
        <div className="flex-1 mb-3">
          <p style={{ color: "#000000" }}>Status</p>
          <div className="flex gap-4">
            <div className="flex justify-start items-center gap-2">
              <input
                type="radio"
                style={{ boxShadow: "none" }}
                onChange={() => null}
                checked={params?.tool_status}
                onClick={() => handleChange("tool_status", 1)}
              />
              <p className="text-nowrap">Active</p>
            </div>
            <div className="flex justify-start items-center gap-2">
              <input
                type="radio"
                style={{ boxShadow: "none" }}
                onChange={() => null}
                checked={!params?.tool_status}
                onClick={() => handleChange("tool_status", 0)}
              />
              <p className="text-nowrap">De-activate</p>
            </div>
          </div>
        </div>
        <div className="flex gap-2 items-start justify-start">
          <PrimaryButton
            label={isOpen?.id ? "Update" : "Add"}
            onClick={submitForm}
          />
          <OutlineButton label="Close" onClick={onClose} />
        </div>
      </div>
    </div>
  );
};

export default AddUpdateModal;
