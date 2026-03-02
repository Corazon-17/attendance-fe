import { useQuery } from "@tanstack/react-query";
import { loggedUserData } from "../api/auth.api";

export const useUser = () => {
  return useQuery({
    queryKey: ["auth-user"],
    queryFn: loggedUserData,
    retry: false,
    staleTime: Infinity,
  });
};
