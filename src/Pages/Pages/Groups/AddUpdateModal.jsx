import React, { useEffect } from "react";
import PrimaryButton from "../../../components/PrimaryButton";
import OutlineButton from "../../../components/OutlineButton";
import CustomInput from "../../../components/Input";
import useGroup from "./useGroup";
const AddUpdateModal = ({ isOpen, onClose, onSuccess }) => {
  const { addGroup, handleChange, params, setParams, formError, setFormError } =
    useGroup();

  useEffect(() => {
    if (isOpen === true) {
      setParams({ group_name: "" });
    } else if (isOpen?.group_name) {
      setParams(isOpen);
    } else {
      setFormError(null);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const submitForm = async () => {
    let status = await addGroup();
    if (status) {
      onSuccess();
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-semibold mb-4">
          {isOpen?.id ? "Update" : "Add"} Group
        </h2>
        <CustomInput
          label="Group Name"
          required
          extraSpace
          value={params?.group_name}
          onChange={(e) => handleChange("group_name", e.target.value)}
          error={formError?.group_name}
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
