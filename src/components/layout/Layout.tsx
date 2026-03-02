import { SidebarProvider } from "@/components/ui/sidebar";

import { useUser } from "@/features/auth/queries/auth.query";
import { useUserUpdateNotifications } from "@/features/user/hooks/useUserUpdateNotification";
import AppContent from "./AppContent";
import { AppSidebar } from "./AppSidebar";

export default function Layout() {
  const { data: userData } = useUser();
  useUserUpdateNotifications(userData?.position.name === "HRD");

  return (
    <SidebarProvider>
      <AppSidebar />
      <AppContent />
    </SidebarProvider>
  );
}
