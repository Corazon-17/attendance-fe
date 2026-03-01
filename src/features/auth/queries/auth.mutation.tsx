// src/features/auth/api/useLogin.ts

import { useNavigate } from "react-router";

import { useMutation } from "@tanstack/react-query";
import { loginWithEmailAndPassword } from "../api/auth.api";
import type { AuthResponse, LoginPayload } from "../types/auth.types";

export const useLogin = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (data: LoginPayload) => loginWithEmailAndPassword(data),
    onSuccess: (data: AuthResponse) => {
      localStorage.setItem("token", data.accessToken);
      navigate("/dashboard/profile");
    },
  });
};
