import React, { useEffect, useState } from "react";
import BlankCard from "../../../components/BlankCard";

import "./reports.style.css";
import { useLocation, useNavigate } from "react-router-dom";
import CustomTabs from "../../../Pages/Components/CustomTabs";

const DESCRIPTION_TABS = [
  { id: "group_users", label: "Group Users" },
  { id: "group_roles", label: "Group Roles" },
];

export default function GroupDescription() {
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState(DESCRIPTION_TABS[0]?.id);
  const location = useLocation();

  useEffect(() => {
    if (location.state?.group) {
    } else {
      navigate("/admin/groups");
    }
  }, []);

  return (
    <div className="">
      <BlankCard
        withBackButton
        onBackClick={() => navigate(-1)}
        header={
          <h4 className="box-title font-bold text-base">
            GROUPS {">"} DESCRIPTION
          </h4>
        }
      >
        <CustomTabs
          tabs={DESCRIPTION_TABS}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
        {activeTab === DESCRIPTION_TABS[0]?.id && (
          <GroupUsers locationState={location.state} />
        )}
        {activeTab === DESCRIPTION_TABS[1]?.id && (
          <GroupRoles locationState={location.state} />
        )}
      </BlankCard>
    </div>
  );
}

const GroupUsers = ({ locationState }) => {
  const [groupUsers, setGroupUsers] = useState([]);
  useEffect(() => {
    if (locationState?.group) {
      let groupUserIds = Object.keys(locationState?.group?.groupUsers);
      let users = groupUserIds?.map((userId) => {
        return {
          user_id: userId,
          group_name: locationState?.group?.name,
          user_name: locationState?.group?.groupUsers[userId],
        };
      });
      setGroupUsers(users);
    }
  }, []);
  return (
    <div className="w-full">
      <div className="relative overflow-x-auto mt-2 mb-2 custom-table-style">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col">Group Name</th>
              <th scope="col">Users</th>
            </tr>
          </thead>
          <tbody>
            {groupUsers?.map((group) => {
              return (
                <tr key={group?.id}>
                  <td>{group?.group_name}</td>
                  <td>{group?.user_name}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const GroupRoles = ({ locationState }) => {
  const [groupRoles, setGroupRoles] = useState([]);
  useEffect(() => {
    if (locationState?.group) {
      let groupRoleIds = Object.keys(locationState?.group?.groupRoles);
      let roles = groupRoleIds?.map((roleId) => {
        return {
          role_id: roleId,
          group_name: locationState?.group?.name,
          role_name: locationState?.group?.groupRoles[roleId],
        };
      });
      setGroupRoles(roles);
    }
  }, []);
  return (
    <div className="w-full">
      <div className="relative overflow-x-auto mt-2 mb-2 custom-table-style">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col">Group Name</th>
              <th scope="col">Roles</th>
            </tr>
          </thead>
          <tbody>
            {groupRoles?.map((group) => {
              return (
                <tr key={group?.role_id}>
                  <td>{group?.group_name}</td>
                  <td>{group?.role_name}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
