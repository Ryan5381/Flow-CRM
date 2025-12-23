import { Modal, Form, Input, Button, Space } from "antd";
import { useEffect } from "react";
import type { ContactData } from "../types/data";

interface ContactsModalProps {
  open: boolean;
  onCancel: () => void;
  onFinish: (values: any) => void;
  initialValues?: Partial<ContactData> | null;
  loading?: boolean;
}

const ContactsModal = ({
  open,
  onCancel,
  onFinish,
  initialValues,
  loading,
}: ContactsModalProps) => {
  const [form] = Form.useForm();

  // 當 initialValues 改變或 Modal 開啟時，更新表單內容
  useEffect(() => {
    if (open) {
      if (initialValues) {
        form.setFieldsValue(initialValues);
      } else {
        form.resetFields();
      }
    }
  }, [open, initialValues, form]);

  const handleSubmit = (values: any) => {
    onFinish(values);
  };

  return (
    <Modal
      title={initialValues ? "編輯聯絡人" : "建立新聯絡人"}
      open={open}
      onCancel={onCancel}
      footer={null}
      destroyOnHidden
      centered
      width={500}
    >
      <Form form={form} layout="vertical" onFinish={handleSubmit}>
        <div className="grid grid-cols-2 gap-x-4">
          <Form.Item
            name="name"
            label="姓名"
            rules={[{ required: true, message: "請輸入姓名" }]}
          >
            <Input placeholder="姓名" />
          </Form.Item>
          <Form.Item name="job_title" label="職稱">
            <Input placeholder="職稱" />
          </Form.Item>
        </div>
        <Form.Item
          name="email"
          label="Email"
          rules={[{ type: "email", message: "請輸入正確的 Email 格式" }]}
        >
          <Input placeholder="example@email.com" />
        </Form.Item>
        <Form.Item name="phone" label="電話">
          <Input placeholder="09xx-xxx-xxx" />
        </Form.Item>
        <Form.Item name="company" label="所屬公司">
          <Input placeholder="公司名稱" />
        </Form.Item>
        <Form.Item className="mb-0 text-right mt-6">
          <Space>
            <Button
              onClick={onCancel}
              className="hover:border-red-500! hover:text-red-500! transition-all"
            >
              取消
            </Button>
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              style={{ color: "white", backgroundColor: "#666" }}
              className="border-none px-8"
            >
              確認{initialValues ? "儲存" : "新增"}
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ContactsModal;
