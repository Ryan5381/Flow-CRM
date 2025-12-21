import { useState, useEffect } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { message } from "antd";
import { supabase } from "../lib/supabase";
import { signUp, signIn, signOut } from "../services/authService";
import type { RegisterFormValues, LoginFormValues } from "../types/data";
import type { User } from "@supabase/supabase-js";

// 管理註冊、登入、登出、Session 狀態
export const useAuth = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [user, setUser] = useState<User | null>(null);
  const [isLoadingSession, setIsLoadingSession] = useState(true);

  useEffect(() => {
    // 1. 取得初始 Session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setIsLoadingSession(false);
    });

    // 2. 監聽 Auth 狀態變化
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      setIsLoadingSession(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  // 註冊
  const registerMutation = useMutation({
    mutationFn: (values: RegisterFormValues) => signUp(values),
    onSuccess: () => {
      message.success("註冊成功");
      navigate("/login");
    },
    onError: (error: any) => {
      message.error(error.message || "註冊失敗，請稍後再試");
    },
  });

  // 登入
  const loginMutation = useMutation({
    mutationFn: (values: LoginFormValues) => signIn(values),
    onSuccess: () => {
      message.success("登入成功");
      navigate("/");
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
    onError: (error: any) => {
      message.error(error.message || "登入失敗，請檢查帳號密碼");
    },
  });

  // 登出
  const logoutMutation = useMutation({
    mutationFn: signOut,
    onSuccess: () => {
      message.success("已登出");
      navigate("/login");
      queryClient.clear();
    },
    onError: () => {
      message.error("登出失敗");
    },
  });

  return {
    user,
    isLoadingSession,
    register: registerMutation.mutate,
    isRegistering: registerMutation.isPending,
    login: loginMutation.mutate,
    isLoggingIn: loginMutation.isPending,
    logout: logoutMutation.mutate,
    isLoggingOut: logoutMutation.isPending,
  };
};
