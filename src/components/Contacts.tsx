import { useState } from "react";
import { Layout, Table, Button, Space, Input, Card, Typography } from "antd";
import type { TableColumnType } from "antd";
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  SearchOutlined,
  FilterOutlined,
} from "@ant-design/icons";
import ContactsModal from "./ContactsModal";
const { Content } = Layout;
const { Title, Text } = Typography;

// Mock data
const mockContacts = [
  {
    id: 1,
    name: "王小明",
    email: "ming@example.com",
    phone: "0912-345-678",
    company: "飛越科技",
    job_title: "採購經理",
  },
];

const Contacts = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const columns: TableColumnType[] = [
    {
      title: "聯絡人",
      dataIndex: "name",
      key: "name",
      align: "center",
      render: (text: string) => (
        <Space size="middle">
          <div className="flex flex-col">
            <Text strong className="text-gray-800">
              {text}
            </Text>
          </div>
        </Space>
      ),
    },
    {
      title: "公司",
      key: "company",
      align: "center",
      render: (_: any, record: any) => (
        <div className="flex flex-col">
          <Text className="text-gray-800">{record.company}</Text>
        </div>
      ),
    },
    {
      title: "職稱",
      key: "title",
      align: "center",
      render: (_: any, record: any) => (
        <div className="flex flex-col">
          <Text className="text-gray-800">{record.job_title}</Text>
        </div>
      ),
    },
    {
      title: "電話",
      key: "phone",
      align: "center",
      render: (_: any, record: any) => (
        <div className="flex flex-col">
          <Text className="text-gray-800">{record.phone}</Text>
        </div>
      ),
    },
    {
      title: "Email",
      key: "email",
      align: "center",
      render: (_: any, record: any) => (
        <div className="flex flex-col">
          <Text className="text-gray-800">{record.email}</Text>
        </div>
      ),
    },
    {
      title: "操作",
      key: "action",
      align: "center",
      render: (_: any) => (
        <Space size="small">
          <Button
            type="text"
            icon={<EditOutlined />}
            className="text-blue-500"
          />
          <Button type="text" danger icon={<DeleteOutlined />} />
        </Space>
      ),
    },
  ];

  return (
    <Layout className="min-h-screen bg-[#f8f9fa]">
      <Layout style={{ marginLeft: 200 }}>
        <Content className="m-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <Title level={2} className="m-0!">
                聯絡人管理
              </Title>
              <Text type="secondary">您的專屬客戶名單，隨時隨地輕鬆維護</Text>
            </div>
            <Space>
              <Button icon={<FilterOutlined />}>篩選</Button>
              <Button
                type="primary"
                icon={<PlusOutlined />}
                onClick={() => setIsModalVisible(true)}
                size="large"
                className="bg-[#666] hover:bg-gray-700 border-none shadow-md"
                style={{ color: "white", backgroundColor: "#666" }}
              >
                新增聯絡人
              </Button>
            </Space>
          </div>

          <Card className="shadow-sm rounded-xl overflow-hidden">
            <div className="mb-4">
              <Input
                prefix={<SearchOutlined className="text-gray-400" />}
                placeholder="搜尋姓名、公司、Email..."
                className="max-w-xs rounded-lg"
              />
            </div>
            <Table
              columns={columns}
              dataSource={mockContacts}
              rowKey="id"
              pagination={{ pageSize: 10 }}
              className="contacts-table"
            />
          </Card>
        </Content>
      </Layout>

      <ContactsModal
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
      />
    </Layout>
  );
};

export default Contacts;
