import React, { useEffect, useState } from "react";
import BlankCard from "../../../components/BlankCard";
import OutlineButton from "../../../components/OutlineButton";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import useGroup from "../Groups/useGroup";
import useUsers from "./useUsers";
import useModule from "../Modules/useModule";
import PrimaryButton from "../../../components/PrimaryButton";

export default function UserLevelPermission() {
  const urlParams = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const {
    modulePermissionMapping,
    handlePermissionChange,
    updateMapping,
    fetchUserModules,
  } = useUsers();
  const { fetchModuleList, moduleList } = useModule();
  useEffect(() => {
    fetchUserModules({ user_id: location?.state?.user?.id });
    let tool_id = localStorage.getItem("activeTool") || 1;
    fetchModuleList({ tool_id: tool_id });
  }, []);

  return (
    <div className="">
      <BlankCard
        withBackButton
        onBackClick={() => navigate(-1)}
        header={
          <h4 className="box-title font-bold text-base">
            USER LEVEL PERMISSIONS
          </h4>
        }
        rightAction={
          <div className="fixed-right-action-div flex gap-2">
            <OutlineButton
              label={"UPDATE"}
              onClick={() => updateMapping(location?.state?.user?.id)}
            />
            <PrimaryButton
              label={"CLEAR & SAVE"}
              style={{ width: "200px" }}
              onClick={() => updateMapping(location?.state?.user?.id, true)}
            />
          </div>
        }
      >
        <div className="mt-10" />
        <p style={{ color: "#000000", fontSize: "16px" }} className="my-2">
          Name: {location?.state?.user?.name}
        </p>
        <div className="p-3 override-permission-box">
          {moduleList?.map((module) => {
            return (
              <Module
                key={module.id}
                module={module}
                handleChange={handlePermissionChange}
                modulePermissionMapping={modulePermissionMapping}
              />
            );
          })}
        </div>
      </BlankCard>
    </div>
  );
}

const Module = ({ module, handleChange, modulePermissionMapping }) => {
  const [open, setOpen] = useState();
  return (
    <div className="module-mapping">
      <button className="module-tab" onClick={() => setOpen(!open)}>
        <div className="flex-1 items-start justify-start mt-1">
          <p>{module?.module_name}</p>
        </div>
        <div className="flex justify-center items-center w-24 mt-2">
          <input
            type="checkbox"
            style={{ boxShadow: "none" }}
            onChange={() => null}
            checked={
              Object.keys(modulePermissionMapping)?.includes(
                module?.id?.toString()
              ) || false
            }
            onClick={() => handleChange("module", parseInt(module?.id))}
          />
        </div>
        <div className="mt-1">
          <span className="material-icons-outlined">
            {open ? "keyboard_arrow_up" : "keyboard_arrow_down"}
          </span>
        </div>
      </button>
      {module?.permissions?.length > 0 && open && (
        <div className="row mt-2">
          {module?.permissions?.map((permission) => {
            return (
              <div className="col-md-3 flex items-start" key={permission.id}>
                <div className="flex justify-start items-center gap-2">
                  <input
                    type="checkbox"
                    style={{ boxShadow: "none" }}
                    onChange={() => null}
                    checked={
                      modulePermissionMapping[module?.id]?.includes(
                        permission.id
                      ) || false
                    }
                    onClick={() =>
                      handleChange(
                        "permission",
                        parseInt(module?.id),
                        parseInt(permission.id)
                      )
                    }
                  />
                  <p className="text-nowrap">{permission?.permission_name}</p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
