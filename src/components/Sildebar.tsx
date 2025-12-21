import { Layout, Menu } from "antd";
import type { MenuProps } from "antd";
import { useNavigate, useLocation } from "react-router-dom";
import {
  FiHome,
  FiUsers,
  FiCrop,
  FiTrendingUp,
  FiPieChart,
  FiLogIn,
  FiUserPlus,
} from "react-icons/fi";
import { useAuth } from "../hooks/useAuth";
import LogoImg from "../assets/logo.png";
const { Sider } = Layout;

const Sildebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();

  const baseItems: MenuProps["items"] = [
    { key: "/", icon: <FiHome />, label: "首頁" },
    { key: "/contacts", icon: <FiUsers />, label: "聯絡人" },
    { key: "/companies", icon: <FiCrop />, label: "公司" },
    { key: "/deals", icon: <FiTrendingUp />, label: "交易" },
    { key: "/reports", icon: <FiPieChart />, label: "報表" },
  ];

  // 僅保留未登入時的「登入/註冊」，已登入時不顯示「登出」
  const authItems: MenuProps["items"] = !user
    ? [
        { type: "divider" },
        { key: "/login", icon: <FiLogIn />, label: "登入" },
        { key: "/register", icon: <FiUserPlus />, label: "註冊" },
      ]
    : [];

  const sildeItems: MenuProps["items"] = [...baseItems, ...authItems];

  const handleMenuClick: MenuProps["onClick"] = (info) => {
    navigate(info.key);
  };

  return (
    <Sider
      width={200}
      style={{
        background: "#fff",
        borderRight: "1px solid #eee",
        height: "100vh",
        position: "fixed",
        left: 0,
      }}
    >
      <div className="flex items-center p-4 text-xl font-bold text-[#4d4d4d]">
        <img src={LogoImg} alt="logo" className="w-10 h-10" />
        CRM
      </div>

      <Menu
        mode="inline"
        selectedKeys={[location.pathname]}
        onClick={handleMenuClick}
        items={sildeItems}
        style={{
          borderRight: 0,
          fontSize: 15,
        }}
      />
    </Sider>
  );
};

export default Sildebar;
