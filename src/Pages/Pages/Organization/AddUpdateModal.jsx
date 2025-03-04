import React, { useEffect } from "react";
import PrimaryButton from "../../../components/PrimaryButton";
import OutlineButton from "../../../components/OutlineButton";
import CustomInput from "../../../components/Input";
import useOrganization from "./useOrganization";
const AddUpdateModal = ({ isOpen, onClose, onSuccess }) => {
  const {
    addOrganization,
    handleChange,
    params,
    setParams,
    formError,
    setFormError,
    BLANK_MODULE,
  } = useOrganization();

  useEffect(() => {
    if (isOpen === true) {
      setParams(BLANK_MODULE);
    } else if (isOpen?.organization_unit_name) {
      setParams(isOpen);
    } else {
      setFormError(null);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const submitForm = async () => {
    let status = await addOrganization();
    if (status) {
      onSuccess();
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div
        className="bg-white p-6 rounded-lg shadow-lg"
        style={{ width: "60%" }}
      >
        <h2 className="text-xl font-semibold mb-4">
          {isOpen?.id ? "Update" : "Add"} Organization
        </h2>
        <div className="flex gap-3">
          <div className="flex-1">
            <CustomInput
              label="Unit Name"
              required
              extraSpace
              value={params?.organization_unit_name}
              onChange={(e) =>
                handleChange("organization_unit_name", e.target.value)
              }
              error={formError?.organization_unit_name}
            />
          </div>
          <div className="flex-1">
            <CustomInput
              label="Name"
              required
              extraSpace
              value={params?.organization_full_name}
              onChange={(e) =>
                handleChange("organization_full_name", e.target.value)
              }
              error={formError?.organization_full_name}
            />
          </div>
        </div>
        <div className="flex gap-3">
          <div className="flex-1">
            <CustomInput
              label="Domain Name"
              extraSpace
              value={params?.domain_name}
              onChange={(e) => handleChange("domain_name", e.target.value)}
              error={formError?.domain_name}
            />
          </div>
          <div className="flex-1">
            <CustomInput
              label="Address"
              required
              extraSpace
              value={params?.address}
              onChange={(e) => handleChange("address", e.target.value)}
              error={formError?.address}
            />
          </div>
        </div>
        <div className="flex gap-3">
          <div className="flex-1">
            <CustomInput
              label="Logo"
              extraSpace
              type="file"
              // value={params?.tool_url}
              // onChange={(e) => handleChange("tool_url", e.target.value)}
              // error={formError?.tool_url}
            />
          </div>
          <div className="flex-1">
            <div className="flex-1 mb-3">
              <p style={{ color: "#000000" }}>Status</p>
              <div className="flex gap-4 mt-3">
                <div className="flex justify-start items-center gap-2">
                  <input
                    type="radio"
                    style={{ boxShadow: "none" }}
                    onChange={() => null}
                    checked={params?.status}
                    onClick={() => handleChange("status", 1)}
                  />
                  <p className="text-nowrap">Active</p>
                </div>
                <div className="flex justify-start items-center gap-2">
                  <input
                    type="radio"
                    style={{ boxShadow: "none" }}
                    onChange={() => null}
                    checked={!params?.status}
                    onClick={() => handleChange("status", 0)}
                  />
                  <p className="text-nowrap">De-activate</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        {isOpen?.id ? null : (
          <div
            style={{
              border: "1px solid #ccc",
              backgroundColor: "#f5f5f5",
              borderRadius: "5px",
            }}
            className="p-2"
          >
            <p className="mb-2">ADMIN LOGIN CREDENTIALS</p>
            <div className="flex gap-3">
              <div className="flex-1">
                <CustomInput
                  label="Username"
                  extraSpace
                  value={params?.username}
                  onChange={(e) => handleChange("username", e.target.value)}
                  error={formError?.username}
                  required
                />
              </div>
              <div className="flex-1">
                <CustomInput
                  label="Email"
                  required
                  extraSpace
                  value={params?.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                  error={formError?.email}
                />
              </div>
            </div>
            <div className="flex gap-3">
              <div className="flex-1">
                <CustomInput
                  label="Mobile"
                  name={"mobile"}
                  placeholder="Enter Mobile"
                  required
                  onChange={(e) => handleChange("mobile", e.target.value)}
                  maxLength={10}
                  value={params?.mobile}
                  error={formError?.mobile}
                />
              </div>
              <div className="flex-1">
                <CustomInput
                  label="Password"
                  required
                  extraSpace
                  value={params?.password}
                  onChange={(e) => handleChange("password", e.target.value)}
                  error={formError?.password}
                />
              </div>
            </div>
          </div>
        )}
        <div className="flex">
          <div className="flex gap-2 items-start justify-start mt-5">
            <PrimaryButton
              label={isOpen?.id ? "Update" : "Add"}
              onClick={submitForm}
            />
            <OutlineButton label="Close" onClick={onClose} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddUpdateModal;
