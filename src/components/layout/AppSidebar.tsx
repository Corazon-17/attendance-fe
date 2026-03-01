"use client";

import * as React from "react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";

import { NavMain } from "./NavMain";
import { NavUser } from "./NavUser";

type Menu = {
  id: string;
  name: string;
  url: string | null;
  submenu: Menu[] | null;
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const menus: Menu[] = [
    {
      id: "dashboard",
      name: "Dashboard",
      url: null,
      submenu: [
        {
          id: "profile",
          name: "Profile",
          url: "/dashboard/profile",
          submenu: [],
        },
        {
          id: "attendance",
          name: "Absensi",
          url: "/dashboard/attendance",
          submenu: [],
        },
        {
          id: "attendance-history",
          name: "Riwayat Absensi",
          url: "/dashboard/attendance-history",
          submenu: [],
        },
      ],
    },
  ];

  const user = {
    name: "Apid Kopassus",
    email: "Satria Bergitar",
    avatar:
      "https://i.pinimg.com/564x/6e/0f/05/6e0f057d6d82cb6a1f1054c2b3504f92.jpg",
  };

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <div className="flex gap-1 items-center">
                <img
                  src="/images/logos/logo.jpg"
                  alt="logo"
                  width={45}
                  height={45}
                  className="rounded-full"
                />
                <div className="flex flex-col text-lg font-extrabold leading-tight">
                  <span>Ling Ling</span>
                  <span className="text-xl leading-none">Corporation</span>
                </div>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        {menus.map((menu) => {
          return (
            <NavMain key={menu.id} groupName={menu.name} menu={menu.submenu} />
          );
        })}
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
