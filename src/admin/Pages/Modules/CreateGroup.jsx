import React, { useEffect } from "react";
import BlankCard from "../../../components/BlankCard";

import "./reports.style.css";
import useGroups from "./useGroups";
import { useNavigate } from "react-router-dom";
import OutlineButton from "../../../components/OutlineButton";
import CustomInput from "../../../components/CustomInput";

export default function CreateGroup() {
  const navigate = useNavigate();
  const {
    fetchAllUsers,
    fetchAllRoles,
    roleList,
    userList,
    handleChange,
    params,
  } = useGroups();

  useEffect(() => {
    fetchAllUsers();
    fetchAllRoles();
    // roleList
    // userList
    // handleChange,
    // params
  }, []);

  const showGroupDesc = (group) => {
    navigate("/admin/groups/description", { state: { group } });
  };

  const createGroup = () => {
    navigate("/admin/groups/create");
  };

  const handleUserSelection = (userId) => {
    let selectedUsers = [...params?.users];
    let activeIndex = selectedUsers?.findIndex((id) => parseInt(id) === userId);
    if (activeIndex === -1) {
      selectedUsers?.push(parseInt(activeIndex));
    } else {
      selectedUsers?.splice(activeIndex, 1);
    }
    handleChange("users", selectedUsers);
  };

  const handleRoleSelection = (roleId) => {
    let selectedRoles = [...params?.roles];
    let activeIndex = selectedRoles?.findIndex((id) => parseInt(id) === roleId);
    if (activeIndex === -1) {
      selectedRoles?.push(parseInt(roleId));
    } else {
      selectedRoles?.splice(activeIndex, 1);
    }
    handleChange("roles", selectedRoles);
  };

  return (
    <div className="">
      <BlankCard
        header={<h4 className="box-title font-bold text-base">CREATE GROUP</h4>}
        rightAction={
          <div className="fixed-right-action-div">
            <OutlineButton label={"CREATE GROUP"} onClick={createGroup} />
          </div>
        }
      >
        <div className="pt-3 w-full">
          <div className="md:w-1/3 mb-3">
            <CustomInput
              placeholder="Enter the Group name here"
              label="Group Name"
              type="text"
              name="name"
              value={params?.name}
              onChange={(e) => handleChange("name", e.target.value)}
              // error={profileUpdateParamsError?.name}
              required
            />
          </div>
        </div>
      </BlankCard>
      <BlankCard
        header={
          <h4 className="box-title font-bold text-base">
            ADD USER TO THE GROUP{" "}
            <span style={{ fontStyle: "italic", color: "#b1b1b1" }}>
              {" "}
              - Optional
            </span>
          </h4>
        }
        rightAction={
          <div className="fixed-right-action-div">
            <OutlineButton label={"ADD NEW USER"} onClick={createGroup} />
          </div>
        }
      >
        <div className="pt-3 w-full">
          <div className="relative overflow-x-auto mt-2 mb-2 custom-table-style">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" style={{ width: "20px" }}></th>
                  <th scope="col">Username</th>
                  <th scope="col">Groups</th>
                  <th scope="col">Last Activity</th>
                  <th scope="col">Creation Time</th>
                </tr>
              </thead>
              <tbody>
                {userList?.map((user) => {
                  return (
                    <tr key={user?.id}>
                      <td>
                        <div className="flex">
                          <input
                            type="checkbox"
                            checked={params?.users?.includes(user?.id)}
                            onChange={() => null}
                            onClick={() => handleUserSelection(user?.id)}
                          />
                        </div>
                      </td>
                      <td>{user?.name}</td>
                      <td>0</td>
                      <td>{user?.updated}</td>
                      <td>{user?.added}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </BlankCard>
      <BlankCard
        header={
          <h4 className="box-title font-bold text-base">
            ADD ROLE TO THE GROUP{" "}
            <span style={{ fontStyle: "italic", color: "#b1b1b1" }}>
              {" "}
              - Optional
            </span>
          </h4>
        }
        rightAction={
          <div className="fixed-right-action-div">
            <OutlineButton label={"ADD NEW USER"} onClick={createGroup} />
          </div>
        }
      >
        <div className="pt-3 w-full">
          <div className="relative overflow-x-auto mt-2 mb-2 custom-table-style">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" style={{ width: "20px" }}></th>
                  <th scope="col">Role</th>
                  <th scope="col">Description</th>
                </tr>
              </thead>
              <tbody>
                {roleList?.map((role) => {
                  return (
                    <tr key={role?.id}>
                      <td>
                        <div className="flex">
                          <input
                            type="checkbox"
                            checked={params?.roles?.includes(role?.id)}
                            onChange={() => null}
                            onClick={() => handleRoleSelection(role?.id)}
                          />
                        </div>
                      </td>
                      <td>{role?.name}</td>
                      <td>{role?.description}</td>
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
