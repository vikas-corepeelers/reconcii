import React from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import Login from "./Auth/Login";
import Sidebar from "./Components/Sidebar";
import Navbar from "./Components/Navbar";
// import Dashboard from "./Pages/Dashboard/index";
// import Reconciliations from "./Pages/Reconciliations/index";
import { ToastContainer } from "react-toastify";
import Groups from "./Pages/Groups";
import GroupDescription from "./Pages/Groups/GroupDescription";
import Users from "./Pages/Users";
import UploadConfig from "./Pages/UploadConfig";
import CreateGroup from "./Pages/Groups/CreateGroup";

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

  return (
    <div className="after-login-view">
      <Routes>
        <Route path="/" exact element={<Login />} />
        <Route
          path="/groups"
          exact
          element={WithSidebar(<Groups />, "groups")}
        />
        <Route
          path="/groups/create"
          exact
          element={WithSidebar(<CreateGroup />, "groups")}
        />
        <Route
          path="/groups/description"
          exact
          element={WithSidebar(<GroupDescription />, "groups")}
        />
        <Route path="/users" exact element={WithSidebar(<Users />, "users")} />
        <Route
          path="/upload-config"
          exact
          element={WithSidebar(<UploadConfig />, "upload-config")}
        />
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
