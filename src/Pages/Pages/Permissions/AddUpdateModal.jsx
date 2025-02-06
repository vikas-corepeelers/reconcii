import React, { useEffect } from "react";
import PrimaryButton from "../../../components/PrimaryButton";
import OutlineButton from "../../../components/OutlineButton";
import CustomInput from "../../../components/Input";
import usePermissions from "./usePermissions";
const AddUpdateModal = ({ isOpen, onClose, onSuccess, moduleId }) => {
  const {
    addPermission,
    handleChange,
    params,
    setParams,
    formError,
    setFormError,
  } = usePermissions();

  useEffect(() => {
    if (isOpen === true) {
      setParams({
        permission_name: "",
        permission_code: "",
        module_id: moduleId,
      });
    } else if (isOpen?.permission_name) {
      setParams(isOpen);
    } else {
      setFormError(null);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const submitForm = async () => {
    let status = await addPermission();
    if (status) {
      onSuccess();
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-semibold mb-4">
          {isOpen?.id ? "Update" : "Add"} Permission
        </h2>
        <CustomInput
          label="Permission Name"
          required
          extraSpace
          value={params?.permission_name}
          onChange={(e) => handleChange("permission_name", e.target.value)}
          error={formError?.permission_name}
        />
        <CustomInput
          label="Permission Code"
          required
          extraSpace
          value={params?.permission_code}
          onChange={(e) => handleChange("permission_code", e.target.value)}
          error={formError?.permission_code}
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
