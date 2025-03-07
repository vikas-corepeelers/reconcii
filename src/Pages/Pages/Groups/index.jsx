import React, { useEffect, useState } from "react";
import BlankCard from "../../../components/BlankCard";

import OutlineButton from "../../../components/OutlineButton";
import AddUpdateModal from "./AddUpdateModal";
import { useLoader } from "../../../Utils/Loader";
import EditButton from "../../../components/EditButton";
import DeleteButton from "../../../components/DeleteButton";
import useGroup from "./useGroup";
import ConfirmationPopup from "../../../components/ConfirmationPopup";
import ManageButton from "../../../components/ManageButton";
import { useNavigate } from "react-router-dom";

export default function Groups() {
  const navigate = useNavigate();
  const { setToastMessage } = useLoader();
  const [isOpen, setIsOpen] = useState(false);
  const [removeRecordId, setRemoveRecordId] = useState(0);
  const { fetchGroupList, groupList, deleteGroup } = useGroup();

  useEffect(() => {
    let tool_id = localStorage.getItem("activeTool") || 1;
    fetchGroupList({ tool_id: tool_id });
  }, []);

  const onSuccess = () => {
    let tool_id = localStorage.getItem("activeTool") || 1;
    fetchGroupList({ tool_id: tool_id });

    setIsOpen(false);
    setToastMessage({
      message: "Group details successfully added/updated.",
      type: "success",
    });
  };

  const confirmRemove = async () => {
    let status = await deleteGroup({ id: removeRecordId });
    if (status) {
      setRemoveRecordId(0);
      setToastMessage({
        message: "Group successfully removed.",
        type: "success",
      });
      let tool_id = localStorage.getItem("activeTool") || 1;
      fetchGroupList({ tool_id: tool_id });
    }
  };

  return (
    <div className="">
      <BlankCard
        header={<h4 className="box-title font-bold text-base">GROUPS</h4>}
        rightAction={
          <div className="fixed-right-action-div">
            <OutlineButton
              label={"CREATE GROUP"}
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
                  <th scope="col">Group Name</th>
                  <th scope="col" style={{ textAlign: "center" }}>
                    Total Users
                  </th>
                  <th scope="col" style={{ textAlign: "center" }}>
                    Total Modules
                  </th>
                  <th scope="col" style={{ textAlign: "center" }}>
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {groupList?.map((group) => {
                  return (
                    <tr key={group?.id}>
                      <td>{group?.group_name}</td>
                      <td>
                        <div className="flex gap-2 justify-center items-center">
                          {group?.users?.length} No(s).
                          <ManageButton
                            label={"List"}
                            disabled={group?.users?.length === 0}
                            onClick={() =>
                              navigate("/groups/users/list", {
                                state: { users: group?.users },
                              })
                            }
                          />
                        </div>
                      </td>
                      <td>
                        <div className="flex gap-2 justify-center items-center">
                          {group?.group_module_mapping?.length} No(s).
                          <ManageButton
                            label={"Manage"}
                            onClick={() =>
                              navigate(
                                "/groups/modules/" +
                                  group?.id +
                                  "?group_name=" +
                                  group?.group_name
                              )
                            }
                          />
                        </div>
                      </td>
                      <td style={{ width: "120px" }}>
                        <div className="flex gap-2 justify-center">
                          <EditButton onClick={() => setIsOpen(group)} />
                          <DeleteButton
                            onClick={() => setRemoveRecordId(group?.id)}
                          />
                        </div>
                      </td>
                    </tr>
                  );
                })}
                {groupList?.length === 0 && (
                  <tr>
                    <td colSpan={4}>
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
        title="Remove Group?"
        message="Are you sure to remove this group?"
        onConfirm={confirmRemove}
        onCancel={() => setRemoveRecordId(0)}
        visible={removeRecordId > 0 ? true : false}
      />
    </div>
  );
}
