import type { QueryOptions } from "@/types/query";
import { useQuery } from "@tanstack/react-query";
import { getAllUserPositions, getAllUsers } from "../api/user.api";

export const useUsers = (options?: QueryOptions) => {
  return useQuery({
    queryKey: ["all-users"],
    queryFn: () => getAllUsers(),
    enabled: options?.enabled,
  });
};

export const useUserPositions = (options?: QueryOptions) => {
  return useQuery({
    queryKey: ["user-position"],
    queryFn: () => getAllUserPositions(),
    enabled: options?.enabled,
  });
};
