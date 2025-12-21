import { supabase } from "../lib/supabase";
import type { RegisterFormValues, LoginFormValues } from "../types/data";

export async function signUp(values: RegisterFormValues) {
  // 從表單拿到三個欄位
  const { username, email, password } = values;

  // 1. 呼叫 Supabase Auth 註冊
  // 2. Supabase會建立 auth.users 記錄、密碼自動 hash、產生uuid
  const { data: authData, error: authError } = await supabase.auth.signUp({
    email,
    password,
  });

  if (authError) {
    console.error("Auth SignUp Error:", authError.message);
    throw authError;
  }

  const user = authData.user;

  if (user) {
    // 2. 將使用者資訊同步到 public.user 表格
    const { error: dbError } = await supabase.from("user").insert([
      {
        id: user.id, // 使用 Auth 系統產生的 UID
        account: username,
        email: email,
        admin: false, // 預設為一般使用者
      },
    ]);

    if (dbError) {
      console.error("Database Sync Error:", dbError.message);
      // 如果同步失敗，拋出一個錯誤訊息給 UI
      throw new Error("註冊失敗，請聯繫客服");
    }
  }

  return authData;
}

// 登入使用者 (使用 Email)
export async function signIn(values: LoginFormValues) {
  const { email, password } = values;

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw error;
  return data;
}

// 登出使用者
export async function signOut() {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
}
