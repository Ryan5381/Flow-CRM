import { Form, Input, Button, message } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import AuthLayout from "../components/AuthLayout";
import type { LoginFormValues } from "../types/data";

const Login = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const onFinish = (values: LoginFormValues) => {
    console.log("登入資料:", values);
    // TODO: 實作登入 API 呼叫
    message.success("登入成功！");
    // 登入成功後導向首頁
    navigate("/");
  };

  return (
    <AuthLayout title="登入" subtitle="管理您的客戶關係，提升業務效率">
      <Form
        form={form}
        name="login"
        onFinish={onFinish}
        autoComplete="off"
        layout="vertical"
        requiredMark={false}
      >
        <Form.Item
          label="帳號"
          name="username"
          rules={[{ required: true, message: "請輸入帳號" }]}
        >
          <Input
            prefix={<UserOutlined className="text-gray-400" />}
            placeholder="請輸入帳號"
            size="large"
          />
        </Form.Item>

        <Form.Item
          label="密碼"
          name="password"
          rules={[{ required: true, message: "請輸入密碼" }]}
        >
          <Input.Password
            prefix={<LockOutlined className="text-gray-400" />}
            placeholder="請輸入密碼"
            size="large"
          />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            size="large"
            block
            style={{ color: "#fff", backgroundColor: "#666" }}
          >
            登入
          </Button>
        </Form.Item>

        <div className="text-center text-sm text-gray-600">
          還沒有帳號？{" "}
          <Link
            to="/register"
            className="text-blue-600 hover:text-blue-700 font-medium"
          >
            立即註冊
          </Link>
        </div>
      </Form>
    </AuthLayout>
  );
};

export default Login;
