// 封裝所有與 Supabase 的資料操作

import { supabase } from "../lib/supabase";
import type { TodoData } from "../types/data";

// 從 Supabase 取得所有待辦事項
export async function fetchTodos(): Promise<TodoData[]> {
  const { data, error } = await supabase
    .from("todos")
    .select("*")
    .order("created_at", { ascending: false });

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
