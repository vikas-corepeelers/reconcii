import React, { useEffect, useState } from "react";
import BlankCard from "../../../components/BlankCard";

import OutlineButton from "../../../components/OutlineButton";
import AddUpdateModal from "./AddUpdateModal";
import { useLoader } from "../../../Utils/Loader";
import EditButton from "../../../components/EditButton";
import DeleteButton from "../../../components/DeleteButton";
import useGroup from "./useGroup";

export default function Groups() {
  const { setToastMessage } = useLoader();
  const [isOpen, setIsOpen] = useState(false);
  const { fetchGroupList, groupList } = useGroup();

  useEffect(() => {
    fetchGroupList();
  }, []);

  const onSuccess = () => {
    setIsOpen(false);
    fetchGroupList();
    setToastMessage({
      message: "Group details successfully added/updated.",
      type: "success",
    });
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
                  <th scope="col">Total Users</th>
                  <th scope="col" style={{ textAlign: "center" }}>
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {groupList?.map((module) => {
                  return (
                    <tr key={module?.id}>
                      <td>{module?.group_name}</td>
                      <td>{module?.permissions?.length}</td>
                      <td style={{ width: "120px" }}>
                        <div className="flex gap-2 justify-center">
                          <EditButton onClick={() => setIsOpen(module)} />
                          {/* <DeleteButton /> */}
                        </div>
                      </td>
                    </tr>
                  );
                })}
                {groupList?.length === 0 && (
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
