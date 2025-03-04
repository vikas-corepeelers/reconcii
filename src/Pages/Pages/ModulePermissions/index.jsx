import React, { useEffect, useState } from "react";
import BlankCard from "../../../components/BlankCard";
import OutlineButton from "../../../components/OutlineButton";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import useModulePermissions from "./useModulePermissions";
import useModule from "../Modules/useModule";

export default function ModulePermission() {
  const params = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const {
    fetchGroupModules,
    updateMapping,
    modulePermissionMapping,
    handleChange,
  } = useModulePermissions(params?.group_id);
  const { fetchModuleList, moduleList } = useModule();
  useEffect(() => {
    if (params?.group_id) {
      fetchGroupModules({ group_id: params?.group_id });
      let tool_id = localStorage.getItem("activeTool") || 1;
      fetchModuleList({ tool_id: tool_id });
    } else {
      navigate("/dashboard");
    }
  }, []);

  return (
    <div className="">
      <BlankCard
        withBackButton
        onBackClick={() => navigate(-1)}
        header={
          <h4 className="box-title font-bold text-base">
            GROUP MODULES MAPPING
          </h4>
        }
        rightAction={
          <div className="fixed-right-action-div">
            <OutlineButton label={"UPDATE"} onClick={updateMapping} />
          </div>
        }
      >
        <div className="pt-3 w-full">
          <p className="text-base">
            Group Name: <b>{searchParams.get("group_name")}</b>
          </p>
        </div>
        {moduleList?.map((module) => {
          return (
            <Module
              key={module.id}
              module={module}
              handleChange={handleChange}
              modulePermissionMapping={modulePermissionMapping}
            />
          );
        })}
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
