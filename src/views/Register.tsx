import { Form, Input, Button } from "antd";
import { UserOutlined, LockOutlined, MailOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import AuthLayout from "../components/AuthLayout";
import type { RegisterFormValues } from "../types/data";
import { useAuth } from "../hooks/useAuth";

const Register = () => {
  const { register, isRegistering } = useAuth();
  const [form] = Form.useForm();

  const onFinish = (values: RegisterFormValues) => {
    register(values);
  };

  return (
    <AuthLayout title="註冊" subtitle="建立您的 Flow CRM 帳號">
      <Form
        form={form}
        name="register"
        onFinish={onFinish}
        autoComplete="off"
        layout="vertical"
        requiredMark={false}
      >
        <Form.Item
          label="帳號"
          name="username"
          rules={[
            { required: true, message: "請輸入帳號" },
            { min: 3, message: "帳號至少需要 3 個字元" },
          ]}
        >
          <Input
            prefix={<UserOutlined className="text-gray-400" />}
            placeholder="請輸入帳號"
            size="large"
          />
        </Form.Item>

        <Form.Item
          label="電子郵件"
          name="email"
          rules={[
            { required: true, message: "請輸入電子郵件" },
            { type: "email", message: "請輸入有效的電子郵件" },
          ]}
        >
          <Input
            prefix={<MailOutlined className="text-gray-400" />}
            placeholder="請輸入電子郵件"
            size="large"
          />
        </Form.Item>

        <Form.Item
          label="密碼"
          name="password"
          rules={[
            { required: true, message: "請輸入密碼" },
            { min: 6, message: "密碼至少需要 6 個字元" },
          ]}
        >
          <Input.Password
            prefix={<LockOutlined className="text-gray-400" />}
            placeholder="請輸入密碼"
            size="large"
          />
        </Form.Item>

        <Form.Item
          label="確認密碼"
          name="confirmPassword"
          dependencies={["password"]}
          rules={[
            { required: true, message: "請確認密碼" },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error("兩次輸入的密碼不一致"));
              },
            }),
          ]}
        >
          <Input.Password
            prefix={<LockOutlined className="text-gray-400" />}
            placeholder="請再次輸入密碼"
            size="large"
          />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            size="large"
            block
            loading={isRegistering}
            style={{ backgroundColor: "#666" }}
          >
            註冊
          </Button>
        </Form.Item>

        <div className="text-center text-sm text-gray-600">
          已經有帳號？{" "}
          <Link
            to="/login"
            className="text-blue-600 hover:text-blue-700 font-medium"
          >
            立即登入
          </Link>
        </div>
      </Form>
    </AuthLayout>
  );
};

export default Register;
