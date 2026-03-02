import { useNavigate } from "react-router";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { loginWithEmailAndPassword, logout } from "../api/auth.api";
import type { LoginPayload } from "../types/auth.types";

export const useLogin = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (data: LoginPayload) => loginWithEmailAndPassword(data),
    onSuccess: () => {
      navigate("/dashboard/profile");
    },
  });
};

export const useLogout = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => logout(),
    onSuccess: async () => {
      await queryClient.removeQueries({ queryKey: ["auth-user"] });
      navigate("/");
    },
  });
};
