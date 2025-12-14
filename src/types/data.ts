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
}

export interface OverviewData {
  month: string;
  label: string;
  totalSales: number;
  salesChangePercent: number;
  newCustomers: number;
  newCustomersChangePercent: number;
}
