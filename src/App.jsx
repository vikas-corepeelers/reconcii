import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import "./Utils/Theme.css";
import "bootstrap/dist/css/bootstrap.min.css";
import 'react-toastify/dist/ReactToastify.css';
import Pages from './Pages';

function MainNavigator() {
  
  return (
    <Router>
      <Routes>
        <Route exact path="/*" element={<Pages />} />
      </Routes>
    </Router>
  );
}

export default MainNavigator;
// export default App;
