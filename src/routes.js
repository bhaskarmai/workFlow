import React, { Component } from "react";
import { BrowserRouter, Route,Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Overview from "./pages/Overview";

// import apiService from "./apiservice/apiService";
class RoutePage extends Component {
  render() {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/Dashboard" element={<Dashboard />} />
          <Route path="view" element={<Overview />} />
        </Routes>
      </BrowserRouter>
    );
  }
}

export default RoutePage;
