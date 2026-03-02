import { menuList } from "@/constants/navigation";
import type { Menu } from "@/types";
import { useLocation } from "react-router";

export function useActivePath() {
  const { pathname } = useLocation();
  return findMenuByPath(menuList, pathname);
}

const findMenuByPath = (menuList: Menu[], targetPath: string): Menu | null => {
  for (const item of menuList) {
    if (item.path === targetPath) {
      return item;
    }

    if (item.submenu && item.submenu.length > 0) {
      const found = findMenuByPath(item.submenu, targetPath);
      if (found) return found;
    }
  }

  return null;
};
