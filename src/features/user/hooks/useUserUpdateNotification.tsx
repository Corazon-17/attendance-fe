import { useEffect } from "react";
import { toast } from "sonner";

export const useUserUpdateNotifications = (enabled: boolean) => {
  useEffect(() => {
    if (!enabled) {
      return;
    }

    const eventSource = new EventSource(
      "http://localhost:3005/notifications/user-updated",
      { withCredentials: true },
    );

    eventSource.onmessage = (event) => {
      const newNotification = JSON.parse(event.data);
      toast.info(newNotification.message, {
        position: "bottom-left",
      });
    };

    eventSource.onerror = (err) => {
      console.error("SSE failed:", err);
      eventSource.close();
    };

    return () => {
      eventSource.close();
    };
  }, [enabled]);
};
