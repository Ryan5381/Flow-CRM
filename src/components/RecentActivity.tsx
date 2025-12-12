import { Table, Tag } from "antd";
import recentActivitiesJson from "../data/recentActivities.json";
import type { ColumnsType } from "antd/es/table";
import type { ActivityData } from "../types/data";

const recentActivities = recentActivitiesJson as ActivityData[];

const RecentActivity = () => {
  const columns: ColumnsType<ActivityData> = [
    {
      title: "客戶名稱",
      dataIndex: "customerName",
      key: "customerName",
      align: "center",
    },
    {
      title: "活動類型",
      dataIndex: "activityType",
      key: "activityType",
      align: "center",
    },
    {
      title: "負責人",
      dataIndex: "owner",
      key: "owner",
      align: "center",
    },
    {
      title: "時間",
      dataIndex: "activityTime",
      key: "activityTime",
      align: "center",
    },
    {
      title: "狀態",
      dataIndex: "status",
      key: "status",
      align: "center",
      render: (status: ActivityData["status"]) => {
        let color: string = "default";
        if (status === "完成") color = "green";
        if (status === "待跟進") color = "gold";
        if (status === "延後") color = "red";
        return <Tag color={color}>{status}</Tag>;
      },
    },
  ];

  return (
    <div className="my-5 rounded-xl border border-gray-200 bg-white p-6">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="ml-3 text-base font-semibold text-gray-900">
          近期客戶活動
        </h2>
      </div>

      <Table<ActivityData>
        rowKey="id"
        columns={columns}
        dataSource={recentActivities}
        pagination={{ pageSize: 5 }}
        size="middle"
      />
    </div>
  );
};

export default RecentActivity;
