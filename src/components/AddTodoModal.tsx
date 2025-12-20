import { Modal, Form, Input, DatePicker, message, Button } from "antd";
import { useTodos } from "../hooks/useTodos";
import dayjs from "dayjs";

interface AddTodoModalProps {
  open: boolean;
  onCancel: () => void;
}

const AddTodoModal = ({ open, onCancel }: AddTodoModalProps) => {
  const [form] = Form.useForm();
  const { addTodo, isAdding } = useTodos();

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      const newTodo = {
        title: values.title,
        dueDate: values.dueDate.format("YYYY-MM-DD"),
        completed: false,
      };

      await addTodo(newTodo);
      message.success("新增成功");
      form.resetFields();
      onCancel();
    } catch (error) {
      if (error instanceof Error) {
        message.error("新增失敗: " + error.message);
      }
      console.error("Failed to add todo:", error);
    }
  };

  return (
    <Modal
      title="新增待辦事項"
      open={open}
      confirmLoading={isAdding}
      footer={null}
      destroyOnHidden
      onCancel={onCancel}
    >
      <Form
        form={form}
        layout="vertical"
        preserve={false}
        initialValues={{ dueDate: dayjs() }}
      >
        <Form.Item
          name="title"
          label="標題"
          rules={[{ required: true, message: "請輸入待辦事項標題" }]}
        >
          <Input placeholder="例如：準備週報" />
        </Form.Item>
        <Form.Item
          name="dueDate"
          label="到期日"
          rules={[{ required: true, message: "請選擇到期日" }]}
        >
          <DatePicker style={{ width: "100%" }} />
        </Form.Item>
      </Form>
      <div className="flex justify-center gap-2">
        <Button
          style={{ width: "100%", borderColor: "#FF0000", color: "#FF0000" }}
          onClick={onCancel}
        >
          取消
        </Button>
        <Button
          style={{ width: "100%", backgroundColor: "#888", color: "#fff" }}
          onClick={handleOk}
          loading={isAdding}
        >
          確認
        </Button>
      </div>
    </Modal>
  );
};

export default AddTodoModal;
