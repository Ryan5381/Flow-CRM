export interface ActivityData  {
  key: string;
  customerName: string;
  activityType: string;
  owner: string;
  activityTime: string;
  status?: "完成" | "待跟進" | "延後"
}