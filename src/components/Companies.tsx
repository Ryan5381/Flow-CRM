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
  Popconfirm,
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
import { useCompanies } from "../hooks/useCompanies";
import CompaniesModal from "./CompaniesModal";

const { Title, Text } = Typography;

const Companies = () => {
  const [searchText, setSearchText] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingCompany, setEditingCompany] = useState<CompanyData | null>(
    null
  );
  const { companies, loading, removeCompany, addCompany, isAdding } =
    useCompanies();

  const filteredCompanies = companies.filter(
    (c) =>
      c.name.toLowerCase().includes(searchText.toLowerCase()) ||
      (c.industry &&
        c.industry.toLowerCase().includes(searchText.toLowerCase())) ||
      (c.owner && c.owner.toLowerCase().includes(searchText.toLowerCase()))
  );

  const handleAdd = () => {
    setEditingCompany(null);
    setIsModalVisible(true);
  };

  const handleEdit = (record: CompanyData) => {
    setEditingCompany(record);
    setIsModalVisible(true);
  };

  const handleModalFinish = (values: any) => {
    // 這裡我們只實作新增部分，因為 useCompanies 目前只有 addCompany
    addCompany(values, {
      onSuccess: () => {
        setIsModalVisible(false);
      },
    });
  };

  const columns: TableColumnType<CompanyData>[] = [
    {
      title: "公司名稱",
      dataIndex: "name",
      key: "name",
      render: (text: string) => (
        <Space>
          <Text strong>{text || "未命名公司"}</Text>
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
        return <Tag color={color}>{status || "不明"}</Tag>;
      },
    },
    {
      title: "產業",
      dataIndex: "industry",
      key: "industry",
      render: (industry: string) => (
        <Tag color="geekblue">{industry || "未分類"}</Tag>
      ),
    },
    {
      title: "負責人",
      dataIndex: "owner",
      key: "owner",
      render: (owner: string) => (
        <Space>
          <UserOutlined className="text-gray-400" />
          <Text>{owner || "未指定"}</Text>
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
          <Text>{date || "無紀錄"}</Text>
        </Space>
      ),
    },
    {
      title: "標籤",
      dataIndex: "tags",
      key: "tags",
      render: (tags: any) => (
        <>
          {Array.isArray(tags) &&
            tags.map((tag) => (
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
      render: (_, record) => (
        <Space size="small">
          <Button
            type="text"
            icon={<EditOutlined />}
            className="text-blue-500 hover:text-blue-600"
            onClick={() => handleEdit(record)}
          />
          <Popconfirm
            title="確定要刪除這家公司嗎？"
            onConfirm={() => removeCompany(record.id)}
            okText="確定"
            cancelText="取消"
          >
            <Button type="text" danger icon={<DeleteOutlined />} />
          </Popconfirm>
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
            onClick={handleAdd}
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
          loading={loading}
          pagination={{ pageSize: 10 }}
        />
      </Card>

      <CompaniesModal
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        onFinish={handleModalFinish}
        initialValues={editingCompany}
        loading={isAdding}
      />
    </div>
  );
};

export default Companies;
