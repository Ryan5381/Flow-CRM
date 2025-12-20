import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { message } from "antd";
import { signUp } from "../services/authService";
import type { RegisterFormValues } from "../types/data";

// 管理註冊、登入、非同步邏輯
export const useAuth = () => {
  const navigate = useNavigate();

  const registerMutation = useMutation({
    mutationFn: (values: RegisterFormValues) => signUp(values),
    onSuccess: () => {
      message.success("註冊成功");
      navigate("/login");
    },
    onError: (error: any) => {
      console.error("註冊失敗", error);
      message.error(error.message || "註冊失敗，請稍後再試");
    },
  });

  return {
    // 重新命名以便於在 UI 中使用
    register: registerMutation.mutate,
    isRegistering: registerMutation.isPending,
    registerError: registerMutation.error,
  };
};
