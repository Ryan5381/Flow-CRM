import { useState } from "react";
import { Table, Button, Space, Input, Card, Typography, Modal } from "antd";
import type { TableColumnType } from "antd";
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  SearchOutlined,
  FilterOutlined,
} from "@ant-design/icons";
import ContactsModal from "./ContactsModal";
import { useContacts } from "../hooks/useContacts";
import type { ContactData } from "../types/data";

const { Title, Text } = Typography;

const Contacts = () => {
  const {
    contacts,
    isLoading,
    isAdding,
    addContact,
    isUpdating,
    updateContact,
    deleteContact,
  } = useContacts();

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [editingContact, setEditingContact] = useState<ContactData | null>(
    null
  );
  const [contactToDelete, setContactToDelete] = useState<{
    id: number;
    name: string;
  } | null>(null);
  const [searchText, setSearchText] = useState("");

  // 篩選功能
  const filteredContacts = contacts.filter(
    (c) =>
      c.name.toLowerCase().includes(searchText.toLowerCase()) ||
      c.company.toLowerCase().includes(searchText.toLowerCase()) ||
      c.email.toLowerCase().includes(searchText.toLowerCase())
  );

  const handleAdd = () => {
    setEditingContact(null);
    setIsModalVisible(true);
  };

  const handleEdit = (record: ContactData) => {
    setEditingContact(record);
    setIsModalVisible(true);
  };

  const handleDeleteOpen = (id: number, name: string) => {
    setContactToDelete({ id, name });
    setIsDeleteModalVisible(true);
  };

  const handleDeleteConfirm = () => {
    if (contactToDelete) {
      deleteContact(contactToDelete.id);
      setIsDeleteModalVisible(false);
      setContactToDelete(null);
    }
  };

  const handleModalFinish = (values: any) => {
    if (editingContact) {
      updateContact(
        { id: editingContact.id, updates: values },
        {
          onSuccess: () => {
            setIsModalVisible(false);
            setEditingContact(null);
          },
        }
      );
    } else {
      addContact(values, {
        onSuccess: () => {
          setIsModalVisible(false);
        },
      });
    }
  };

  const columns: TableColumnType<ContactData>[] = [
    {
      title: "聯絡人姓名",
      dataIndex: "name",
      key: "name",
      render: (text: string) => <Text strong>{text}</Text>,
    },
    {
      title: "公司名稱",
      dataIndex: "company",
      key: "company",
    },
    {
      title: "職稱",
      dataIndex: "job_title",
      key: "job_title",
    },
    {
      title: "電話",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "操作",
      key: "action",
      render: (_: any, record: ContactData) => (
        <Space size="small">
          <Button
            type="text"
            icon={<EditOutlined />}
            className="text-blue-500 hover:text-blue-600"
            onClick={() => handleEdit(record)}
          />
          <Button
            type="text"
            danger
            icon={<DeleteOutlined />}
            onClick={() => handleDeleteOpen(record.id, record.name)}
          />
        </Space>
      ),
    },
  ];

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <Title level={2} className="m-0!">
            聯絡人管理
          </Title>
          <Text type="secondary">維護與追蹤您的所有客戶資訊</Text>
        </div>
        <Space>
          <Button icon={<FilterOutlined />}>篩選</Button>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={handleAdd}
            size="large"
            className="bg-[#666] hover:bg-gray-700 border-none shadow-md"
            style={{ color: "white", backgroundColor: "#666" }}
          >
            新增聯絡人
          </Button>
        </Space>
      </div>

      <Card className="shadow-sm rounded-lg">
        <div className="mb-4">
          <Input
            prefix={<SearchOutlined className="text-gray-400" />}
            placeholder="搜尋姓名、公司、Email..."
            className="max-w-xs rounded-lg"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
        </div>
        <Table
          columns={columns}
          dataSource={filteredContacts}
          rowKey="id"
          loading={isLoading}
          pagination={{ pageSize: 10 }}
        />
      </Card>

      <ContactsModal
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        onFinish={handleModalFinish}
        initialValues={editingContact}
        loading={isAdding || isUpdating}
      />

      <Modal
        title="確認刪除"
        open={isDeleteModalVisible}
        onCancel={() => setIsDeleteModalVisible(false)}
        footer={[
          <Button
            key="back"
            onClick={() => setIsDeleteModalVisible(false)}
            className="hover:border-red-500! hover:text-red-500! transition-all"
          >
            取消
          </Button>,
          <Button
            key="submit"
            type="primary"
            danger
            onClick={handleDeleteConfirm}
            style={{ color: "white", backgroundColor: "#666" }}
          >
            確認刪除
          </Button>,
        ]}
        centered
      >
        <p>您確定要刪除聯絡人「{contactToDelete?.name}」嗎？</p>
        <p className="text-gray-400 text-xs mt-2">刪除後將無法復原資料。</p>
      </Modal>
    </div>
  );
};

export default Contacts;
