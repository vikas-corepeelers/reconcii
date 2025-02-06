import React, { useEffect } from "react";
import PrimaryButton from "../../../components/PrimaryButton";
import OutlineButton from "../../../components/OutlineButton";
import CustomInput from "../../../components/Input";
import useModule from "./useModule";
const AddUpdateModal = ({ isOpen, onClose, onSuccess }) => {
  const {
    addModule,
    handleChange,
    params,
    setParams,
    formError,
    setFormError,
  } = useModule();

  useEffect(() => {
    if (isOpen === true) {
      setParams({ module_name: "" });
    } else if (isOpen?.module_name) {
      setParams(isOpen);
    } else {
      setFormError(null);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const submitForm = async () => {
    let status = await addModule();
    if (status) {
      onSuccess();
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-semibold mb-4">
          {isOpen?.id ? "Update" : "Add"} Module
        </h2>
        <CustomInput
          label="Module Name"
          required
          extraSpace
          value={params?.module_name}
          onChange={(e) => handleChange("module_name", e.target.value)}
          error={formError?.module_name}
        />
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
