import React, { useEffect, useState } from "react";
import BlankCard from "../../../components/BlankCard";

import OutlineButton from "../../../components/OutlineButton";
import { useLoader } from "../../../Utils/Loader";
import EditButton from "../../../components/EditButton";
import DeleteButton from "../../../components/DeleteButton";
import ConfirmationPopup from "../../../components/ConfirmationPopup";
import { useNavigate } from "react-router-dom";
import useUsers from "./useUsers";
import StatusBox from "../../Components/StatusBox";
import ChangePasswordModal from "./ChangePasswordModal";
import MiscIconButton from "../../../components/MiscIconButton";

export default function Users() {
  const navigate = useNavigate();
  const { setToastMessage } = useLoader();
  const [isOpen, setIsOpen] = useState(false);
  const [removeRecordId, setRemoveRecordId] = useState(0);
  const { fetchUserList, userList, deleteGroup } = useUsers();

  useEffect(() => {
    let tool_id = localStorage.getItem("activeTool") || 1;
    let organization_id = localStorage.getItem("Organization") || 1;
    fetchUserList({ tool_id: tool_id, organization_id: organization_id });
  }, []);

  const onSuccess = () => {
    let tool_id = localStorage.getItem("activeTool") || 1;
    let organization_id = localStorage.getItem("Organization") || 1;
    fetchUserList({ tool_id: tool_id, organization_id: organization_id });
    setIsOpen(false);
    setToastMessage({
      message: "Password successfully updated.",
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
      fetchUserList({ tool_id: tool_id });
    }
  };

  return (
    <div className="">
      <BlankCard
        header={<h4 className="box-title font-bold text-base">USERS</h4>}
        rightAction={
          <div className="fixed-right-action-div">
            <OutlineButton
              label={"ADD USER"}
              onClick={() => navigate("/users/add")}
            />
          </div>
        }
      >
        <div className="pt-3 w-full">
          <div className="relative overflow-x-auto mt-2 mb-2 custom-table-style">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col">Username</th>
                  <th scope="col">Name</th>
                  <th scope="col">Email</th>
                  <th scope="col">Mobile</th>
                  <th scope="col">Group</th>
                  <th scope="col" style={{ textAlign: "center" }}>
                    {/* Total Users */}
                  </th>
                  <th scope="col" style={{ textAlign: "center" }}>
                    Status
                  </th>
                  <th scope="col" style={{ textAlign: "center" }}>
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {userList?.map((user) => {
                  return (
                    <tr key={user?.id}>
                      <td>{user?.username}</td>
                      <td>{user?.name}</td>
                      <td>{user?.email}</td>
                      <td>{user?.mobile}</td>
                      <td>{user?.groups?.group_name}</td>
                      <td></td>
                      <td className="flex justify-center">
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
                          statusValue={user?.active}
                        />
                      </td>
                      <td style={{ width: "120px" }}>
                        <div className="flex gap-2 justify-center">
                          <MiscIconButton
                            icon={"key"}
                            onClick={() => setIsOpen(user)}
                          />
                          <MiscIconButton
                            icon="checklist"
                            onClick={() =>
                              navigate("/users/permissions/" + user?.id, {
                                state: { user },
                              })
                            }
                          />
                          <EditButton
                            onClick={() =>
                              navigate("/users/edit/" + user?.id, {
                                state: { user },
                              })
                            }
                          />
                          <DeleteButton
                            onClick={() => setRemoveRecordId(user?.id)}
                          />
                        </div>
                      </td>
                    </tr>
                  );
                })}
                {userList?.length === 0 && (
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
      <ChangePasswordModal
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
