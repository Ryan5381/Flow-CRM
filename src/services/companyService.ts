import { supabase } from "../lib/supabase";
import type { CompanyData } from "../types/data";

// 取得當前使用者的所有公司資料
export async function getCompanies() {
  const { data, error } = await supabase
    .from("companies")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching companies:", error.message);
    throw error;
  }

  // 確保 tags 是陣列格式
  return (data || []).map((company: any) => {
    let parsedTags = [];
    try {
      if (typeof company.tags === "string") {
        parsedTags = JSON.parse(company.tags);
      } else if (Array.isArray(company.tags)) {
        parsedTags = company.tags;
      }
    } catch (e) {
      console.error("Failed to parse tags for company:", company.id, e);
      parsedTags = [];
    }

    return {
      ...company,
      tags: Array.isArray(parsedTags) ? parsedTags : [],
    };
  }) as CompanyData[];
}

// 新增公司資料
export async function createCompany(
  company: Omit<CompanyData, "id" | "created_at" | "user_id">
) {
  const { data, error } = await supabase
    .from("companies")
    .insert([
      {
        ...company,
        tags: JSON.stringify(company.tags || []),
      },
    ])
    .select()
    .single();

  if (error) {
    console.error("Error creating company:", error.message);
    throw error;
  }
  return data;
}

// 更新公司資料
export async function updateCompany(id: number, updates: Partial<CompanyData>) {
  const payload = { ...updates };
  if (updates.tags) {
    payload.tags = JSON.stringify(updates.tags) as any;
  }

  const { data, error } = await supabase
    .from("companies")
    .update(payload)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error("Error updating company:", error.message);
    throw error;
  }
  return data;
}

//刪除公司資料
export async function deleteCompany(id: number) {
  const { error } = await supabase.from("companies").delete().eq("id", id);

  if (error) {
    console.error("Error deleting company:", error.message);
    throw error;
  }
}
