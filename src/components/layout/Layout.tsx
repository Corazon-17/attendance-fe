import { SidebarProvider } from "@/components/ui/sidebar";

import { useUserUpdateNotifications } from "@/features/user/hooks/useUserUpdateNotification";
import AppContent from "./AppContent";
import { AppSidebar } from "./AppSidebar";

export default function Layout() {
  useUserUpdateNotifications();

  return (
    <SidebarProvider>
      <AppSidebar />
      <AppContent />
    </SidebarProvider>
  );
}
