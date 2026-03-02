import type { Menu } from "@/types";

export const menuList: Menu[] = [
  {
    id: "dashboard",
    name: "Dashboard",
    path: null,
    submenu: [
      {
        id: "profile",
        name: "Profile",
        path: "/dashboard/profile",
        submenu: [],
      },
      {
        id: "attendance",
        name: "Absensi",
        path: "/dashboard/attendance",
        submenu: [],
      },
      {
        id: "attendance-history",
        name: "Riwayat Absensi",
        path: "/dashboard/attendance-history",
        submenu: [],
      },
    ],
  },
  {
    id: "admin",
    name: "Admin",
    path: null,
    submenu: [
      {
        id: "employee",
        name: "Daftar Karyawan",
        path: "/admin/employee",
        submenu: [],
      },
      {
        id: "employee-attendance",
        name: "Absensi Karyawan",
        path: "/admin/employee-attendance",
        submenu: [],
      },
    ],
  },
];
