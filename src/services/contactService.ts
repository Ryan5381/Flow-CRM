import { supabase } from "../lib/supabase";
import type { ContactData } from "../types/data";

// 取得所有聯絡人
export async function fetchContacts(): Promise<ContactData[]> {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  let query = supabase
    .from("contacts")
    .select("*")
    .order("created_at", { ascending: false });

  if (user) {
    query = query.eq("user_id", user.id);
  }

  const { data, error } = await query;

  if (error) {
    console.error("Error fetching contacts:", error);
    throw error;
  }

  return data || [];
}

// 新增聯絡人
export async function addContact(
  contact: Omit<ContactData, "id" | "created_at">
): Promise<void> {
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    throw new Error("請先登入後再執行此操作");
  }

  const newContact = {
    ...contact,
    user_id: user.id,
  };

  const { error } = await supabase.from("contacts").insert([newContact]);

  if (error) {
    console.error("Error adding contact:", error);
    throw error;
  }
}

// 更新聯絡人
export async function updateContact(
  id: number,
  updates: Partial<ContactData>
): Promise<void> {
  const { error } = await supabase
    .from("contacts")
    .update(updates)
    .eq("id", id);

  if (error) {
    console.error("Error updating contact:", error);
    throw error;
  }
}

// 刪除聯絡人
export async function deleteContact(id: number): Promise<void> {
  const { error } = await supabase.from("contacts").delete().eq("id", id);

  if (error) {
    console.error("Error deleting contact:", error);
    throw error;
  }
}
