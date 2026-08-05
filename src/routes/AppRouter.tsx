import { BrowserRouter, Routes, Route } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";

import Dashboard from "../pages/Dashboard";
import AI from "../pages/AI";
import DevHub from "../pages/DevHub";
import VirtualVarna from "../pages/VirtualVarna";
import Profile from "../pages/Profile";
import Settings from "../pages/Settings";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="ai" element={<AI />} />
          <Route path="devhub" element={<DevHub />} />
          <Route path="virtualvarna" element={<VirtualVarna />} />
          <Route path="profile" element={<Profile />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}