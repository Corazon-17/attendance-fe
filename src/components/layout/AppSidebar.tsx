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

import { menuList } from "@/constants/navigation";
import { useUser } from "@/features/auth/queries/auth.query";
import { useLocation } from "react-router";
import { NavMain } from "./NavMain";
import { NavUser } from "./NavUser";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { pathname } = useLocation();
  const { data: userData } = useUser();

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
        {menuList.map((menu) => {
          return (
            <NavMain
              key={menu.id}
              groupName={menu.name}
              menu={menu.submenu}
              activePath={pathname}
            />
          );
        })}
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={userData} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
