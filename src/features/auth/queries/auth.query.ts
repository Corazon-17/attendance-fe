import { useQuery } from "@tanstack/react-query";
import { loggedUserInfo } from "../api/auth.api";

export const useUser = () => {
  return useQuery({
    queryKey: ["auth-user"],
    queryFn: loggedUserInfo,
    retry: false,
    staleTime: Infinity,
  });
};
