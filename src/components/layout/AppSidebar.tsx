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

import reactLogo from "@/assets/react.svg";
import { menuList } from "@/constants/navigation";
import { useUser } from "@/features/auth/queries/auth.query";
import type { Menu } from "@/types";
import { useMemo } from "react";
import { useLocation } from "react-router";
import { Avatar, AvatarImage } from "../ui/avatar";
import { NavMain } from "./NavMain";
import { NavUser } from "./NavUser";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { pathname } = useLocation();
  const { data: userData } = useUser();

  const userMenuList: Menu[] = useMemo(() => {
    if (userData?.position.name === "HRD") {
      return menuList;
    }

    return [menuList[0]];
  }, [userData]);

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <div className="flex gap-1 items-center">
                <Avatar>
                  <AvatarImage src={reactLogo} />
                </Avatar>
                <div className="flex flex-col text-lg font-extrabold leading-tight">
                  <span>Company Name</span>
                </div>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        {userMenuList.map((menu) => {
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
