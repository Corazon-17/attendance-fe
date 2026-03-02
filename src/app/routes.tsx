import Layout from "@/components/layout/Layout";
import Employee from "@/pages/admin/employee";
import EmployeeAttendance from "@/pages/admin/employee-attendance";
import Login from "@/pages/auth/login";
import Attendance from "@/pages/dashboard/attendance";
import AttendanceHistory from "@/pages/dashboard/attendance-history";
import Profile from "@/pages/dashboard/profile";
import { createBrowserRouter, Navigate } from "react-router";

export const router = createBrowserRouter([
  // Public Routes
  {
    element: null,
    children: [{ path: "", element: <Login /> }],
  },

  // Private Routes
  {
    path: "",
    element: <Layout />,
    children: [
      {
        path: "dashboard",
        children: [
          { path: "profile", element: <Profile /> },
          { path: "attendance", element: <Attendance /> },
          { path: "attendance-history", element: <AttendanceHistory /> },
        ],
      },
      {
        path: "admin",
        children: [
          { path: "employee", element: <Employee /> },
          { path: "employee-attendance", element: <EmployeeAttendance /> },
        ],
      },
    ],
  },

  // Fallback (404)
  {
    path: "*",
    element: <Navigate to="/" replace />,
  },
]);
