import type { QueryOptions } from "@/types/query";
import { useQuery } from "@tanstack/react-query";
import { allUsers } from "../api/user.api";

export const useAllUsers = (options?: QueryOptions) => {
  return useQuery({
    queryKey: ["all-users"],
    queryFn: () => allUsers(),
    enabled: options?.enabled,
  });
};
