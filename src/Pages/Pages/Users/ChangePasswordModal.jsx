import React, { useEffect } from "react";
import PrimaryButton from "../../../components/PrimaryButton";
import OutlineButton from "../../../components/OutlineButton";
import CustomInput from "../../../components/Input";
import useUsers from "./useUsers";
const ChangePasswordModal = ({ isOpen, onClose, onSuccess }) => {
  const {
    handlePasswordFormChange,
    passwordParams,
    setPasswordParams,
    passwordFormError,
    updatePassword,
    setPasswordFormError,
  } = useUsers();

  useEffect(() => {
    if (isOpen?.id) {
      setPasswordParams({ id: isOpen?.id, password: "" });
      setPasswordFormError(null);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const submitForm = async () => {
    let status = await updatePassword();
    if (status) {
      onSuccess();
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-semibold mb-4">CHANGE PASSWORD</h2>
        <CustomInput
          label="New Password"
          required
          extraSpace
          value={passwordParams?.password}
          onChange={(e) => handlePasswordFormChange("password", e.target.value)}
          error={passwordFormError?.password}
        />
        <p style={{ fontSize: "10px", marginTop: "-10px" }}>
          Password must have 1 special character, number, capital letter and
          minimum 8 character long.
        </p>
        <div className="flex gap-2 items-start justify-start mt-4">
          <PrimaryButton label={"Update"} onClick={submitForm} />
          <OutlineButton label="Close" onClick={onClose} />
        </div>
      </div>
    </div>
  );
};

export default ChangePasswordModal;
