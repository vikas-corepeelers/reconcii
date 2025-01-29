import React, { useEffect } from "react";
import BlankCard from "../../../components/BlankCard";

import "./reports.style.css";
import useGroups from "./useGroups";
import { useNavigate } from "react-router-dom";
import PrimaryButton from "../../../components/PrimaryButton";
import OutlineButton from "../../../components/OutlineButton";

export default function Modules() {
  const navigate = useNavigate();
  const { fetchGroupList, groupList } = useGroups();

  useEffect(() => {
    fetchGroupList();
  }, []);

  const showGroupDesc = (group) => {
    navigate("/admin/groups/description", { state: { group } });
  };

  const createGroup = () => {
    navigate("/admin/groups/create");
  };

  return (
    <div className="">
      <BlankCard
        header={<h4 className="box-title font-bold text-base">MODULES</h4>}
        rightAction={
          <div className="fixed-right-action-div">
            <OutlineButton label={"CREATE MODULE"} onClick={createGroup} />
          </div>
        }
      >
        <div className="pt-3 w-full">
          <div className="relative overflow-x-auto mt-2 mb-2 custom-table-style">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col">Group Name</th>
                  <th scope="col">Created On</th>
                  <th scope="col">Assign To</th>
                  <th scope="col">Updated</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {groupList?.map((group) => {
                  return (
                    <tr key={group?.id}>
                      {Object.keys(group?.groupUsers).length > 0 ? (
                        <td>
                          <a
                            href="/"
                            onClick={(e) => {
                              e.preventDefault();
                              showGroupDesc(group);
                            }}
                          >
                            {group?.name}
                          </a>
                        </td>
                      ) : (
                        <td>{group?.name}</td>
                      )}
                      <td>{group?.added}</td>
                      <td>0</td>
                      <td>{group?.updated}</td>
                      <td>
                        <div className="flex gap-2">
                          <button>
                            <span className="material-icons-outlined mr-2">
                              {"edit"}
                            </span>
                          </button>
                          <button>
                            <span
                              className="material-icons-outlined mr-2"
                              style={{ color: "#ff0000" }}
                            >
                              {"delete"}
                            </span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </BlankCard>
    </div>
  );
}
