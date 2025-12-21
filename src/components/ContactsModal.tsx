import { Modal, Form, Input, Button, Space } from "antd";

interface ContactsModalProps {
  open: boolean;
  onCancel: () => void;
}

const ContactsModal = ({ open, onCancel }: ContactsModalProps) => {
  const [form] = Form.useForm();

  const handleFinish = (values: any) => {
    console.log("新增聯絡人:", values);
    // TODO: 串接 API
    onCancel();
    form.resetFields();
  };

  return (
    <Modal
      title="建立新聯絡人"
      open={open}
      onCancel={onCancel}
      footer={null}
      destroyOnHidden
      centered
      width={500}
    >
      <Form form={form} layout="vertical" onFinish={handleFinish}>
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
              style={{ color: "white", backgroundColor: "#666" }}
              className="border-none px-8"
            >
              確認新增
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ContactsModal;
