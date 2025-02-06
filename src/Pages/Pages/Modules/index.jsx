import React, { useEffect, useState } from "react";
import BlankCard from "../../../components/BlankCard";

import OutlineButton from "../../../components/OutlineButton";
import useModule from "./useModule";
import AddUpdateModal from "./AddUpdateModal";
import { useLoader } from "../../../Utils/Loader";
import EditButton from "../../../components/EditButton";
import DeleteButton from "../../../components/DeleteButton";
import SecondaryButton from "../../../components/SecondaryButton";
import ManageButton from "../../../components/ManageButton";
import { useNavigate } from "react-router-dom";

export default function Modules() {
  const navigate = useNavigate();
  const { setToastMessage } = useLoader();
  const [isOpen, setIsOpen] = useState(false);
  const { fetchModuleList, moduleList } = useModule();

  useEffect(() => {
    let tool_id = localStorage.getItem("activeTool") || 1;
    fetchModuleList({ tool_id: tool_id });
  }, []);

  const onSuccess = () => {
    let tool_id = localStorage.getItem("activeTool") || 1;
    setIsOpen(false);
    fetchModuleList({ tool_id: tool_id });
    setToastMessage({
      message: "Module details successfully added/updated.",
      type: "success",
    });
  };

  return (
    <div className="">
      <BlankCard
        header={<h4 className="box-title font-bold text-base">MODULES</h4>}
        rightAction={
          <div className="fixed-right-action-div">
            <OutlineButton
              label={"CREATE MODULE"}
              onClick={() => setIsOpen(true)}
            />
          </div>
        }
      >
        <div className="pt-3 w-full">
          <div className="relative overflow-x-auto mt-2 mb-2 custom-table-style">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col">Module Name</th>
                  <th scope="col" style={{ textAlign: "center" }}>
                    Total Permissions
                  </th>
                  <th scope="col" style={{ textAlign: "center" }}>
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {moduleList?.map((module) => {
                  return (
                    <tr key={module?.id}>
                      <td>{module?.module_name}</td>
                      <td>
                        <div className="flex gap-2 justify-center items-center">
                          {module?.permissions?.length} No(s).
                          <ManageButton
                            label={"Manage"}
                            onClick={() =>
                              navigate(
                                "/modules/permissions/" +
                                  module?.id +
                                  "?module_name=" +
                                  module?.module_name
                              )
                            }
                          />
                        </div>
                      </td>
                      <td style={{ width: "150px" }}>
                        <div className="flex gap-2 justify-center">
                          <EditButton onClick={() => setIsOpen(module)} />
                          {/* <DeleteButton /> */}
                        </div>
                      </td>
                    </tr>
                  );
                })}
                {moduleList?.length === 0 && (
                  <tr>
                    <td colSpan={3}>
                      <p className="text-center">No record found</p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </BlankCard>
      <AddUpdateModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onSuccess={onSuccess}
      />
    </div>
  );
}
