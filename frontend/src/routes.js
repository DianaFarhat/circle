import React from "react";
import { createBrowserRouter, Route, createRoutesFromElements } from "react-router-dom";
import App from "./App.jsx";
import Home from "./pages/Home.jsx";
import Login from "./pages/Auth/Login.jsx";
import Signup from "./pages/Auth/Signup.jsx";
import Profile from "./pages/User/Profile.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import NotFound from "./pages/NotFound.jsx";

// ✅ Define all routes in one place
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}> {/* ✅ Main Layout */}
      <Route index element={<Home />} /> {/* Default Home Route */}
      <Route path="login" element={<Login />} />
      <Route path="signup" element={<Signup />} />
      <Route path="profile" element={<Profile />} />
      <Route path="dashboard" element={<Dashboard />} />
      <Route path="*" element={<NotFound />} /> {/* 404 Not Found Route */}
    </Route>
  )
);

export default router;
