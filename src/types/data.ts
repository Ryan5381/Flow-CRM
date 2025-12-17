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
  username: string;
  password: string;
}
