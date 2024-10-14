import React from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import Login from "./Auth/Login";
import Sidebar from "./Components/Sidebar";
import Navbar from "./Components/Navbar";
import Dashboard from "./Pages/Dashboard";
import Reconciliations from "./Pages/Reconciliations";
import DefineLogic from "./Pages/DefineLogic";
import Uploads from "./Pages/Uploads";
import { ToastContainer } from "react-toastify";
import Settings from "./Pages/Settings";
import Reports from "./Pages/Reports";
import ChangePassword from "./Pages/Profile/ChangePassword";
import UpdateProfile from "./Pages/Profile/UpdateProfile";

function AdminNavigator() {
  function WithFooterOnly(children) {
    return (
      <div className="body-background">
        {children}
        {/* <Footer /> */}
      </div>
    );
  }

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
        <Route path="/dashboard" exact element={WithSidebar(<Dashboard />, 'dashboard')} />
        <Route path="/reconciliations" exact element={WithSidebar(<Reconciliations />, 'reconciliations')} />
        <Route path="/definelogic" exact element={WithSidebar(<DefineLogic />, 'definelogic')} />
        <Route path="/uploads" exact element={WithSidebar(<Uploads />, 'uploads')} />
        <Route path="/settings" exact element={WithSidebar(<Settings />, 'settings')} />
        <Route path="/reports" exact element={WithSidebar(<Reports />, 'reports')} />
        <Route path="/change-password" exact element={WithSidebar(<ChangePassword />, 'changepassword')} />
        <Route path="/update-profile" exact element={WithSidebar(<UpdateProfile />, 'update-profile')} />
      </Routes>
    </div>
  );
}

export default AdminNavigator;
// export default App;
