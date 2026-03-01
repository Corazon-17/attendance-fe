import Layout from "@/components/layout/Layout";
import Login from "@/pages/auth/login";
import Profile from "@/pages/dashboard/profile";
import { createBrowserRouter, Navigate } from "react-router";

export const router = createBrowserRouter([
  // Public Routes
  {
    element: null,
    children: [
      { path: "", element: <Login /> },
      //   { path: '/register', element: <RegisterPage /> },
    ],
  },

  // Private Routes
  {
    path: "dashboard",
    element: <Layout />, // Wraps children with Navbar/Sidebar
    children: [
      { path: "profile", element: <Profile /> },
      // { path: "settings", element: <SettingsPage /> },
      // { path: "profile/:userId", element: <UserProfilePage /> },
    ],
  },

  // Fallback (404)
  {
    path: "*",
    element: <Navigate to="/" replace />,
  },
]);
