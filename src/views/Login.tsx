import { Form, Input, Button } from "antd";
import { MailOutlined, LockOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import AuthLayout from "../components/AuthLayout";
import type { LoginFormValues } from "../types/data";
import { useAuth } from "../hooks/useAuth";

const Login = () => {
  const { login, isLoggingIn } = useAuth();
  const [form] = Form.useForm();

  const onFinish = (values: LoginFormValues) => {
    login(values);
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
          label="Email"
          name="email" // 欄位名維持 username 以適配 LoginFormValues，內容填 email
          rules={[
            { required: true, message: "請輸入 Email" },
            { type: "email", message: "請輸入有效的 Email 格式" },
          ]}
        >
          <Input
            prefix={<MailOutlined className="text-gray-400" />}
            placeholder="請輸入註冊時的 Email"
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
            loading={isLoggingIn}
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
