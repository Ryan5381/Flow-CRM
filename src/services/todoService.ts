// 封裝所有與 Supabase 的資料操作

import { supabase } from "../lib/supabase";
import type { TodoData } from "../types/data";

// 從 Supabase 取得所有待辦事項
export async function fetchTodos(): Promise<TodoData[]> {
  // 1. 先確認目前使用者身分
  const {
    data: { user },
  } = await supabase.auth.getUser();

  let query = supabase
    .from("todos")
    .select("*")
    .order("created_at", { ascending: false });

  // 2. 如果有使用者，則根據 user_id 過濾
  if (user) {
    query = query.eq("user_id", user.id);
  }

  const { data, error } = await query;

  if (error) {
    console.error("Error fetching todos:", error);
    throw error;
  }

  return data || [];
}

// 更新待辦事項的完成狀態
export async function updateTodoStatus(
  id: number,
  completed: boolean
): Promise<void> {
  const { error } = await supabase
    .from("todos")
    .update({ completed })
    .eq("id", id);

  if (error) {
    console.error("Error updating todo:", error);
    throw error;
  }
}

// 刪除待辦事項
export async function deleteTodo(id: number): Promise<void> {
  const { error } = await supabase.from("todos").delete().eq("id", id);

  if (error) {
    console.error("Error deleting todo:", error);
    throw error;
  }
}

// 新增待辦事項
export async function addTodo(todo: Omit<TodoData, "id">): Promise<void> {
  // 1. 取得目前登入的使用者資訊
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    throw new Error("請先登入後再新增待辦事項");
  }

  // 2. 將 user_id 注入到 todo 資料中
  const newTodo = {
    ...todo,
    user_id: user.id,
  };

  const { error } = await supabase.from("todos").insert([newTodo]);

  if (error) {
    console.error("Error adding todo:", error);
    throw error;
  }
}
