import React, { useEffect, useState } from "react";
import BlankCard from "../../../components/BlankCard";

import OutlineButton from "../../../components/OutlineButton";
import AddUpdateModal from "./AddUpdateModal";
import { useLoader } from "../../../Utils/Loader";
import EditButton from "../../../components/EditButton";
import DeleteButton from "../../../components/DeleteButton";
import ManageButton from "../../../components/ManageButton";
import { useNavigate } from "react-router-dom";
import ConfirmationPopup from "../../../components/ConfirmationPopup";
import useTools from "./useTools";
import StatusBox from "../../Components/StatusBox";

export default function Tools() {
  const navigate = useNavigate();
  const { setToastMessage } = useLoader();
  const [isOpen, setIsOpen] = useState(false);
  const [removeRecordId, setRemoveRecordId] = useState(0);
  const { fetchToolList, toolList, deleteTool } = useTools();

  useEffect(() => {
    fetchToolList();
  }, []);

  const onSuccess = () => {
    setIsOpen(false);
    fetchToolList();
    setToastMessage({
      message: "Tool details successfully added/updated.",
      type: "success",
    });
  };

  const confirmRemove = async () => {
    let status = await deleteTool({ id: removeRecordId });
    if (status) {
      setRemoveRecordId(0);
      setToastMessage({
        message: "Tool successfully removed.",
        type: "success",
      });
      fetchToolList();
    }
  };

  return (
    <div className="">
      <BlankCard
        header={<h4 className="box-title font-bold text-base">TOOLS</h4>}
        rightAction={
          <div className="fixed-right-action-div">
            <OutlineButton
              label={"CREATE TOOL"}
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
                  <th scope="col">Tool Name</th>
                  <th scope="col">Image</th>
                  <th scope="col">Introduction URL</th>
                  <th scope="col" style={{ textAlign: "center" }}>
                    Status
                  </th>
                  <th scope="col" style={{ textAlign: "center" }}>
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {toolList?.map((tool) => {
                  return (
                    <tr key={tool?.id}>
                      <td>{tool?.tool_name}</td>
                      <td></td>
                      <td>{tool?.tool_url}</td>
                      <td>
                        <div className="flex justify-center">
                          <StatusBox
                            statusList={{
                              false: {
                                label: "In-active",
                                bgColor: "#ff8080",
                              },
                              true: {
                                label: "Active",
                                bgColor: "#4caf50",
                              },
                            }}
                            statusValue={tool?.tool_status}
                          />
                        </div>
                      </td>
                      <td style={{ width: "150px" }}>
                        <div className="flex gap-2 justify-center">
                          <EditButton onClick={() => setIsOpen(tool)} />
                          <DeleteButton
                            onClick={() => setRemoveRecordId(tool?.id)}
                          />
                        </div>
                      </td>
                    </tr>
                  );
                })}
                {toolList?.length === 0 && (
                  <tr>
                    <td colSpan={5}>
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
      <ConfirmationPopup
        title="Remove Tool?"
        message="Are you sure to remove this tool?"
        onConfirm={confirmRemove}
        onCancel={() => setRemoveRecordId(0)}
        visible={removeRecordId > 0 ? true : false}
      />
    </div>
  );
}
