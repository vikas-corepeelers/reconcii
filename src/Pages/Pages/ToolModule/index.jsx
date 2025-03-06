import React, { useEffect, useState } from "react";
import BlankCard from "../../../components/BlankCard";
import OutlineButton from "../../../components/OutlineButton";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import useToolModule from "./useToolModule";
import useTools from "../Tools/useTools";
import CustomInput from "../../../components/CustomInput";
import CustomSelect from "../../../components/CustomSelect";

const RENEW_IN_EVERY = [
  { day: "", label: "-Select-" },
  { day: 7, label: "7 days" },
  { day: 15, label: "15 days" },
  { day: 0, label: "1st of every month" },
];

const AUTO_RENEW = [
  { value: "", label: "-Select-" },
  { value: 1, label: "Yes" },
  { value: 0, label: "No" },
];

export default function ToolModule() {
  const params = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const {
    fetchOrganizationModules,
    updateMapping,
    organizationModuleMapping,
    handleChange,
    handleFormChanges,
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
              handleFormChanges={handleFormChanges}
            />
          );
        })}
      </BlankCard>
    </div>
  );
}

const Tools = ({
  tool,
  handleChange,
  organizationModuleMapping,
  handleFormChanges,
}) => {
  const [open, setOpen] = useState();
  return (
    <div className="module-mapping">
      <button className="module-tab" onClick={() => setOpen(!open)}>
        <div className="flex-1 items-start justify-start mt-1">
          <p>{tool?.tool_name}</p>
        </div>
        <div className="flex justify-center items-center w-24">
          <input
            type="checkbox"
            style={{ boxShadow: "none" }}
            onChange={() => null}
            checked={
              Object.keys(organizationModuleMapping)?.includes(
                tool?.id?.toString()
              ) || false
            }
            onClick={(e) => {
              handleChange("tool", parseInt(tool?.id));
              e.stopPropagation();
            }}
          />
        </div>
        <div className="mt-1">
          <span className="material-icons-outlined">
            {open ? "keyboard_arrow_up" : "keyboard_arrow_down"}
          </span>
        </div>
      </button>
      {tool?.modules?.length > 0 && open && (
        <div className="licensing-details">
          <p className="title">Modules</p>
          <div
            className="row mt-2 p-2 m-0"
            style={{ backgroundColor: "#ffffff" }}
          >
            {tool?.modules?.map((module) => {
              return (
                <div className="col-md-3 flex items-start" key={module.id}>
                  <div className="flex justify-start items-center gap-2">
                    <input
                      type="checkbox"
                      style={{ boxShadow: "none" }}
                      onChange={() => null}
                      checked={
                        organizationModuleMapping[tool?.id]?.modules?.includes(
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
        </div>
      )}
      {open &&
        Object.keys(organizationModuleMapping)?.includes(
          tool?.id?.toString()
        ) && (
          <div className="licensing-details">
            <p className="title">Licensing Details</p>
            <div
              className="mt-2 flex gap-2 p-2"
              style={{ backgroundColor: "#ffffff" }}
            >
              <div className="flex-1">
                <CustomInput
                  label="Start Date"
                  type="date"
                  required
                  extraSpace
                  value={organizationModuleMapping[tool?.id]?.start_date}
                  onChange={(e) =>
                    handleFormChanges(
                      parseInt(tool?.id),
                      "start_date",
                      e.target.value
                    )
                  }
                  error={
                    organizationModuleMapping[tool?.id]?.errors?.start_date
                  }
                />
              </div>
              <div className="flex-1">
                <CustomInput
                  label="End Date"
                  type="date"
                  required
                  extraSpace
                  value={organizationModuleMapping[tool?.id]?.end_date}
                  onChange={(e) =>
                    handleFormChanges(
                      parseInt(tool?.id),
                      "end_date",
                      e.target.value
                    )
                  }
                  error={organizationModuleMapping[tool?.id]?.errors?.end_date}
                />
              </div>
              <div className="flex-1">
                <CustomInput
                  label="Secret Key"
                  type="text"
                  placeholder=""
                  required
                  extraSpace
                  maxLength={16}
                  value={organizationModuleMapping[tool?.id]?.secret_key}
                  onChange={(e) =>
                    handleFormChanges(
                      parseInt(tool?.id),
                      "secret_key",
                      e.target.value
                    )
                  }
                  error={
                    organizationModuleMapping[tool?.id]?.errors?.secret_key
                  }
                />
              </div>
              <div className="flex-1">
                <CustomSelect
                  label="Auto Renew"
                  type="text"
                  placeholder=""
                  required
                  extraSpace
                  data={AUTO_RENEW}
                  option_value={"value"}
                  option_label={"label"}
                  value={organizationModuleMapping[tool?.id]?.auto_renew}
                  onChange={(e) => {
                    handleFormChanges(
                      parseInt(tool?.id),
                      "auto_renew",
                      e.target.value
                    );
                  }}
                  error={
                    organizationModuleMapping[tool?.id]?.errors?.auto_renew
                  }
                />
              </div>
              {parseInt(organizationModuleMapping[tool?.id]?.auto_renew) ===
                1 && (
                <div className="flex-1">
                  <CustomSelect
                    label="Renew in every"
                    type="text"
                    placeholder=""
                    required
                    extraSpace
                    data={RENEW_IN_EVERY}
                    option_value={"day"}
                    option_label={"label"}
                    value={organizationModuleMapping[tool?.id]?.renew_in_every}
                    onChange={(e) =>
                      handleFormChanges(
                        parseInt(tool?.id),
                        "renew_in_every",
                        e.target.value
                      )
                    }
                    error={
                      organizationModuleMapping[tool?.id]?.errors
                        ?.renew_in_every
                    }
                  />
                </div>
              )}
            </div>
          </div>
        )}
    </div>
  );
};
