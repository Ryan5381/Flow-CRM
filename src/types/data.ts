export type ActivityStatus = "完成" | "待跟進" | "延後";

export interface ActivityData {
  id: number;
  customerName: string;
  activityType: string;
  owner: string;
  activityTime: string;
  status: ActivityStatus;
}

export interface TodoData {
  id: number;
  title: string;
  dueDate: string;
  completed: boolean;
  user_id?: string;
  created_at?: string;
}

export interface OverviewData {
  month: string;
  label: string;
  totalSales: number;
  salesChangePercent: number;
  newCustomers: number;
  newCustomersChangePercent: number;
}

export interface RegisterFormValues {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface LoginFormValues {
  email: string;
  password: string;
}

export interface ContactData {
  id: number;
  name: string;
  email: string;
  phone: string;
  job_title: string;
  company: string;
  user_id: string;
  created_at: string;
}

export interface CompanyData {
  id: number;
  name: string;
  status: string; // 業務判斷
  industry: string; // 快速分類
  owner: string; // 負責人
  lastInteraction: string; // 最近互動
  tags: string[]; // 標籤
  user_id: string;
  created_at: string;
}
