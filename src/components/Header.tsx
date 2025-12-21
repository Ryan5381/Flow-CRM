import { Avatar, Dropdown } from "antd";
import type { MenuProps } from "antd";
import {
  UserOutlined,
  LogoutOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { useAuth } from "../hooks/useAuth";

const Header = () => {
  const { user, logout } = useAuth();

  const handleMenuClick: MenuProps["onClick"] = (info) => {
    if (info.key === "logout") {
      logout();
    } else {
      console.log(`${info.key} clicked`);
    }
  };

  const menuItems: MenuProps["items"] = [
    {
      key: "profile",
      label: "個人資料",
      icon: <SettingOutlined />,
    },
    {
      type: "divider",
    },
    {
      key: "logout",
      label: "登出",
      icon: <LogoutOutlined />,
      danger: true,
    },
  ];

  return (
    <div className="flex h-[60px] items-center justify-end border-b border-gray-200 bg-white px-6">
      {/* 使用者選單 */}
      <Dropdown
        menu={{ items: menuItems, onClick: handleMenuClick }}
        placement="bottomRight"
        arrow
      >
        <button className="flex cursor-pointer items-center gap-2 transition-opacity hover:opacity-80">
          <Avatar size="small" icon={<UserOutlined />} />
          <span className="text-sm text-gray-700">
            {user?.email || "管理員"}
          </span>
        </button>
      </Dropdown>
    </div>
  );
};

export default Header;
