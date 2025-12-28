import { useState, useEffect } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getCompanies,
  addCompany,
  deleteCompany as deleteCompanyApi,
} from "../services/companyService";
import type { CompanyData } from "../types/data";
import { message } from "antd";

export function useCompanies() {
  const queryClient = useQueryClient();

  const [companies, setCompanies] = useState<CompanyData[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchCompanies = async () => {
    try {
      setLoading(true);
      const data = await getCompanies();
      setCompanies(data);
    } catch (error: any) {
      message.error("載入公司資料失敗：" + error.message);
    } finally {
      setLoading(false);
    }
  };

  const addCompanyMutation = useMutation({
    mutationFn: (
      newCompany: Omit<CompanyData, "id" | "created_at" | "user_id">
    ) => addCompany(newCompany),
    onSuccess: () => {
      message.success("公司已新增");
      queryClient.invalidateQueries({
        queryKey: ["companies"],
      });
    },
    onError: () => {
      message.error("新增失敗");
    },
  });

  const removeCompany = async (id: number) => {
    try {
      await deleteCompanyApi(id);
      message.success("刪除成功");
      setCompanies((prev) => prev.filter((c) => c.id !== id));
    } catch (error: any) {
      message.error("刪除失敗：" + error.message);
    }
  };

  useEffect(() => {
    fetchCompanies();
  }, []);

  return {
    companies,
    loading,
    refresh: fetchCompanies,
    addCompany: addCompanyMutation.mutate,
    isAdding: addCompanyMutation.isPending,
    removeCompany,
    isDeleting: false, // delete is not using mutation yet
  };
}
