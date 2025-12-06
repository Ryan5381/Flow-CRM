import { Avatar, Dropdown } from "antd";
import type { MenuProps } from "antd";
import {
  UserOutlined,
  LogoutOutlined,
  SettingOutlined,
} from "@ant-design/icons";

const Header = () => {
  const menuItems: MenuProps["items"] = [
    {
      key: "profile",
      label: "個人資料",
      icon: <SettingOutlined />,
      onClick: () => console.log("個人資料"),
    },
    {
      type: "divider",
    },
    {
      key: "logout",
      label: "登出",
      icon: <LogoutOutlined />,
      danger: true,
      onClick: () => console.log("登出"),
    },
  ];

  return (
    <div className="flex h-[60px] items-center justify-end border-b border-gray-200 bg-white px-6">
      {/* 使用者選單 */}
      <Dropdown menu={{ items: menuItems }} placement="bottomRight" arrow>
        <button className="flex cursor-pointer items-center gap-2 transition-opacity hover:opacity-80">
          <Avatar size="small" icon={<UserOutlined />} />
          <span className="text-sm text-gray-700">管理員</span>
        </button>
      </Dropdown>
    </div>
  );
};

export default Header;
