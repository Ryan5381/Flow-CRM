export type ActivityStatus = "完成" | "待跟進" | "延後";

export interface ActivityData {
  id: number;
  customerName: string;
  activityType: string;
  owner: string;
  activityTime: string;
  status: ActivityStatus;
}
