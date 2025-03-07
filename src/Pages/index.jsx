import React from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import Login from "./Auth/Login";
import Sidebar from "./Components/Sidebar";
import Navbar from "./Components/Navbar";
import { ToastContainer } from "react-toastify";
import Groups from "./Pages/Groups";
import Users from "./Pages/Users";
import UploadConfig from "./Pages/UploadConfig";
import Modules from "./Pages/Modules";
import Dashboard from "./Pages/Dashboard";
import Permissions from "./Pages/Permissions";
import ModulePermission from "./Pages/ModulePermissions";
import ManageUser from "./Pages/Users/ManageUser";
import GroupUserList from "./Pages/Groups/GroupUserList";
import UserLevelPermission from "./Pages/Users/UserLevelPermission";
import Tools from "./Pages/Tools";
import Organization from "./Pages/Organization";
import ToolList from "./ToolList";
import ToolModule from "./Pages/ToolModule";
import AuditLog from "./Pages/AuditLog";

function Admin() {
  function WithSidebar(children, screen = "") {
    return (
      <div>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          // pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
        <div className="min-h-screen flex">
          <Sidebar />
          <div className="flex flex-col flex-grow w-96">
            <Navbar />
            <main className="p-6 flex-grow body-background">{children}</main>
          </div>
        </div>
        {/* <Footer /> */}
      </div>
    );
  }

  function WithHeaderOnly(children, screen = "") {
    return (
      <div>
        <div className="min-h-screen flex">
          <div className="flex flex-col flex-grow w-96">
            <Navbar withSidebar={true} />
            <main className="p-6 flex-grow body-background">{children}</main>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="after-login-view">
      <Routes>
        <Route path="/" exact element={<Login />} />
        <Route
          path="/organization/tools"
          exact
          element={WithHeaderOnly(<ToolList />, "tools")}
        />
        <Route
          path="/dashboard"
          exact
          element={WithSidebar(<Dashboard />, "dashboard")}
        />
        <Route path="/tools" exact element={WithSidebar(<Tools />, "tools")} />
        <Route
          path="/organization"
          exact
          element={WithSidebar(<Organization />, "organization")}
        />
        <Route
          path="/organization/tools/:organization_id"
          exact
          element={WithSidebar(<ToolModule />, "organization")}
        />
        <Route
          path="/modules"
          exact
          element={WithSidebar(<Modules />, "modules")}
        />
        <Route
          path="/groups"
          exact
          element={WithSidebar(<Groups />, "groups")}
        />
        <Route
          path="/groups/modules/:group_id"
          exact
          element={WithSidebar(<ModulePermission />, "permissions")}
        />
        <Route
          path="/groups/users/list"
          exact
          element={WithSidebar(<GroupUserList />, "group")}
        />
        <Route
          path="/modules/permissions/:id"
          exact
          element={WithSidebar(<Permissions />, "permissions")}
        />
        <Route path="/users" exact element={WithSidebar(<Users />, "users")} />
        <Route
          path="/users/add"
          exact
          element={WithSidebar(<ManageUser />, "users")}
        />
        <Route
          path="/users/edit/:id"
          exact
          element={WithSidebar(<ManageUser />, "users")}
        />
        <Route
          path="/users/permissions/:id"
          exact
          element={WithSidebar(<UserLevelPermission />, "users")}
        />
        <Route
          path="/audit-log"
          exact
          element={WithSidebar(<AuditLog />, "audit-log")}
        />
        {/* <Route path="/users" exact element={WithSidebar(<Users />, "users")} />
        <Route
          path="/upload-config"
          exact
          element={WithSidebar(<UploadConfig />, "upload-config")}
        /> */}
        {/*<Route
          path="/user-data"
          exact
          element={WithSidebar(<Reconciliations />, "reconciliations")}
        /> */}
      </Routes>
    </div>
  );
}

export default Admin;
