import React, { useEffect, useState } from "react";
import BlankCard from "../../../components/BlankCard";
import OutlineButton from "../../../components/OutlineButton";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import CustomInput from "../../../components/CustomInput";
import useGroup from "../Groups/useGroup";
import useUsers from "./useUsers";
import useModule from "../Modules/useModule";

export default function ManageUser() {
  const urlParams = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const {
    BLANK_USER,
    params,
    setParams,
    handleChange,
    formError,
    addUser,
    modulePermissionMapping,
    setModulePermissionMapping,
    handlePermissionChange,
  } = useUsers();
  const { fetchGroupList, groupList } = useGroup();
  const { fetchModuleList, moduleList } = useModule();
  useEffect(() => {
    let tool_id = localStorage.getItem("activeTool") || 1;
    let organization_id = localStorage.getItem("Organization") || 1;
    if (urlParams?.id) {
      setParams(location?.state?.user);
    } else {
      setParams({
        ...BLANK_USER,
        tool_id: tool_id,
        organization_id: organization_id,
      });
    }
    fetchGroupList({ tool_id: tool_id });

    fetchModuleList({ tool_id: tool_id });
  }, []);

  return (
    <div className="">
      <BlankCard
        withBackButton
        onBackClick={() => navigate(-1)}
        header={
          <h4 className="box-title font-bold text-base">
            {urlParams?.id ? "UPDATE USER" : "ADD USER"}
          </h4>
        }
        rightAction={
          <div className="fixed-right-action-div">
            <OutlineButton
              label={urlParams?.id ? "UPDATE" : "ADD"}
              onClick={addUser}
            />
          </div>
        }
      >
        <div className="mt-10" />
        <div className="flex gap-8">
          <div className="flex-1">
            <CustomInput
              label="Username"
              name={"username"}
              placeholder="Enter Username"
              required
              onChange={(e) => handleChange("username", e.target.value)}
              value={params?.username}
              error={formError?.username}
              disabled={urlParams?.id}
            />
          </div>
          <div className="flex-1">
            <CustomInput
              label="Name"
              name={"name"}
              placeholder="Enter Name"
              required
              onChange={(e) => handleChange("name", e.target.value)}
              value={params?.name}
              error={formError?.name}
            />
          </div>
        </div>
        <div className="flex gap-8">
          <div className="flex-1">
            <CustomInput
              label="Email"
              name={"email"}
              placeholder="Enter Email"
              required
              onChange={(e) => handleChange("email", e.target.value)}
              value={params?.email}
              error={formError?.email}
              disabled={urlParams?.id}
            />
          </div>
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
        </div>
        <div className="flex gap-8">
          <div className="flex-1">
            <p style={{ color: "#000000" }}>Account Status</p>
            <div className="flex gap-4">
              <div className="flex justify-start items-center gap-2">
                <input
                  type="radio"
                  style={{ boxShadow: "none" }}
                  onChange={() => null}
                  checked={params?.active}
                  onClick={() => handleChange("active", true)}
                />
                <p className="text-nowrap">Active</p>
              </div>
              <div className="flex justify-start items-center gap-2">
                <input
                  type="radio"
                  style={{ boxShadow: "none" }}
                  onChange={() => null}
                  checked={!params?.active}
                  onClick={() => handleChange("active", false)}
                />
                <p className="text-nowrap">De-activated</p>
              </div>
            </div>
          </div>
        </div>
        {urlParams?.id ? null : (
          <div className="flex gap-8">
            <div className="flex-1">
              <CustomInput
                label="Password"
                name={"password"}
                placeholder="Enter Password"
                required
                onChange={(e) => handleChange("password", e.target.value)}
                value={params?.password}
                error={formError?.password}
              />
              <p style={{ fontSize: "10px", marginTop: "-10px" }}>
                Password must have 1 special character, number, capital letter
                and minimum 8 character long.
              </p>
            </div>
            <div className="flex-1"></div>
          </div>
        )}
        <div className="mt-3">
          <p style={{ color: "#000000" }}>
            Group <span className="required">*</span>
          </p>

          <div>
            {groupList?.map((group) => {
              return (
                <div className="col-md-3 flex items-start mt-2" key={group.id}>
                  <div className="flex justify-start items-center gap-2">
                    <input
                      type="radio"
                      style={{ boxShadow: "none" }}
                      onChange={() => null}
                      checked={params?.group_id === group.id || false}
                      onClick={() => handleChange("group_id", group.id)}
                    />
                    <p className="text-nowrap">{group?.group_name}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </BlankCard>
    </div>
  );
}
