import { Modal, Form, Input, Button, Space } from "antd";
import { useEffect } from "react";
import type { CompanyData } from "../types/data";

interface CompaniesModalProps {
  open: boolean;
  onCancel: () => void;
  onFinish: (values: any) => void;
  initialValues?: Partial<CompanyData> | null;
  loading?: boolean;
}

const CompaniesModal = ({
  open,
  onCancel,
  onFinish,
  initialValues,
  loading,
}: CompaniesModalProps) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (open) {
      if (initialValues) {
        // 將標籤陣列轉換為逗號分隔的字串以便編輯
        const { tags, ...rest } = initialValues;
        form.setFieldsValue({
          ...rest,
          tags: Array.isArray(tags) ? tags.join(", ") : "",
        });
      } else {
        form.resetFields();
      }
    }
  }, [open, initialValues, form]);

  const handleSubmit = (values: any) => {
    // 將標籤字串轉換回陣列
    const { tags, ...rest } = values;
    const processedValues = {
      ...rest,
      tags:
        typeof tags === "string"
          ? tags
              .split(",")
              .map((t: string) => t.trim())
              .filter((t: string) => t !== "")
          : [],
    };
    onFinish(processedValues as any);
  };

  return (
    <Modal
      title={initialValues ? "編輯公司" : "建立新公司"}
      open={open}
      onCancel={onCancel}
      footer={null}
      destroyOnHidden
      centered
      width={500}
    >
      <Form form={form} layout="vertical" onFinish={handleSubmit}>
        <div className="grid grid-cols-2 gap-x-4">
          <Form.Item name="name" label="公司名稱" rules={[{ required: true }]}>
            <Input placeholder="公司名稱" />
          </Form.Item>
          <Form.Item name="industry" label="產業">
            <Input placeholder="產業" />
          </Form.Item>
        </div>
        <Form.Item name="owner" label="負責人">
          <Input placeholder="負責人" />
        </Form.Item>
        <Form.Item name="status" label="狀態">
          <Input placeholder="狀態" />
        </Form.Item>
        <Form.Item name="tags" label="標籤">
          <Input placeholder="標籤" />
        </Form.Item>
        <Form.Item className="mb-0 text-right mt-6">
          <Space>
            <Button onClick={onCancel}>取消</Button>
            <Button type="primary" htmlType="submit" loading={loading}>
              確認
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CompaniesModal;
