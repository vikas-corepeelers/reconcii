import React, { useEffect, useState } from "react";
import BlankCard from "../../../components/BlankCard";

import OutlineButton from "../../../components/OutlineButton";
import AddUpdateModal from "./AddUpdateModal";
import { useLoader } from "../../../Utils/Loader";
import EditButton from "../../../components/EditButton";
import usePermissions from "./usePermissions";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";

export default function Permissions() {
  const params = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { setToastMessage } = useLoader();
  const [isOpen, setIsOpen] = useState(false);
  const { fetchPermissionList, permissionList } = usePermissions();

  useEffect(() => {
    if (params?.id) {
      fetchPermissionList({ module_id: params?.id });
    } else {
      navigate("/dashboard");
    }
  }, []);

  console.log("location", location);

  const onSuccess = () => {
    setIsOpen(false);
    fetchPermissionList({ module_id: params?.id });
    setToastMessage({
      message: "Permission details successfully added/updated.",
      type: "success",
    });
  };

  return (
    <div className="">
      <BlankCard
        withBackButton
        onBackClick={() => navigate(-1)}
        header={<h4 className="box-title font-bold text-base">PERMISSIONS</h4>}
        rightAction={
          <div className="fixed-right-action-div">
            <OutlineButton
              label={"CREATE PERMISSION"}
              onClick={() => setIsOpen(true)}
            />
          </div>
        }
      >
        <div className="pt-3 w-full">
          <p className="text-base">
            Module Name: <b>{searchParams.get("module_name")}</b>
          </p>
          <div className="relative overflow-x-auto mt-2 mb-2 custom-table-style">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col">Permission Name</th>
                  <th scope="col">Permission Code</th>
                  <th scope="col" style={{ textAlign: "center" }}>
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {permissionList?.map((permission) => {
                  return (
                    <tr key={permission?.id}>
                      <td>{permission?.permission_name}</td>
                      <td>{permission?.permission_code}</td>
                      <td style={{ width: "150px" }}>
                        <div className="flex gap-2 justify-center">
                          <EditButton onClick={() => setIsOpen(module)} />
                          {/* <DeleteButton /> */}
                        </div>
                      </td>
                    </tr>
                  );
                })}
                {permissionList?.length === 0 && (
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
        moduleId={params?.id}
      />
    </div>
  );
}
