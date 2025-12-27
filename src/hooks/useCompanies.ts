import { useState, useEffect } from "react";
import {
  getCompanies,
  deleteCompany as deleteCompanyApi,
} from "../services/companyService";
import type { CompanyData } from "../types/data";
import { message } from "antd";

export function useCompanies() {
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
    removeCompany,
  };
}
