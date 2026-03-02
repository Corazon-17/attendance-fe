import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";

import { Separator } from "@/components/ui/separator";

import { useActivePath } from "@/hooks/useActivePath";
import { Outlet } from "react-router";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
} from "../ui/breadcrumb";

export default function AppContent() {
  const activePath = useActivePath();

  return (
    <SidebarInset>
      <header className="flex w-full justify-between sticky top-0 z-50 px-4 bg-white dark:bg-sidebar border-b h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
        <div className="flex items-center gap-2">
          <SidebarTrigger className="-ml-1" />
          <Separator
            orientation="vertical"
            className="mr-2 data-[orientation=vertical]:h-4"
          />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink href="#">{activePath?.name}</BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </header>
      <div className="p-2 md:p-4">
        <Outlet />
      </div>
    </SidebarInset>
  );
}
