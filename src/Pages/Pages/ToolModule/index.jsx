import React, { useEffect, useState } from "react";
import BlankCard from "../../../components/BlankCard";
import OutlineButton from "../../../components/OutlineButton";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import useToolModule from "./useToolModule";
import useTools from "../Tools/useTools";

export default function ToolModule() {
  const params = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const {
    fetchOrganizationModules,
    updateMapping,
    organizationModuleMapping,
    handleChange,
  } = useToolModule(params?.organization_id);
  const { fetchToolList, toolList } = useTools();
  useEffect(() => {
    if (params?.organization_id) {
      fetchOrganizationModules({ organization_id: params?.organization_id });
      // let tool_id = localStorage.getItem("activeTool") || 1;
      fetchToolList();
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
            ORGANIZATION MODULES MAPPING
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
            Organization Name: <b>{searchParams.get("organization_name")}</b>
          </p>
        </div>
        {toolList?.map((tool) => {
          return (
            <Tools
              key={tool.id}
              tool={tool}
              handleChange={handleChange}
              organizationModuleMapping={organizationModuleMapping}
            />
          );
        })}
      </BlankCard>
    </div>
  );
}

const Tools = ({ tool, handleChange, organizationModuleMapping }) => {
  const [open, setOpen] = useState();
  return (
    <div className="module-mapping">
      <button className="module-tab" onClick={() => setOpen(!open)}>
        <div className="flex-1 items-start justify-start mt-1">
          <p>{tool?.tool_name}</p>
        </div>
        <div className="flex justify-center items-center w-24 mt-2">
          <input
            type="checkbox"
            style={{ boxShadow: "none" }}
            onChange={() => null}
            checked={
              Object.keys(organizationModuleMapping)?.includes(
                tool?.id?.toString()
              ) || false
            }
            onClick={() => handleChange("tool", parseInt(tool?.id))}
          />
        </div>
        <div className="mt-1">
          <span className="material-icons-outlined">
            {open ? "keyboard_arrow_up" : "keyboard_arrow_down"}
          </span>
        </div>
      </button>
      {tool?.modules?.length > 0 && open && (
        <div className="row mt-2">
          {tool?.modules?.map((module) => {
            return (
              <div className="col-md-3 flex items-start" key={module.id}>
                <div className="flex justify-start items-center gap-2">
                  <input
                    type="checkbox"
                    style={{ boxShadow: "none" }}
                    onChange={() => null}
                    checked={
                      organizationModuleMapping[tool?.id]?.includes(
                        module.id
                      ) || false
                    }
                    onClick={() =>
                      handleChange(
                        "module",
                        parseInt(tool?.id),
                        parseInt(module.id)
                      )
                    }
                  />
                  <p className="text-nowrap">{module?.module_name}</p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
