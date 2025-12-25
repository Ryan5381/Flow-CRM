import { useState } from "react";
import {
  Table,
  Button,
  Space,
  Input,
  Card,
  Typography,
  Tag,
  Tooltip,
} from "antd";
import type { TableColumnType } from "antd";
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  SearchOutlined,
  FilterOutlined,
  EyeOutlined,
  UserOutlined,
  ClockCircleOutlined,
} from "@ant-design/icons";
import type { CompanyData } from "../types/data";

const { Title, Text } = Typography;

const Companies = () => {
  const [searchText, setSearchText] = useState("");
  const companies: CompanyData[] = [
    {
      id: 1,
      name: "科技創新有限公司",
      status: "正式客戶",
      industry: "軟體開發",
      owner: "陳小明",
      lastInteraction: "2023-10-25",
      tags: ["高價值", "科技業"],
      user_id: "1",
      created_at: "2023-01-01",
    },
  ];

  const filteredCompanies = companies.filter(
    (c) =>
      c.name.toLowerCase().includes(searchText.toLowerCase()) ||
      c.industry.toLowerCase() ||
      c.owner.toLowerCase() ||
      c.owner.toLowerCase().includes(searchText.toLowerCase())
  );

  const columns: TableColumnType<CompanyData>[] = [
    {
      title: "公司名稱",
      dataIndex: "name",
      key: "name",
      render: (text: string) => (
        <Space>
          <Text strong>{text}</Text>
          <Tooltip title="進入詳情">
            <Button
              type="link"
              size="small"
              icon={<EyeOutlined />}
              className="p-0"
            />
          </Tooltip>
        </Space>
      ),
    },
    {
      title: "狀態",
      dataIndex: "status",
      key: "status",
      render: (status: string) => {
        let color = "default";
        if (status === "正式客戶") color = "green";
        if (status === "潛在客戶") color = "orange";
        if (status === "合作夥伴") color = "blue";
        return <Tag color={color}>{status}</Tag>;
      },
    },
    {
      title: "產業",
      dataIndex: "industry",
      key: "industry",
      render: (industry: string) => <Tag color="geekblue">{industry}</Tag>,
    },
    {
      title: "負責人",
      dataIndex: "owner",
      key: "owner",
      render: (owner: string) => (
        <Space>
          <UserOutlined className="text-gray-400" />
          <Text>{owner}</Text>
        </Space>
      ),
    },
    {
      title: "最近互動",
      dataIndex: "lastInteraction",
      key: "lastInteraction",
      render: (date: string) => (
        <Space>
          <ClockCircleOutlined className="text-gray-400" />
          <Text>{date}</Text>
        </Space>
      ),
    },
    {
      title: "標籤",
      dataIndex: "tags",
      key: "tags",
      render: (tags: string[]) => (
        <>
          {tags.map((tag) => (
            <Tag key={tag} className="mr-1 mb-1">
              {tag}
            </Tag>
          ))}
        </>
      ),
    },
    {
      title: "操作",
      key: "action",
      render: () => (
        <Space size="small">
          <Button
            type="text"
            icon={<EditOutlined />}
            className="text-blue-500 hover:text-blue-600"
          />
          <Button type="text" danger icon={<DeleteOutlined />} />
        </Space>
      ),
    },
  ];

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <Title level={2} className="m-0!">
            公司管理
          </Title>
          <Text type="secondary">管理與追蹤您的企業客戶與組織資訊</Text>
        </div>
        <Space>
          <Button icon={<FilterOutlined />}>進階篩選</Button>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            size="large"
            className="bg-[#666] hover:bg-gray-700 border-none shadow-md"
            style={{ color: "white", backgroundColor: "#666" }}
          >
            新增公司
          </Button>
        </Space>
      </div>

      <Card className="shadow-sm rounded-lg">
        <div className="mb-4">
          <Input
            prefix={<SearchOutlined className="text-gray-400" />}
            placeholder="搜尋公司、產業或負責人..."
            className="max-w-md rounded-lg"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
        </div>
        <Table
          columns={columns}
          dataSource={filteredCompanies}
          rowKey="id"
          pagination={{ pageSize: 10 }}
        />
      </Card>
    </div>
  );
};

export default Companies;
