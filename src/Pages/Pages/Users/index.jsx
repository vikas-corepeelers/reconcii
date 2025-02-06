import React, { useEffect } from "react";
import BlankCard from "../../../components/BlankCard";

import "./reports.style.css";
import useUsers from "./useUsers";
import { useNavigate } from "react-router-dom";

export default function Users() {
  const navigate = useNavigate();
  const { fetchUserList, userList } = useUsers();

  useEffect(() => {
    fetchUserList();
  }, []);

  const showGroupDesc = (group) => {
    navigate("/admin/groups/description", { state: { group } });
  };

  return (
    <div className="">
      <BlankCard
        header={<h4 className="box-title font-bold text-base">USERS</h4>}
      >
        <div className="pt-3 w-full">
          <div className="relative overflow-x-auto mt-2 mb-2 custom-table-style">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col">Name</th>
                  <th scope="col">Status</th>
                </tr>
              </thead>
              <tbody>
                {userList?.map((group) => {
                  return (
                    <tr key={group?.id}>
                      <td>{group?.name}</td>
                      <td>
                        {group?.active ? (
                          <span className="user active">Active</span>
                        ) : (
                          <span className="user inactive">Inactive</span>
                        )}
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
