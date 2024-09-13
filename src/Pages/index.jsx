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
// import AdvertisementList from "./Pages/Advertisements/List";
// import AdvertisementAddEdit from "./Pages/Advertisements/AddEdit";
// import TopPerformingAdList from "./Pages/Advertisements/TopPerforming";

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
        <div className="bg-gray-100 min-h-screen flex">
          <Sidebar />
          <div className="flex flex-col flex-grow w-96">
            <Navbar />
            <main className="p-6 flex-grow bg-Background">{children}</main>
          </div>
        </div>
        {/* <Footer /> */}
      </div>
    );
  }

  return (
    <Routes>
      <Route path="/" exact element={WithFooterOnly(<Login />)} />
      <Route path="/dashboard" exact element={WithSidebar(<Dashboard />, 'dashboard')} />
      <Route path="/reconciliations" exact element={WithSidebar(<Reconciliations />, 'reconciliations')} />
      <Route path="/definelogic" exact element={WithSidebar(<DefineLogic />, 'definelogic')} />
      <Route path="/uploads" exact element={WithSidebar(<Uploads />, 'uploads')} />
      <Route path="/settings" exact element={WithSidebar(<Settings />, 'settings')} />
      <Route path="/reports" exact element={WithSidebar(<Reports />, 'reports')} />
      {/* <Route path="/advertisement/list" exact element={WithSidebar(<AdvertisementList />)} />
      <Route path="/advertisement/add" exact element={WithSidebar(<AdvertisementAddEdit />)} />
      <Route path="/advertisement/edit/:id" exact element={WithSidebar(<AdvertisementAddEdit />)} /> */}
      {/* <Route path="/advertisement/performance/list" exact element={WithSidebar(<TopPerformingAdList />)} /> */}
    </Routes>
  );
}

export default AdminNavigator;
// export default App;
