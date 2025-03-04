import React from "react";
import BlankCard from "../../../components/BlankCard";

import { useLocation, useNavigate } from "react-router-dom";

export default function GroupUserList() {
  const location = useLocation();
  const navigate = useNavigate();
  return (
    <div className="">
      <BlankCard
        withBackButton
        onBackClick={() => navigate(-1)}
        header={<h4 className="box-title font-bold text-base">USERS</h4>}
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
                </tr>
              </thead>
              <tbody>
                {location?.state?.users?.map((group) => {
                  return (
                    <tr key={group?.id}>
                      <td>{group?.username}</td>
                      <td>{group?.name}</td>
                      <td>{group?.email}</td>
                      <td>{group?.mobile}</td>
                    </tr>
                  );
                })}
                {location?.state?.users?.length === 0 && (
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
    </div>
  );
}
