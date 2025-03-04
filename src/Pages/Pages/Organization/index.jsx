import React, { useEffect, useState } from "react";
import BlankCard from "../../../components/BlankCard";

import OutlineButton from "../../../components/OutlineButton";
import AddUpdateModal from "./AddUpdateModal";
import { useLoader } from "../../../Utils/Loader";
import EditButton from "../../../components/EditButton";
import DeleteButton from "../../../components/DeleteButton";
import { useNavigate } from "react-router-dom";
import ConfirmationPopup from "../../../components/ConfirmationPopup";
import StatusBox from "../../Components/StatusBox";
import useOrganization from "./useOrganization";
import ManageButton from "../../../components/ManageButton";

export default function Organization() {
  const navigate = useNavigate();
  const { setToastMessage } = useLoader();
  const [isOpen, setIsOpen] = useState(false);
  const [toolsVisible, setToolsVisible] = useState(false);
  const [removeRecordId, setRemoveRecordId] = useState(0);
  const { fetchOrganizationList, organizationList, deleteOrganization } =
    useOrganization();

  useEffect(() => {
    fetchOrganizationList();
  }, []);

  const onSuccess = () => {
    setIsOpen(false);
    setToolsVisible(false);
    fetchOrganizationList();
    setToastMessage({
      message: "Organization details successfully added/updated.",
      type: "success",
    });
  };

  const confirmRemove = async () => {
    let status = await deleteOrganization({ id: removeRecordId });
    if (status) {
      setRemoveRecordId(0);
      setToastMessage({
        message: "Organization successfully removed.",
        type: "success",
      });
      fetchOrganizationList();
    }
  };

  return (
    <div className="">
      <BlankCard
        header={<h4 className="box-title font-bold text-base">ORGANIZATION</h4>}
        rightAction={
          <div className="fixed-right-action-div">
            <OutlineButton
              label={"ADD ORGANIZATION"}
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
                  <th scope="col">Unit Name</th>
                  <th scope="col">Full Name</th>
                  <th scope="col" style={{ textAlign: "center" }}>
                    Logo
                  </th>
                  <th scope="col" style={{ textAlign: "center" }}>
                    Tools
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
                {organizationList?.map((organization) => {
                  return (
                    <tr key={organization?.id}>
                      <td>{organization?.organization_unit_name}</td>
                      <td>{organization?.organization_full_name}</td>
                      <td></td>
                      <td>
                        <div className="flex gap-2 justify-center items-center">
                          {/* {organization?.organization_tool?.length} No(s). */}
                          <ManageButton
                            label={"Manage"}
                            onClick={() =>
                              navigate(
                                "/organization/tools/" +
                                  organization?.id +
                                  "?organization_name=" +
                                  organization?.organization_full_name
                              )
                            }
                          />
                        </div>
                      </td>
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
                            statusValue={organization?.status}
                          />
                        </div>
                      </td>
                      <td style={{ width: "150px" }}>
                        <div className="flex gap-2 justify-center">
                          <EditButton onClick={() => setIsOpen(organization)} />
                          {/* <DeleteButton
                            onClick={() => setRemoveRecordId(organization?.id)}
                          /> */}
                        </div>
                      </td>
                    </tr>
                  );
                })}
                {organizationList?.length === 0 && (
                  <tr>
                    <td colSpan={6}>
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
