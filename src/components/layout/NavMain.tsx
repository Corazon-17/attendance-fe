import {
  ChevronRight,
  ClockCheckIcon,
  FileClockIcon,
  User,
} from "lucide-react";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import type { Menu } from "@/types";
import { Link } from "react-router";

interface NavMainProps {
  menu: Menu[] | null;
  groupName?: string;
  activePath?: string;
}

const menuIcons = {
  profile: <User />,
  attendance: <ClockCheckIcon />,
  "attendance-history": <FileClockIcon />,
};
type MenuIconKey = keyof typeof menuIcons;

export function NavMain({ menu, groupName, activePath }: NavMainProps) {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>{groupName ?? "Group Name"}</SidebarGroupLabel>
      <SidebarMenu>
        {menu?.map((item) => {
          if (!item.submenu || item.submenu?.length < 1) {
            return (
              <SidebarMenuButton
                key={item.id}
                isActive={item.path === activePath}
                asChild
              >
                {item.path ? (
                  <Link to={item.path}>
                    {menuIcons[item.id as MenuIconKey]}
                    <span>{item.name}</span>
                  </Link>
                ) : (
                  <div>
                    {menuIcons[item.id as MenuIconKey]}
                    <span>{item.name}</span>
                  </div>
                )}
              </SidebarMenuButton>
            );
          }

          return (
            <Collapsible key={item.id} asChild className="group/collapsible">
              <SidebarMenuItem>
                <CollapsibleTrigger asChild>
                  <SidebarMenuButton tooltip={item.name}>
                    {menuIcons[item.id as MenuIconKey]}
                    <span>{item.name}</span>
                    <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                  </SidebarMenuButton>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <SidebarMenuSub>
                    {item.submenu?.map((subItem) => (
                      <SidebarMenuSubItem key={subItem.name}>
                        <SidebarMenuSubButton
                          isActive={item.path === activePath?.slice(1)}
                          asChild
                        >
                          {subItem.path ? (
                            <Link to={subItem.path}>{subItem.name}</Link>
                          ) : (
                            <span>{subItem.name}</span>
                          )}
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    ))}
                  </SidebarMenuSub>
                </CollapsibleContent>
              </SidebarMenuItem>
            </Collapsible>
          );
        })}
      </SidebarMenu>
    </SidebarGroup>
  );
}
